const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, 'tasks.db'), (err) => {
    if (err) {
        console.error('Failed to connect to database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    completed BOOLEAN NOT NULL CHECK (completed IN (0, 1)) DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
    `, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Tasks table with timestamps is ready.');
        }
    });
});

module.exports = db;
