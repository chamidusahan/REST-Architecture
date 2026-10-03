import type{ Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticateJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice('Bearer '.length).trim();
    if (!token) {
      res.status(401).json({ message: 'Unauthorized: Access token missing' });
      return;
    }

    const secret = process.env.JWT_SECRET || 'fallbackSecretKey';

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
        return;
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).json({ message: 'Unauthorized: Access token missing' });
  }
};