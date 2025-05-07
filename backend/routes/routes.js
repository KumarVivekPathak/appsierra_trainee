import express from 'express';
import { signup, login, getMe } from '../controllers/authController.js';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import {auth} from '../middleware/auth.js';
import { validateUser } from '../middleware/inputValidator.js';
import taskRoutes from './taskRoutes.js';
import projectRoutes from './projectRoutes.js';

const router = express.Router();

// Public routes
router.post('/signup', validateUser, signup);
router.post('/login', login);

// Protected routes (require authentication)
router.use(auth);

// User routes
router.get('/me', getMe);
router.get("/user", getAllUsers);
router.get("/user/:id", getUserById);
router.put("/user/:id", validateUser, updateUser);
router.delete("/user/:id", deleteUser);

// Task routes
router.use('/tasks', taskRoutes);

// Project routes
router.use('/projects', projectRoutes);

export default router;