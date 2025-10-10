import { pool } from '../config/database.js';
import { uploadToGCS } from '../utils/storage.js';

export const getAllPGs = async (req, res) => {
  try {
    const { city, minRent, maxRent, sharing, search } = req.query;
    
    let query = `
      SELECT p.*, u.name as owner_name, u.phone as owner_phone 
      FROM pgs p 
      JOIN users u ON p.owner_id = u.id 
      WHERE p.is_active = true
    `;
    const params = [];
    let paramCount = 0;

    if (city) {
      query += ` AND LOWER(p.city) = LOWER($${++paramCount})`;
      params.push(city);
    }
    
    if (search) {
      query += ` AND (LOWER(p.name) LIKE LOWER($${++paramCount}) OR LOWER(p.address) LIKE LOWER($${++paramCount}))`;
      params.push(`%${search}%`, `%${search}%`);
      paramCount++;
    }

    query += ' ORDER BY p.created_at DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching PGs:', error);
    res.status(500).json({ error: 'Failed to fetch PGs' });
  }
};

export const getPGById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const pgQuery = `
      SELECT p.*, u.name as owner_name, u.phone as owner_phone, u.email as owner_email
      FROM pgs p 
      JOIN users u ON p.owner_id = u.id 
      WHERE p.id = $1 AND p.is_active = true
    `;
    
    const roomsQuery = `
      SELECT * FROM rooms WHERE pg_id = $1 ORDER BY room_number
    `;

    const [pgResult, roomsResult] = await Promise.all([
      pool.query(pgQuery, [id]),
      pool.query(roomsQuery, [id])
    ]);

    if (pgResult.rows.length === 0) {
      return res.status(404).json({ error: 'PG not found' });
    }

    const pg = pgResult.rows[0];
    pg.rooms = roomsResult.rows;

    res.json(pg);
  } catch (error) {
    console.error('Error fetching PG:', error);
    res.status(500).json({ error: 'Failed to fetch PG details' });
  }
};

export const createPG = async (req, res) => {
  try {
    const {
      name, description, address, city, state, pincode,
      latitude, longitude, amenities, rules, total_rooms, available_rooms, rent_amount
    } = req.body;

    // Get user details from database
    const userQuery = 'SELECT phone, email FROM users WHERE id = $1';
    const userResult = await pool.query(userQuery, [req.user.id]);
    
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = userResult.rows[0];

    const query = `
      INSERT INTO pgs (
        owner_id, name, description, address, city, state, pincode,
        latitude, longitude, total_rooms, available_rooms, rent_amount, amenities, rules, 
        contact_phone, contact_email
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *
    `;

    const values = [
      req.user.id, name, description, address, city, state, pincode,
      latitude, longitude, total_rooms || 0, available_rooms || 0, rent_amount || 0,
      amenities, rules, user.phone, user.email
    ];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating PG:', error);
    res.status(500).json({ error: 'Failed to create PG' });
  }
};

export const updatePG = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Check if user owns this PG
    const ownerCheck = await pool.query('SELECT owner_id FROM pgs WHERE id = $1', [id]);
    if (ownerCheck.rows.length === 0) {
      return res.status(404).json({ error: 'PG not found' });
    }
    
    if (ownerCheck.rows[0].owner_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this PG' });
    }

    const setClause = Object.keys(updates).map((key, index) => `${key} = $${index + 2}`).join(', ');
    const query = `UPDATE pgs SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`;
    const values = [id, ...Object.values(updates)];

    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating PG:', error);
    res.status(500).json({ error: 'Failed to update PG' });
  }
};

export const deletePG = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if user owns this PG
    const ownerCheck = await pool.query('SELECT owner_id FROM pgs WHERE id = $1', [id]);
    if (ownerCheck.rows.length === 0) {
      return res.status(404).json({ error: 'PG not found' });
    }
    
    if (ownerCheck.rows[0].owner_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this PG' });
    }

    await pool.query('UPDATE pgs SET is_active = false WHERE id = $1', [id]);
    res.json({ message: 'PG deleted successfully' });
  } catch (error) {
    console.error('Error deleting PG:', error);
    res.status(500).json({ error: 'Failed to delete PG' });
  }
};

export const uploadPGImages = async (req, res) => {
  try {
    const { id } = req.params;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No images provided' });
    }

    // Check if user owns this PG
    const ownerCheck = await pool.query('SELECT owner_id, images FROM pgs WHERE id = $1', [id]);
    if (ownerCheck.rows.length === 0) {
      return res.status(404).json({ error: 'PG not found' });
    }
    
    if (ownerCheck.rows[0].owner_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to upload images for this PG' });
    }

    // Upload images to Google Cloud Storage
    const imageUrls = await Promise.all(
      files.map(file => uploadToGCS(file, `pgs/${id}`))
    );

    // Update PG with new image URLs
    const existingImages = ownerCheck.rows[0].images || [];
    const allImages = [...existingImages, ...imageUrls];

    await pool.query('UPDATE pgs SET images = $1 WHERE id = $2', [allImages, id]);

    res.json({ images: imageUrls, message: 'Images uploaded successfully' });
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ error: 'Failed to upload images' });
  }
};