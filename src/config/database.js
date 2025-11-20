// database.js (Using the 'sqlite' package)
const sqlite3 = require('sqlite3');
const { open } = require('sqlite'); // Use 'open' from the sqlite package

const path = require('path'); // 1. Import the 'path' module

// 2. Build the path relative to the current file's directory
const DBSOURCE = path.join(__dirname, '../../db.sqlite');

async function setupDatabase() {
    try {
        const db = await open({
            filename: DBSOURCE,
            driver: sqlite3.Database
        });
        
        console.log('Connected to the SQLite database.');
        // use .exec() for statements that don't return rows
        await db.exec(`CREATE TABLE IF NOT EXISTS inventory (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            productName TEXT,
            productQuantity INTEGER
        )`);
        
        return db;

    } catch (err) {
        console.error('Error connecting to the database', err.message);
        throw err;
    }
}

module.exports = setupDatabase();
