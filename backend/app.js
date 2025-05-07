import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import routes from './routes/routes.js';
import pool  from './config/db.js';
import errorHandler from './middleware/errorHandler.js';
import createUserTable from './data/createUserTable.js';
import createProjectTable from './data/createProjectTable.js';
import createTaskTable from './data/createTaskTable.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize database when the app starts
// initDb().catch(console.error);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', routes);

// Basic route
app.get('/', async (req, res) => {
  const result = await pool.query('SELECT current_database()');
  res.send(`the databse name is : ${result.rows[0].current_database} `)
  res.json({ message: 'Welcome to the Express.js API!', database: result.rows[0].current_database });
});

// Error handling middleware
app.use(errorHandler);

// Create tables in the correct order to satisfy foreign key constraints
const initializeDatabase = async () => {
    try {
        await createUserTable();
        await createProjectTable();
        await createTaskTable();
        console.log('Database tables initialized successfully');
        
        // Start server after database is initialized
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log('Database connection established');
        });
    } catch (error) {
        console.error('Error initializing database:', error);
        process.exit(1);
    }
};

// Initialize database and start server
initializeDatabase().catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
});

export default app;
