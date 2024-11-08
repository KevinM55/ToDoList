const express = require("express");
const path = require("path");
const db = require("./database"); // Import the database module
const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Fetch tasks from the database
app.get("/tasks", (req, res) => {
    db.all("SELECT * FROM tasks", (err, rows) => {
        if (err) {
            console.error("Error fetching tasks:", err.message);
            res.status(500).json({ error: "Failed to retrieve tasks" });
        } else {
            res.json(rows);
        }
    });
});

// Add a new task to the database
app.post("/tasks", (req, res) => {
    const text = req.body.text;
    db.run("INSERT INTO tasks (text, completed) VALUES (?, 0)", text, function (err) {
        if (err) {
            console.error("Error adding task:", err.message);
            res.status(500).json({ error: "Failed to add task" });
        } else {
            res.json({ id: this.lastID, text, completed: 0 });
        }
    });
});

// Toggle task completion
app.put("/tasks/:id", (req, res) => {
    const id = req.params.id;
    db.get("SELECT completed FROM tasks WHERE id = ?", id, (err, row) => {
        if (err) {
            console.error("Error fetching task:", err.message);
            res.status(500).json({ error: "Failed to update task" });
        } else {
            const newStatus = row.completed ? 0 : 1;
            db.run("UPDATE tasks SET completed = ? WHERE id = ?", newStatus, id, (err) => {
                if (err) {
                    console.error("Error updating task:", err.message);
                    res.status(500).json({ error: "Failed to update task" });
                } else {
                    res.json({ id, completed: newStatus });
                }
            });
        }
    });
});

// Delete a task from the database
app.delete("/tasks/:id", (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM tasks WHERE id = ?", id, (err) => {
        if (err) {
            console.error("Error deleting task:", err.message);
            res.status(500).json({ error: "Failed to delete task" });
        } else {
            res.sendStatus(200);
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
