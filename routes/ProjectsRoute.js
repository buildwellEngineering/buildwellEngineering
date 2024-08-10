import express from 'express';
import { addProject, deleteProject, getProjects, updateProject } from '../controllers/ProjectsController.js';
import { authenticateToken } from '../middleware/JWTverify.js';


const router = express.Router();

router.post('/add',authenticateToken,addProject)
router.get('/getProjects',getProjects)
router.delete('/delete',authenticateToken,deleteProject)
router.put('/update',authenticateToken,updateProject)

export default router;