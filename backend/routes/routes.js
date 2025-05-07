import express from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/userController.js';
import { validateUser } from '../middleware/inputValidator.js';


const router = express.Router();

//user route
router.post("/user",validateUser, createUser);
router.get("/user", getAllUsers);
router.get("/user/:id", getUserById);
router.put("/user/:id",validateUser, updateUser);
router.delete("/user/:id", deleteUser);
 
// Public routes



// // Protected route (requires authentication)
// router.get('/me', auth, getMe);

export default router;
// // 