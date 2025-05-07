import { createTask, getTasksByUser, getTaskById, updateTask, deleteTask } from '../models/taskModel.js';

// Create a new task
export const createTaskController = async (req, res, next) => {
    try {
        const { title, description, projectId } = req.body;
        const userId = req.user.id;

        if (!title) {
            return res.status(400).json({ status: 400, message: 'Title is required' });
        }

        const task = await createTask(title, description, userId, projectId || null);
        res.status(201).json({
            status: 201,
            message: 'Task created successfully',
            data: task
        });
    } catch (error) {
        next(error);
    }
};

// Get all tasks for a user (optionally filtered by project)
export const getTasksController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { projectId } = req.query;
        
        const tasks = await getTasksByUser(userId, projectId);
        res.status(200).json({
            status: 200,
            data: tasks
        });
    } catch (error) {
        next(error);
    }
};

// Get a single task
export const getTaskController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const task = await getTaskById(id, userId);
        if (!task) {
            return res.status(404).json({ status: 404, message: 'Task not found' });
        }

        res.status(200).json({
            status: 200,
            data: task
        });
    } catch (error) {
        next(error);
    }
};

// Update a task
export const updateTaskController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const updates = req.body;

        const task = await getTaskById(id, userId);
        if (!task) {
            return res.status(404).json({ status: 404, message: 'Task not found' });
        }

        const updatedTask = await updateTask(id, userId, {
            title: updates.title,
            description: updates.description,
            status: updates.status
        });

        res.status(200).json({
            status: 200,
            message: 'Task updated successfully',
            data: updatedTask
        });
    } catch (error) {
        next(error);
    }
};

// Delete a task
export const deleteTaskController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const task = await getTaskById(id, userId);
        if (!task) {
            return res.status(404).json({ status: 404, message: 'Task not found' });
        }

        await deleteTask(id, userId);
        res.status(200).json({
            status: 200,
            message: 'Task deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};
