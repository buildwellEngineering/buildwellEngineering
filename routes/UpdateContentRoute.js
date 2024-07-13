import express from 'express';
import {aboutUsUpdateController, ourMissionOurTechnologiesUpdateController, updateHeader} from '../controllers/UpdateContentController.js'

const router = express.Router();

router.put('/aboutUs',aboutUsUpdateController);
router.put('/ourMissionOurTechnologies',ourMissionOurTechnologiesUpdateController);
router.put('/header',updateHeader);


export default router;