import pool from '../config/db.js';

export const getAllUsersService = async () => {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
};

export const getUserByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
};

export const createUserService = async (email, password) => {
    const result = await pool.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *", [email, password]);
    return result.rows[0];
};

export const updateUserService = async (id,email,password) => {
    const result = await pool.query("UPDATE users SET email = $2, password = $3 WHERE id = $1 RETURNING *", [id, email, password]);
    return result.rows[0];
};

export const deleteUserService = async (id) => {
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
};

