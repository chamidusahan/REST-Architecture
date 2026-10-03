import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middleware/errorMiddleware';

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

app.use(errorHandler);

export default app;