import { getAllUsersService, getUserByIdService, updateUserService, deleteUserService } from "../models/userModel.js";   

const handleResponse = (res, status, message, data = null) => {
    return res.status(status).json({
        status,
        message,
        data
    });
};

export const getAllUsers = async (req, res, next) => {
    try{
        const users = await getAllUsersService();
        handleResponse(res,200,"Users fetched successfully",users)
    }catch(error){
        next(error);
    };
};

export const getUserById = async (req, res, next) => {
    const {id} = req.params;
    try{
        const user = await getUserByIdService(id);
        if(!user){
            return handleResponse(res,404,"User not found")
        }
        handleResponse(res,200,"User fetched successfully",user)
    }catch(error){
        next(error);
    };
};

export const updateUser = async (req, res, next) => {
    const {id} = req.params;
    const {email,password} = req.body;
    try{
        const updateUser = await updateUserService(id,email,password);
        if(!updateUser){ 
            return handleResponse(res,404,"User not found")
        }
        handleResponse(res,200,"User updated successfully",updateUser)
    }catch(error){
        next(error);
    };
};

export const deleteUser = async (req, res, next) => {
    const {id} = req.params;
    try{
        const deletedUser = await deleteUserService(id);
        if(!deletedUser){
            return handleResponse(res,404,"User not found")
        }
        handleResponse(res,200,"User deleted successfully",deletedUser)
    }catch(error){
        next(error);
    };
};