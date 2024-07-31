import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from "./config/db";
import taskRoutes from './routes/taskRoutes';
import authRoutes from "./routes/authRoutes";
import {authenticate} from "./middleware/authMiddleware";


dotenv.config();
const app: Express = express();


// Configure CORS
const corsOptions = {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());


connectDB()


app.use('/api/task', authenticate, taskRoutes);
app.use('/api/auth', authRoutes);



// Start server
const PORT = process.env.PORT || 5000;
app.listen(process.env.PORT, () => {
    console.log(`Server working on http://localhost:${process.env.PORT}`);
});
