import app from './src/app.js';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
dotenv.config({path: './.env'});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(process.env.PORT || 9000, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('MongoDB connection failed:', error);
    }
}

startServer();