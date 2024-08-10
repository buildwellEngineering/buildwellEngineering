import express from 'express';
import { aboutUs, headerController, ourMissionOurTechnologies, projectsController, sectionController } from '../controllers/HomePageController.js';

const router = express.Router();

router.get('/getData/aboutUs',aboutUs);
router.get('/getData/ourMissionOurTechnologies',ourMissionOurTechnologies);
router.get('/getData/header',headerController);
router.get('/getData/projects',projectsController);
router.get('/getData/counter',sectionController);

export default router;