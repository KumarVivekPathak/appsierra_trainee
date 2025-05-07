import express from 'express';
import { 
    createProject, 
    getProjects, 
    getProjectById, 
    updateProject, 
    deleteProject 
} from '../controllers/projectController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(auth);

// Create a new project
router.post('/', createProject);

// Get all projects for the authenticated user
router.get('/', getProjects);

// Get a single project
router.get('/:id', getProjectById);

// Update a project
router.put('/:id', updateProject);

// Delete a project
router.delete('/:id', deleteProject);

export default router;
