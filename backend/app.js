import express from 'express';
import cors from 'cors';
import connectDB from './src/utils/db.js';
import songRoutes from './src/routes/songRoutes.js';

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api', songRoutes);

export default app;
