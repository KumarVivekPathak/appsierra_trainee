import pool from '../config/db.js';

// Create a new task
export const createTask = async (title, description, userId, projectId = null) => {
    const result = await pool.query(
        `INSERT INTO tasks (title, description, user_id, project_id) 
         VALUES ($1, $2, $3, $4) 
         RETURNING *`,
        [title, description, userId, projectId]
    );
    return result.rows[0];
};

// Get all tasks for a user
export const getTasksByUser = async (userId, projectId = null) => {
    let query = 'SELECT * FROM tasks WHERE user_id = $1';
    const params = [userId];
    
    if (projectId) {
        query += ' AND project_id = $2';
        params.push(projectId);
    }
    
    query += ' ORDER BY created_at DESC';
    const result = await pool.query(query, params);
    return result.rows;
};

// Get a single task by ID
export const getTaskById = async (taskId, userId) => {
    const result = await pool.query(
        'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
        [taskId, userId]
    );
    return result.rows[0];
};

// Update a task
export const updateTask = async (taskId, userId, updates) => {
    const { title, description, status } = updates;
    const result = await pool.query(
        `UPDATE tasks 
         SET title = COALESCE($1, title),
             description = COALESCE($2, description),
             status = COALESCE($3, status),
             completed_at = CASE WHEN $3 = 'completed' AND status != 'completed' 
                               THEN CURRENT_TIMESTAMP 
                               WHEN $3 != 'completed' AND status = 'completed'
                               THEN NULL
                               ELSE completed_at END,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $4 AND user_id = $5
         RETURNING *`,
        [title, description, status, taskId, userId]
    );
    return result.rows[0];
};

// Delete a task
export const deleteTask = async (taskId, userId) => {
    const result = await pool.query(
        'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *',
        [taskId, userId]
    );
    return result.rows[0];
};
