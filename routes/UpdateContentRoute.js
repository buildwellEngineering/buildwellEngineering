import express from 'express';
import {aboutUsUpdateController, achievementAdd, achievementDelete, achievementUpdate, ourMissionOurTechnologiesUpdateController, updateHeader} from '../controllers/UpdateContentController.js';
import { authenticateToken } from '../middleware/JWTverify.js';


const router = express.Router();

router.put('/aboutUs',authenticateToken,aboutUsUpdateController);
router.put('/ourMissionOurTechnologies',authenticateToken,ourMissionOurTechnologiesUpdateController);
router.put('/header',authenticateToken,updateHeader);

router.post('/counterAdd',authenticateToken,achievementAdd);
router.put('/counterUpdate/:id',authenticateToken,achievementUpdate);
router.delete('/counterDelete/:id',authenticateToken,achievementDelete);


export default router;