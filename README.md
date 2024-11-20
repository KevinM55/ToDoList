# To-Do List Application

A simple, interactive To-Do List application that allows users to add, mark as completed, and delete tasks. This app is built using **Node.js**, **Express**, **SQLite**, and **Bulma** for styling. It demonstrates a basic full-stack implementation with a RESTful API and database integration.

## Features

- Add new tasks to the list.
- Mark tasks as completed, which changes their visual style.
- Delete tasks from the list.
- Fully responsive design, optimized for all screen sizes.
- Styled with Bulma CSS for a modern and clean UI.

## Prerequisites

Before running the application, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- SQLite3

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/todo-list.git
   cd todo-list
Install dependencies:

bash
Copy code
npm install
Initialize the database: The database and tasks table will be automatically created when the application is started for the first time.

Usage
Start the server:

bash
Copy code
npm start
By default, the server will run on http://localhost:3000.

Open the application: Open your browser and navigate to http://localhost:3000.

Interact with the app:

Add tasks using the input field and "Add Task" button.
Mark tasks as completed by clicking the ✔ button.
Delete tasks using the ✖ button.
Project Structure
plaintext
Copy code
todo-list/
│
├── public/                 # Static files (HTML, CSS, JS)
│   ├── index.html          # Main HTML file
│   ├── styles.css          # Custom styles
│   └── script.js           # Frontend JavaScript
│
├── tasks.db                # SQLite database
├── test.js                 # Main application entry point
├── db.js                   # Database connection and table setup
├── package.json            # Project metadata and dependencies
└── README.md               # Project documentation
Technologies Used
Backend: Node.js, Express.js
Database: SQLite
Frontend: HTML, CSS, JavaScript
Styling: Bulma CSS Framework
Future Improvements
Add user authentication for personalized task lists.
Enable due dates and reminders for tasks.
Add categories or tags for task organization.
Implement persistent storage using a cloud database.
Author
Developed by Mduduzi.

https://github.com/user-attachments/assets/5df78e2a-2908-4c87-adb6-7c84e3976e3e



https://github.com/user-attachments/assets/c8fee34a-15eb-499b-9384-a80a31b2c5ee

