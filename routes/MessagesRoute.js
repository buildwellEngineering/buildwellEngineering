import express from 'express';
import {getMessages, deleteMessage, markAsRead, submitMessage} from '../controllers/MessagesController.js';
import { authenticateToken } from '../middleware/JWTverify.js';


const router = express.Router();

router.get('/get',authenticateToken,getMessages);
router.put('/markAsRead/:id',authenticateToken,markAsRead);
router.delete('/delete/:id',authenticateToken,deleteMessage);
router.post('/form/submit',submitMessage);


export default router;