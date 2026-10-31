import express from 'express';
import cors from 'cors';

import apiRoutes from './routes';
import { requestLogger } from './middleware/request-logger';
import { notFoundHandler } from './middleware/not-found';
import { errorHandler } from './middleware/error-handler';

const app = express();

app.use(express.json());

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:4200',
    credentials: true
}));

app.use(requestLogger);

app.get('/', (req, res) => {
    res.json({
        application: 'NEXUS-BFF',
        message: 'Welcome to Nexus Backend'
    });
});

app.use('/api', apiRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;