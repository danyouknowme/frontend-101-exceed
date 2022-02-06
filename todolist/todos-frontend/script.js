const todoList = document.querySelector('.todo-list');
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');

todoForm.addEventListener('submit', onAddTodo);

async function onAddTodo(e) {
  e.preventDefault();

  // check if value in input tag is null
  if (!todoInput) return;

  const response = await fetch('http://localhost:4000todos', {
    method: 'POST',
    body: JSON.stringify({ title: todoInput.value }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  const todoItem = createTodoItem(data.todo);

  todoList.appendChild(todoItem);
  // clear value in input tag
  todoInput.value = '';
}

function createTodoCompleteButton() {
  const btnTodoComplete = document.createElement('button');
  const icon = document.createElement('i');

  btnTodoComplete.classList.add('btn-todo-complete');
  icon.classList.add('fas', 'fa-check');

  btnTodoComplete.appendChild(icon);
  return btnTodoComplete;
}

function createTodoRemoveButton() {
  const btnTodoRemove = document.createElement('button');
  const icon = document.createElement('i');

  btnTodoRemove.classList.add('btn-todo-remove');
  icon.classList.add('fas', 'fa-trash');

  btnTodoRemove.appendChild(icon);
  return btnTodoRemove;
}

async function onMarkTodoAsCompleted(e) {
  const todoItem = e.target.parentNode;
  const todoId = todoItem.dataset.todoId;
  const completed = todoItem.classList.contains('completed');

  await fetch(`http://localhost:4000/todos/${todoId}`, {
    method: 'PATCH',
    body: JSON.stringify({ completed: !completed }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  todoItem.classList.toggle('completed');
  console.log(todoItem.children);
}

async function onRemoveTodo(e) {
  const todoItem = e.target.parentNode;
  const todoId = todoItem.dataset.todoId;

  if (confirm('Are you sure you want to remove this todolist?')) {
    await fetch(`http://localhost:4000/todos/${todoId}`, {
      method: 'DELETE',
    });
  }
}

function createTodoItem(todo) {
  const todoItem = document.createElement('div');
  const todoTitle = document.createElement('p');
  const btnTodoComplete = createTodoCompleteButton();
  const btnTodoRemove = createTodoRemoveButton();

  if (todo.completed) todoItem.classList.add('completed');
  todoItem.classList.add('todo-item');
  todoTitle.classList.add('todo-title');

  todoTitle.innerText = todo.title;
  todoItem.dataset.todoId = todo.id;

  todoItem.append(todoTitle, btnTodoComplete, btnTodoRemove);

  btnTodoComplete.addEventListener('click', onMarkTodoAsCompleted);
  btnTodoRemove.addEventListener('click', onRemoveTodo);

  return todoItem;
}

function createTodoList(todos) {
  todos.forEach((todo) => {
    const todoItem = createTodoItem(todo);
    todoList.append(todoItem);
  });
}

async function getTodos() {
  const response = await fetch('http://localhost:4000/todos');
  const todos = await response.json();
  return todos;
}

(async () => {
  const todos = await getTodos();
  createTodoList(todos);
})();
