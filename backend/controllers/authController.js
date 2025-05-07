import bcrypt from 'bcryptjs';
import { createUserService, getUserByEmailService } from '../models/userModel.js';
import { generateToken } from '../utils/jwt.js';

const handleResponse = (res, status, message, data = null) => {
    return res.status(status).json({
        status,
        message,
        data
    });
};

export const signup = async (req, res, next) => {
    const { email, password, name, country } = req.body;

    try {
        // Check if user already exists
        const existingUser = await getUserByEmailService(email);
        if (existingUser) {
            return handleResponse(res, 400, 'User already exists with this email');
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user with all required fields
        const newUser = await createUserService(email, hashedPassword, name, country);
        
        // Generate JWT token
        const token = generateToken(newUser.id);

        // Remove password from response
        const { password: _, ...userWithoutPassword } = newUser;

        handleResponse(res, 201, 'User registered successfully', {
            user: userWithoutPassword,
            token
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await getUserByEmailService(email);
        if (!user) {
            return handleResponse(res, 401, 'Invalid email or password');
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return handleResponse(res, 401, 'Invalid email or password');
        }


        // Generate JWT token
        const token = generateToken(user.id);

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        handleResponse(res, 200, 'Login successful', {
            user: userWithoutPassword,
            token
        });
    } catch (error) {
        next(error);
    }
};

export const getMe = async (req, res, next) => {
    try {
        // req.user is set by the auth middleware
        const user = await getUserByIdService(req.user.id);
        if (!user) {
            return handleResponse(res, 404, 'User not found');
        }
        
        // Remove password from response
        const { password, ...userWithoutPassword } = user;
        
        handleResponse(res, 200, 'User profile retrieved successfully', userWithoutPassword);
    } catch (error) {
        next(error);
    }
};
