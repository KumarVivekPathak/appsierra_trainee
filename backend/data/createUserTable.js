import pool from "../config/db.js";

const createUserTable = async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        country VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
    );
    `;
    try{
        await pool.query(queryText);
        console.log("User table created if not exists");
    }catch(error){
        console.error("Error creating user table:",error);
    }
};

export default createUserTable;