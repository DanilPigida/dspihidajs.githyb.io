const list = document.getElementById("todo-list");
const itemCountSpan = document.getElementById("item-count");
const uncheckedCountSpan = document.getElementById("unchecked-count");

let id = 100;
let todos = loadTodos();
render();

//todo = {id: Number, text: String, checked: Boolean}

function newTodo() {
  const text = prompt("Enter todo");
  let todo = { id: id++, text, checked: Math.random() < 0.5 };
  todos.push(todo);
  render();
}
function renderTodo(todo) {
  return `
        <li class="list-group-item">
          <input type="checkbox" class="form-check-input me-2" id="${
            todo.id
          }" ${todo.checked ? "checked" : ""} onchange="checkTodo(${todo.id})"/>
          <label for="${todo.id}"><span class="${
    todo.checked ? "text-success text-decoration-line-through" : ""
  }">${todo.text}</span></label>
          <button class="btn btn-danger btn-sm float-end" onClick="deleteTodo(${
            todo.id
          })">delete</button>
        </li>
  `;
}

function render() {
  list.innerHTML = todos.map((todo) => renderTodo(todo)).join("");
  saveTodos();
  updateCount();
}

function updateCount() {
  itemCountSpan.textContent = todos.length;
  uncheckedCountSpan.textContent = todos.filter((todo) => !todo.checked).length;
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  render();
}

function checkTodo(id) {
  const todo = todos.find((t) => t.id === id);
  todo.checked = !todo.checked;
  render();
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  const saved = localStorage.getItem("todos");
  return saved ? JSON.parse(saved) : [];
}
