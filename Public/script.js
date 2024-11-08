const taskList = document.getElementById("task-list");
const newTaskInput = document.getElementById("new-task");

// Log to confirm script is loading
console.log("script.js loaded");

// Fetch and display tasks when the page loads
window.onload = async function () {
    try {
        const response = await fetch("/tasks");
        const tasks = await response.json();
        tasks.forEach((task) => {
            displayTask(task);
        });
    } catch (error) {
        console.error("Error loading tasks:", error);
    }
};

// Function to add a task
async function addTask() {
    const text = newTaskInput.value.trim();
    if (text === "") return;

    try {
        const response = await fetch("/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text }),
        });

        const task = await response.json();
        displayTask(task);
        newTaskInput.value = "";
    } catch (error) {
        console.error("Error adding task:", error);
    }
}

// Function to display a task in the list
function displayTask(task) {
    const li = document.createElement("li");
    li.textContent = task.text;
    li.dataset.id = task.id;
    if (task.completed) {
        li.style.textDecoration = "line-through";
    }

    const toggleButton = document.createElement("button");
    toggleButton.textContent = task.completed ? "Undo" : "Complete";
    toggleButton.onclick = () => toggleTaskCompletion(task.id, li);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteTask(task.id, li);

    li.appendChild(toggleButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

// Function to toggle task completion
async function toggleTaskCompletion(id, li) {
    try {
        const response = await fetch(`/tasks/${id}`, {
            method: "PUT",
        });
        const task = await response.json();

        if (task.completed) {
            li.style.textDecoration = "line-through";
        } else {
            li.style.textDecoration = "none";
        }
        li.querySelector("button").textContent = task.completed ? "Undo" : "Complete";
    } catch (error) {
        console.error("Error toggling task:", error);
    }
}

// Function to delete a task
async function deleteTask(id, li) {
    try {
        await fetch(`/tasks/${id}`, {
            method: "DELETE",
        });
        li.remove();
    } catch (error) {
        console.error("Error deleting task:", error);
    }
}
