const express = require("express");
const app = express();
const PORT = 3000;

// Serve static files from the "public" directory
app.use(express.static("public", (req, res, next) => {
    console.log("Request received for:", req.url);
    next();
}));
app.use(express.json());

let tasks = [];

// Endpoint to get tasks
app.get("/tasks", (req, res) => {
    console.log("Sending tasks:", tasks);
    res.json(tasks);
});

// Endpoint to add a new task
app.post("/tasks", (req, res) => {
    const task = { id: Date.now(), text: req.body.text, completed: false };
    tasks.push(task);
    console.log("Task added:", task);
    res.json(task);
});

// Endpoint to toggle task completion
app.put("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find((t) => t.id === id);
    if (task) {
        task.completed = !task.completed;
        console.log("Task updated:", task);
        res.json(task);
    } else {
        res.status(404).send("Task not found");
    }
});

// Endpoint to delete a task
app.delete("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter((task) => task.id !== id);
    console.log("Task deleted with id:", id);
    res.sendStatus(200);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
