let tasks = [];

window.addEventListener("DOMContentLoaded", () => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        updateTaskList();
    }
});

const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text, completed: false });
        taskInput.value = "";
        saveTasks();
        updateTaskList();
    }
};

const taskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    updateTaskList();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    saveTasks();
    updateTaskList();
};

const editTask = (index) => {
    const newText = prompt("Edit your task:", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        saveTasks();
        updateTaskList();
    }
};

const updateTaskList = () => {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? "completed" : ""}">
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}>
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <i class="fa-solid fa-trash emo" data-index="${index}"></i>
                    <i class="fa-solid fa-pen-to-square emo2" data-index="${index}"></i>
                </div>
            </div>
        `;

        listItem.querySelector(".checkbox").addEventListener("change", () => taskComplete(index));
        listItem.querySelector(".fa-trash").addEventListener("click", () => deleteTask(index));
        listItem.querySelector(".fa-pen-to-square").addEventListener("click", () => editTask(index));

        taskList.appendChild(listItem);
    });

    updateStats();
};

const updateStats = () => {
    const completeTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks === 0 ? 0 : (completeTasks / totalTasks) * 100;
    const progressBar = document.getElementById("progress");

    progressBar.style.width = `${progress}%`;

    document.getElementById("number").innerText = `${completeTasks} / ${totalTasks}`;
};

document.getElementById("newTask").addEventListener("click", (e) => {
    e.preventDefault();
    addTask();
});
