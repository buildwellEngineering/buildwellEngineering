import express from 'express';
import { adminLogin, verifyOtp } from '../controllers/AdminLoginController.js';
import { CheckEmptyRequest } from '../middleware/CheckEmptyRequest.js';
import {CheckNotExist} from '../middleware/CheckNotExist.js'

const router = express.Router();

router.post('/login',adminLogin);
router.post('/verifyOtp',verifyOtp);

export default router;