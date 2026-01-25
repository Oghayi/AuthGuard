import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import connectDB from './config/db.js';

dotenv.config();

// Connect to database
connectDB();

const app = express();

app.use (express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to AuthGuard API');
});

export default app;