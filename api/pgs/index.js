import { Pool } from 'pg';

const pool = new Pool({
  host: '34.14.136.64',
  port: 5432,
  database: 'pgconnect',
  user: 'postgres',
  password: 'Kishore@07',
  ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { college, gender, minPrice, maxPrice } = req.query;
      
      let query = 'SELECT * FROM pgs WHERE is_active = true';
      let params = [];
      let paramCount = 0;

      if (college) {
        paramCount++;
        query += ` AND college = $${paramCount}`;
        params.push(college);
      }

      if (gender && gender !== 'all') {
        paramCount++;
        query += ` AND (gender = $${paramCount} OR gender = 'Unisex')`;
        params.push(gender);
      }

      if (minPrice) {
        paramCount++;
        query += ` AND rent_amount >= $${paramCount}`;
        params.push(parseInt(minPrice));
      }

      if (maxPrice) {
        paramCount++;
        query += ` AND rent_amount <= $${paramCount}`;
        params.push(parseInt(maxPrice));
      }

      const result = await pool.query(query, params);
      res.json({ pgs: result.rows });
    } catch (error) {
      console.error('Error fetching PGs:', error);
      res.status(500).json({ error: 'Failed to fetch PGs' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, location, gender, distance, room_types, price, amenities, college } = req.body;
      
      const result = await pool.query(
        'INSERT INTO pgs (name, location, gender, distance, room_types, rent_amount, amenities, college, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
        [name, location, gender, distance, room_types, price, amenities, college, true]
      );

      res.status(201).json({ message: 'PG added successfully', pg: result.rows[0] });
    } catch (error) {
      console.error('Error adding PG:', error);
      res.status(500).json({ error: 'Failed to add PG' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}