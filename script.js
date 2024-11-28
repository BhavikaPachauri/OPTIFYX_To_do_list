
// Cursor Animation
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;

    cursorFollower.style.left = `${e.pageX}px`;
    cursorFollower.style.top = `${e.pageY}px`;
});

// Load tasks on page load
window.onload = function () {
    loadTasks();
};

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const todoList = document.getElementById("todoList");

    // Create task item
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = taskText;
    span.onclick = function () {
        toggleComplete(li);
    };

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.onclick = function () {
        editTask(li, span);
    };

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = function () {
        todoList.removeChild(li);
        saveTasks();
    };

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);

    taskInput.value = "";
    saveTasks();
}

function toggleComplete(taskItem) {
    taskItem.classList.toggle("completed");
    saveTasks();
}

function editTask(taskItem, taskSpan) {
    const newTaskText = prompt("Edit your task:", taskSpan.textContent);
    if (newTaskText !== null && newTaskText.trim() !== "") {
        taskSpan.textContent = newTaskText.trim();
        saveTasks();
    }
}

function saveTasks() {
    const todoList = document.getElementById("todoList");
    const tasks = [];

    for (const li of todoList.children) {
        const task = {
            text: li.querySelector("span").textContent,
            completed: li.classList.contains("completed"),
        };
        tasks.push(task);
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        const todoList = document.getElementById("todoList");

        tasks.forEach((task) => {
            const li = document.createElement("li");
            const span = document.createElement("span");
            span.textContent = task.text;
            span.onclick = function () {
                toggleComplete(li);
            };

            if (task.completed) {
                li.classList.add("completed");
            }

            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.classList.add("edit-btn");
            editBtn.onclick = function () {
                editTask(li, span);
            };

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.onclick = function () {
                todoList.removeChild(li);
                saveTasks();
            };

            li.appendChild(span);
            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
            todoList.appendChild(li);
        });
    }
}
