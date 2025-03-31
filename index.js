/**
 * JavaScript code for a simple to-do list application.
 * Features:
 * - Add tasks
 * - Mark tasks as completed
 * - Delete tasks
 * - Filter tasks (All, Active, Completed)
 * - Store tasks in localStorage
 */

let optionContainer = document.querySelector(".chooseContainer");
let todoList = document.querySelector(".todoList");
let taskList = new Map(); // Stores tasks as key-value pairs (task text -> completion status)
let selectedOpt = ""; // Tracks the current filter selection
let taskInfo = document.getElementsByTagName('p');

/**
 * Retrieves saved tasks from localStorage and loads them into taskList.
 */
function loadFromLocalStorage() {
  let storedTasks = localStorage.getItem("todos");
  if (storedTasks) {
    taskList = new Map(JSON.parse(storedTasks));
  }
}

loadFromLocalStorage();

// Register event for the add task button

document.querySelector(".addTask").addEventListener("click", addTaskIntoTodo);

/**
 * Creates a task element and appends it to the todoList.
 * @param {string} taskTxt - The task text
 * @param {boolean} checkFlag - Whether the task is completed
 */
function createTaskElement(taskTxt, checkFlag) {
  let mainContainer = document.createElement("div");
  mainContainer.classList.add("border", "rounded-3", "px-3", "py-2", "mb-3", "d-flex", "align-items-center", "justify-content-between");

  let innerContainer = document.createElement("div");
  innerContainer.classList.add("form-check", "mx-2");

  let checkBox = document.createElement("input");
  checkBox.classList.add("form-check-input", "rounded-circle");
  checkBox.type = "checkbox";
  checkBox.checked = checkFlag;

  let label = document.createElement("label");
  label.classList.add("form-check-label");
  label.classList.toggle("text-decoration-line-through", checkFlag);
  label.classList.toggle("text-grey", checkFlag);
  label.innerText = taskTxt;

  innerContainer.appendChild(checkBox);
  innerContainer.appendChild(label);

  mainContainer.appendChild(innerContainer);
  mainContainer.appendChild(getDeleteIcon());

  todoList.appendChild(mainContainer);

  taskInfo[0].textContent = findTaskStatus();

  console.log(taskInfo)
}

/**
 * Creates and returns a delete icon element.
 * @returns {DocumentFragment} - The delete icon SVG element
 */
function getDeleteIcon() {
  let template = document.createElement("template");
  template.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
    class="lucide lucide-trash2-icon lucide-trash-2 delete-icon">
    <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
    <line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>`;
  return template.content.cloneNode(true);
}

/**
 * Displays an alert if no task text is entered.
 */
function showAlert() {
  let snackBar = document.querySelector(".alert-danger");
  snackBar.classList.toggle("alert-danger-display");
  setTimeout(() => {
    snackBar.classList.toggle("alert-danger-display");
  }, 1000);
}

/**
 * Adds a task to the to-do list and updates localStorage.
 */
function addTaskIntoTodo() {
  let inputTxt = document.getElementsByTagName("input")[0];
  if (!inputTxt.value) return showAlert();
  createTaskElement(inputTxt.value, false);
  taskList.set(inputTxt.value, false);
  saveToLocalStorage();
  inputTxt.value = "";
}

/**
 * Saves the task list to localStorage.
 */
function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(Array.from(taskList.entries())));
}

// Event listener for checkboxes and delete icons

todoList.addEventListener("click", (e) => {
  if (e.target.matches("input[type=checkbox]")) {
    let checkBox = e.target.nextElementSibling;
    checkBox.classList.toggle("text-decoration-line-through");
    checkBox.classList.toggle("text-grey");
    taskList.set(checkBox.innerText, !taskList.get(checkBox.innerText));
    e.target.parentElement.parentElement.classList.toggle("bg-light");
    saveToLocalStorage();
    sparation(selectedOpt);
  } else if (e.target.closest(".delete-icon")) {
    let key = e.target.closest(".border").querySelector("label").innerText;
    taskList.delete(key);
    saveToLocalStorage();
    sparation(selectedOpt);
    e.target.closest(".border").remove();
  }
});

// Creating filter buttons (All, Active, Completed)
["All", "Active", "Completed"].forEach((ele, idx) => {
  let btn = document.createElement("button");
  btn.innerText = ele;
  btn.classList.add("btn", "switchOption", "rounded-3");
  if (idx === 0) btn.classList.add("btn-dark");
  optionContainer.appendChild(btn);
});

// Adding event listeners to filter buttons
Array.from(optionContainer.children).forEach((ele) => {
  ele.addEventListener("click", () => {
    Array.from(optionContainer.children).forEach((innerEle) => {
      innerEle.classList.toggle("btn-dark", innerEle === ele);
      if (innerEle === ele) {
        sparation(innerEle.innerText);
      }
    });
  });
});

/**
 * Filters tasks based on the selected mode.
 * @param {string} mode - The filter option (All, Active, Completed)
 */
function sparation(mode) {
  todoList.innerHTML = "";
  selectedOpt = mode;
  taskList.forEach((item, idx) => {
    if ((mode === "Completed" && item) || (mode === "Active" && !item) || mode === "All") {
      createTaskElement(idx, item);
    }
  });
  noTask(todoList.children.length, mode);
}

/**
 * Displays a message if there are no tasks in the selected filter.
 * @param {number} arr - Number of tasks in the list
 * @param {string} mode - The selected filter mode
 */
function noTask(arr, mode) {
  if (arr === 0) {
    let dataNotFound = document.createElement("p");
    dataNotFound.innerText = `No ${mode.toLowerCase()} tasks`;
    todoList.appendChild(dataNotFound);
    todoList.classList.add("text-center");
  }
}



function findTaskStatus() {
  let cmpltCnt = 0;

  taskList.forEach((item) => {
    if (item) {
      cmpltCnt++;
    }
  });

  return `${taskList.size} tasks • ${cmpltCnt} completed`;
}


// Initialize UI with stored tasks
sparation("All");
