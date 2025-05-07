import pool from '../config/db.js';

async function createProjectTable() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        
        await client.query(`
            CREATE TABLE IF NOT EXISTS projects (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        await client.query('COMMIT');
        console.log('Projects table created successfully');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error creating projects table:', error);
        throw error;
    } finally {
        client.release();
    }
}

export default createProjectTable;
