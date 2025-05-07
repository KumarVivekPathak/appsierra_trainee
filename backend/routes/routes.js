import express from 'express';
import { deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/userController.js';
import { signup, login, getMe } from '../controllers/authController.js';
import { validateUser } from '../middleware/inputValidator.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected routes (require authentication)
router.get('/me', auth, getMe);

// User routes (protected)
router.get("/user", auth, getAllUsers);
router.get("/user/:id", auth, getUserById);
router.put("/user/:id", auth, validateUser, updateUser);
router.delete("/user/:id", auth, deleteUser);

export default router;