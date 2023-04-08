const todoContainerEl = document.querySelector("#todoContainer");
const todoInputEl = document.querySelector("#todoInput");
const todoButtonEl = document.querySelector("#todoButton");
const logoutButtonEl = document.querySelector("#logoutButton");

const isLogin = () => {
  const loginedUser = localStorage.getItem("login");
  if (!loginedUser) {
    alert("로그인이 필요합니다!");
    location.href = "./signin.html";
  }
};

const readTodo = () => {
  todoContainerEl.innerHTML = "";

  const todos = JSON.parse(localStorage.getItem("todos")).reverse(); // 최근 입력이 위로

  todos.forEach((todo) => {
    const divEl = document.createElement("div");
    const completeEl = document.createElement("input");
    const userEl = document.createElement("p");
    const deleteEl = document.createElement("button");

    const contentEl = document.createElement("label");

    divEl.className = "todoItem";
    completeEl.type = "checkbox";
    completeEl.className = "checkbox";
    completeEl.id = todo.id;
    completeEl.addEventListener("click", () => {
      updateComplete(todo.id, completeEl.checked);
    });
    completeEl.checked = todo.complete;

    deleteEl.type = "button";
    deleteEl.textContent = "X";
    deleteEl.className = "deleteButton";
    deleteEl.addEventListener("click", () => deleteTodo(todo.id));

    contentEl.textContent = todo.content;
    contentEl.htmlFor = todo.id;

    userEl.textContent = todo.user;

    divEl.append(completeEl, contentEl, userEl, deleteEl);
    todoContainerEl.append(divEl);
  });
};

const createTodo = () => {
  const todoText = todoInputEl.value;

  const todos = JSON.parse(localStorage.getItem("todos"));
  const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;

  console.log(localStorage.getItem("login"));

  const newTodo = {
    id: newId,
    complete: false,
    content: todoText,
    user: localStorage.getItem("login"),
  };

  todos.push(newTodo);

  localStorage.setItem("todos", JSON.stringify(todos));
  todoInputEl.value = "";

  readTodo();
};

const deleteTodo = (deleteId) => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  const filterdTodos = todos.filter((todo) => todo.id !== deleteId);

  localStorage.setItem("todos", JSON.stringify(filterdTodos));
  readTodo();
};

const init = () => {
  isLogin();

  if (!localStorage.getItem("todos")) {
    localStorage.setItem("todos", JSON.stringify([]));
  }

  readTodo();

  todoButtonEl.addEventListener("click", createTodo);
  // logoutButtonEl.addEventListener("click", logout);
};

document.addEventListener("DOMContentLoaded", init);
