import dotenv from 'dotenv';
import path from 'node:path';
import app from './app';
import connectDB from './config/db';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const port = Number(process.env.PORT || 5000);

const startServer = async (): Promise<void> => {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : 'Unknown startup error';
  console.error(`Server startup failed: ${message}`);
  process.exitCode = 1;
});
