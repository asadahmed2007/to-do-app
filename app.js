// Get DOM elements
const inputField = document.getElementById('todo-input');
const addButton = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const sortCompletedButton = document.getElementById('sort-completed');
const sortCreationButton = document.getElementById('sort-creation');

// Task array
let tasks = [];

// Load tasks from localStorage
function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem('tasks'));
  if (storedTasks) {
    tasks = storedTasks;
  }
  renderTasks();
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks to the DOM
function renderTasks() {
  todoList.innerHTML = '';
  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.classList.toggle('completed', task.completed);

    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    listItem.appendChild(taskText);

    const completeButton = document.createElement('button');
    completeButton.textContent = '✔';
    completeButton.addEventListener('click', () => toggleComplete(index));
    listItem.appendChild(completeButton);

    const editButton = document.createElement('button');
    editButton.textContent = '✎';
    editButton.classList.add('edit-btn');
    editButton.addEventListener('click', () => editTask(index));
    listItem.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '🗑️';
    deleteButton.addEventListener('click', () => deleteTask(index));
    listItem.appendChild(deleteButton);

    todoList.appendChild(listItem);
  });

  saveTasks();
}

// Add a new task
function addTask() {
  const taskText = inputField.value.trim();
  if (taskText === '') return;

  const newTask = {
    text: taskText,
    completed: false,
    createdAt: new Date().getTime()
  };

  tasks.push(newTask);
  inputField.value = '';
  renderTasks();
}

// Toggle task completion
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Edit a task
function editTask(index) {
  const newTaskText = prompt('Edit your task:', tasks[index].text);
  if (newTaskText) {
    tasks[index].text = newTaskText;
    renderTasks();
  }
}

// Delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Sort tasks by completion status
function sortByCompletion() {
  tasks.sort((a, b) => a.completed - b.completed);
  renderTasks();
}

// Sort tasks by creation time
function sortByCreation() {
  tasks.sort((a, b) => b.createdAt - a.createdAt);
  renderTasks();
}

// Event listeners
addButton.addEventListener('click', addTask);
sortCompletedButton.addEventListener('click', sortByCompletion);
sortCreationButton.addEventListener('click', sortByCreation);

// Load tasks on page load
loadTasks();
