import express from 'express';
import { aboutUs, headerController, ourMissionOurTechnologies, projectsController } from '../controllers/HomePageController.js';

const router = express.Router();

router.get('/getData/aboutUs',aboutUs);
router.get('/getData/ourMissionOurTechnologies', ourMissionOurTechnologies);
router.get('/getData/header', headerController);
router.get('/getData/projects',projectsController)

export default router;