import express from 'express';
import { getAllPGs, getPGById, createPG, updatePG, deletePG, uploadPGImages } from '../controllers/pgController.js';
import { authenticateToken } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.get('/', getAllPGs);
router.get('/:id', getPGById);

// Protected routes (require authentication)
router.post('/', authenticateToken, createPG);
router.put('/:id', authenticateToken, updatePG);
router.delete('/:id', authenticateToken, deletePG);
router.post('/:id/images', authenticateToken, upload.array('images', 10), uploadPGImages);

export default router;