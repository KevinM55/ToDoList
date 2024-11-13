const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const port = 3000;

// Create and connect to the SQLite database
const db = new sqlite3.Database("./tasks.db", (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to the SQLite database.");
    }
});

// Create the tasks table with the `created_at` column if it doesn't exist
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            text TEXT NOT NULL,
            completed BOOLEAN NOT NULL CHECK (completed IN (0, 1)) DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error("Error creating table:", err.message);
        } else {
            console.log("Tasks table is ready.");
        }
    });
});
app.post("/tasks", (req, res) => {
    const { text } = req.body;
    const sql = "INSERT INTO tasks (text, completed) VALUES (?, ?)";
    db.run(sql, [text, false], function (err) {
        if (err) {
            console.error("Error adding task:", err.message);
            res.status(500).json({ error: "Failed to add task" });
        } else {
            const newTask = { id: this.lastID, text, completed: false };
            res.json(newTask); // Send the new task as JSON
        }
    });
});


// Middleware to parse JSON and serve static files
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve static files (e.g., index.html)

// Serve the index.html page when accessing the root
app.get("/tasks", (req, res) => {
    db.all("SELECT id, text, completed FROM tasks", (err, rows) => {
        if (err) {
            console.error("Error fetching tasks:", err.message);
            res.status(500).json({ error: "Failed to retrieve tasks" });
        } else {
            res.json(rows); // Send tasks as JSON
        }
    });s
});

// (Your existing routes here...)

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
