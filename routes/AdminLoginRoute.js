import express from 'express';
import { adminLogin } from '../controllers/AdminLoginController.js';
import { CheckEmptyRequest } from '../middleware/CheckEmptyRequest.js';
import {CheckNotExist} from '../middleware/CheckNotExist.js'

const router = express.Router();

router.post('/login',CheckEmptyRequest,CheckNotExist,adminLogin);

export default router;