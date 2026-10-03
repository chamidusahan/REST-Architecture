import type { Response } from 'express';
import { AuthRequest} from '../middleware/authMiddleware';
import User from '../models/User';


export const getUserProfile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
   
    const userId = req.user?.id;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

// @desc    Get all users (Admin/Testing Route)
// @route   GET /api/v1/users
export const getAllUsers = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};