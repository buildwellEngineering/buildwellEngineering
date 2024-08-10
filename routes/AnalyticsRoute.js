import express from 'express';
import { getAnalyticsData } from '../controllers/AnalyticsController.js';
import { authenticateToken } from '../middleware/JWTverify.js';

const router = express.Router();

router.get('/getAnalyticsData',authenticateToken,getAnalyticsData);


export default router;