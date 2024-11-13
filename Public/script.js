document.addEventListener("DOMContentLoaded", fetchAndDisplayTasks); // Fetch tasks on page load

// Add task button functionality
document.querySelector("button").addEventListener("click", () => {
    const taskInput = document.getElementById("new-task");
    const text = taskInput.value.trim();
    if (text) {
        addTask(text); // Add the new task
        taskInput.value = ""; // Clear the input field
    }
});


// Fetch tasks from the backend and display them in the UI
function fetchAndDisplayTasks() {
    fetch("/tasks")
        .then(response => response.json()) // Parse the JSON response
        .then(tasks => {
            const taskList = document.getElementById("task-list");
            taskList.innerHTML = ""; // Clear the current task list

            // Render each task
            tasks.forEach(task => {
                const listItem = document.createElement("li");
                listItem.classList.add("task-item");
                if (task.completed) listItem.classList.add("completed");

                listItem.innerHTML = `
                    <span>${task.text}</span>
                    <div>
                        <button class="complete-btn">✔</button>
                        <button class="delete-btn">✖</button>
                    </div>
                `;

                // Complete button toggles task completion
                listItem.querySelector(".complete-btn").addEventListener("click", () => {
                    toggleTaskCompletion(task.id, !task.completed);
                });

                // Delete button removes task
                listItem.querySelector(".delete-btn").addEventListener("click", () => {
                    deleteTask(task.id);
                });

                taskList.appendChild(listItem);
            });
        })
        .catch(error => console.error("Error fetching tasks:", error)); // Handle errors
}


// Function to add a new task
function addTask(text) {
    fetch("/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }), // Send task text
    })
        .then(response => response.json())
        .then(task => {
            fetchAndDisplayTasks(); // Refresh the task list
        })
        .catch(error => console.error("Error adding task:", error));
}

// Function to toggle task completion status
function toggleTaskCompletion(id, completed) {
    fetch(`/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed }), // Send updated completion status
    })
        .then(response => response.json())
        .then(() => {
            fetchAndDisplayTasks(); // Refresh the task list after update
        })
        .catch(error => console.error("Error updating task:", error));
}

// Function to delete a task
function deleteTask(id) {
    fetch(`/tasks/${id}`, {
        method: "DELETE",
    })
        .then(() => {
            fetchAndDisplayTasks(); // Refresh the task list after deletion
        })
        .catch(error => console.error("Error deleting task:", error));
}
