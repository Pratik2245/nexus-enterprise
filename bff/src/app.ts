import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:4200',
        credentials: true
    })
);

app.get('/', (req, res) => {
    res.json({
        application: 'NEXUS-BFF',
        message: 'Welcome to Nexus Backend'
    });
});

app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        application: 'NEXUS-BFF',
        message: 'Backend is running successfully'
    });
});

export default app;