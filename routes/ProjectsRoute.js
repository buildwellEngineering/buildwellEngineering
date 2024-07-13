import express from 'express';
import { addProject, deleteProject, getProjects, updateProject } from '../controllers/ProjectsController.js';


const router = express.Router();

router.post('/add',addProject)
router.get('/getProjects',getProjects)
router.delete('/delete',deleteProject)
router.put('/update',updateProject)

export default router;