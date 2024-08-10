import express from 'express';
import { adminLogin, verifyOtp, changePasswordController } from '../controllers/AdminLoginController.js';
import {authenticateToken} from '../middleware/JWTverify.js';


const router = express.Router();

router.post('/login',adminLogin);
router.post('/verifyOtp',verifyOtp);
router.post('/changePassword',authenticateToken,changePasswordController);

export default router;