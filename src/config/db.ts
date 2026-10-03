import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const connectDB = async (): Promise<void> => {
  try {
    const connStr = process.env.MONGO_URI || process.env.MONGODB_URI;


    if (!connStr) {
      throw new Error('MONGO_URI එක .env file එකේ define කර නැත!');
    }


    const normalizedConnStr = connStr.replace(
      /([?&])app_name=/,
      '$1appName='
    );
    const conn = await mongoose.connect(normalizedConnStr);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${(error as Error).message}`);
  
    process.exit(1);
  }
};

export default connectDB;