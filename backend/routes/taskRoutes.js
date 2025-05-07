import express from 'express';
import { 
    createTaskController, 
    getTasksController, 
    getTaskController, 
    updateTaskController, 
    deleteTaskController 
} from '../controllers/taskController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(auth);

// Create a new task
router.post('/', createTaskController);

// Get all tasks (optionally filtered by projectId query parameter)
router.get('/', getTasksController);

// Get a single task
router.get('/:id', getTaskController);

// Update a task
router.put('/:id', updateTaskController);

// Delete a task
router.delete('/:id', deleteTaskController);

export default router;
