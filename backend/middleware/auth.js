import { verifyToken } from '../utils/jwt.js';
import { getUserByIdService } from '../models/userModel.js';

export const auth = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({
                status: 401,
                message: 'No token, authorization denied'
            });
        }

        // Verify token
        const decoded = verifyToken(token);
        
        // Get user from the token
        const user = await getUserByIdService(decoded.id);
        
        if (!user) {
            return res.status(401).json({
                status: 401,
                message: 'Token is not valid'
            });
        }

        // Add user from payload
        req.user = { id: user.id };
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({
            status: 401,
            message: 'Token is not valid'
        });
    }
};
