import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

import authRoutes from './modules/auth/auth.routes.js';

// ... (other imports)

// Routes
app.use('/api/auth', authRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', msg: 'SmartBank API is running' });
});

export default app;
