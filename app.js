


import express from 'express';
import cookieParser from 'cookie-parser'; // Import cookie-parser
import { con } from './dbConfig/dbConfig.js';
import cors from 'cors';
import adminPanelLoginRouter from './routes/AdminLoginRoute.js';
import homePageRouter from './routes/HomePageRoute.js';
import updateContentRouter from './routes/UpdateContentRoute.js';
import projectRouter from './routes/ProjectsRoute.js';
import messagesRouter from './routes/MessagesRoute.js';
import analyticsRouter from './routes/AnalyticsRoute.js';

const app = express();
app.use(express.json({ limit: '10mb' }));

// Use cookie-parser middleware
app.use(cookieParser());

const corsOptions = {
    origin: ['http://localhost:3000', 'https://build-well-front-end.vercel.app', 'https://build-well-front-end-three.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type'], // Allowed headers
    credentials: true // If you need credentials
};
app.use(cors(corsOptions));
con();

app.use('/adminLogin', adminPanelLoginRouter);
app.use('/homePage', homePageRouter);
app.use('/update', updateContentRouter);
app.use('/projects', projectRouter);
app.use('/messages', messagesRouter);
app.use('/analytics', analyticsRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

export default app;
