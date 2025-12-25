document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("todoInput");
  const addBtn = document.getElementById("addBtn");
  const todosContainer = document.getElementById("todosContainer");
  const themeToggle = document.getElementById("themeToggle");



  /* Load Todos */
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos.forEach(todo => createTodo(todo.text, todo.completed));

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }

  /* Add Button */
  addBtn.addEventListener("click", addTodo);

  /* ENTER KEY ADD */
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  });

  function addTodo() {
    if (input.value.trim() === "") return;
    createTodo(input.value);
    saveTodos();
    input.value = "";
  }

  /* Create Todo */
  function createTodo(text, completed = false) {
    const todoDiv = document.createElement("div");
    todoDiv.className = "todo-item";
    if (completed) todoDiv.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;

    const span = document.createElement("span");
    span.textContent = text;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";

    /* Complete animation */
    checkbox.addEventListener("change", () => {
      todoDiv.classList.toggle("completed");
      saveTodos();
    });

    /* Smooth delete */
    delBtn.addEventListener("click", () => {
      todoDiv.classList.add("removing");

      setTimeout(() => {
        todoDiv.remove();
        saveTodos();
      }, 300);
    });

    todoDiv.append(checkbox, span, delBtn);
    todosContainer.appendChild(todoDiv);
  }

  /* Save to LocalStorage */
  function saveTodos() {
    const todos = [];
    document.querySelectorAll(".todo-item").forEach(todo => {
      todos.push({
        text: todo.querySelector("span").textContent,
        completed: todo.classList.contains("completed"),
      });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  }

});
