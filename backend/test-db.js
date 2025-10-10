import dotenv from 'dotenv';
import { connectDB } from './src/config/database.js';

dotenv.config();

console.log('Testing database connection...');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_NAME:', process.env.DB_NAME);

connectDB()
  .then(() => {
    console.log('✅ Database connection successful!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  });