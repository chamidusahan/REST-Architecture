import { Router } from 'express';
import {
  getAllUsers,
  getUserProfile,
} from '../controllers/userController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

router.get('/profile', authenticateJWT, getUserProfile);
router.get('/', authenticateJWT, getAllUsers);

export default router;