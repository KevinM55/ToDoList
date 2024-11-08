document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("new-task");
    const addButton = document.querySelector("button");
    const taskList = document.getElementById("task-list");

    // Fetch and display tasks from the server on load
    fetchTasks();

    // Event listener for adding a new task
    addButton.addEventListener("click", () => {
        const text = taskInput.value.trim();
        if (text) {
            addTask(text);
            taskInput.value = "";
        }
    });

    // Function to fetch tasks from the server
    function fetchTasks() {
        fetch("/tasks")
            .then(response => response.json())
            .then(tasks => {
                taskList.innerHTML = ""; // Clear current list
                tasks.forEach(task => renderTask(task));
            })
            .catch(error => console.error("Error fetching tasks:", error));
    }

    // Function to render a task item
    function renderTask(task) {
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
    }

    // Function to add a new task
    function addTask(text) {
        fetch("/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text }),
        })
            .then(response => response.json())
            .then(task => renderTask(task))
            .catch(error => console.error("Error adding task:", error));
    }

    // Function to toggle task completion
    function toggleTaskCompletion(id, completed) {
        fetch(`/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ completed }),
        })
            .then(response => response.json())
            .then(() => fetchTasks()) // Refresh task list after update
            .catch(error => console.error("Error updating task:", error));
    }

    // Function to delete a task
    function deleteTask(id) {
        fetch(`/tasks/${id}`, {
            method: "DELETE",
        })
            .then(() => fetchTasks()) // Refresh task list after deletion
            .catch(error => console.error("Error deleting task:", error));
    }
});
