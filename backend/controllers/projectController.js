import  pool from '../config/db.js';

export const createProject = async (req, res) => {
    const { name, description } = req.body;
    const userId = req.user.id;

    try {
        const result = await pool.query(
            'INSERT INTO projects (name, description, created_by) VALUES ($1, $2, $3) RETURNING *',
            [name, description, userId]
        );
        res.status(201).json({
            status: 'success',
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to create project'
        });
    }
};

export const getProjects = async (req, res) => {
    const userId = req.user.id;

    try {
        const result = await pool.query(
            'SELECT * FROM projects WHERE created_by = $1',
            [userId]
        );
        res.status(200).json({
            status: 'success',
            data: result.rows
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch projects'
        });
    }
};

export const getProjectById = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const result = await pool.query(
            'SELECT * FROM projects WHERE id = $1 AND created_by = $2',
            [id, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Project not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch project'
        });
    }
};

export const updateProject = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const userId = req.user.id;

    try {
        const result = await pool.query(
            'UPDATE projects SET name = $1, description = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 AND created_by = $4 RETURNING *',
            [name, description, id, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Project not found or not authorized'
            });
        }


        res.status(200).json({
            status: 'success',
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to update project'
        });
    }
};

export const deleteProject = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const result = await pool.query(
            'DELETE FROM projects WHERE id = $1 AND created_by = $2 RETURNING *',
            [id, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Project not found or not authorized'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Project deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to delete project'
        });
    }
};
