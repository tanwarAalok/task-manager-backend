import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from "./config/db";
import taskRoutes from './routes/taskRoutes';
import authRoutes from "./routes/authRoutes";


dotenv.config();


const app: Express = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


connectDB()



app.use('/api/task', taskRoutes);
app.use('/api/auth', authRoutes);



// Start server
const PORT = process.env.PORT || 5000;
app.listen(process.env.PORT, () => {
    console.log(`Server working on http://localhost:${process.env.PORT}`);
});
