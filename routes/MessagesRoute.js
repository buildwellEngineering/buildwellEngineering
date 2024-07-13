import express from 'express';
import {getMessages, deleteMessage, markAsRead, submitMessage} from '../controllers/MessagesController.js';

const router = express.Router();

router.get('/get',getMessages);
router.put('/markAsRead/:id',markAsRead);
router.delete('/delete/:id',deleteMessage);
router.post('/form/submit',submitMessage);


export default router;