let todos = [];
const TODO_KEY = 'TODO_KEY';

const todosContainer = document.getElementById('days');
const nextTodo = document.querySelector('.todo__day');

function loadData() {
  const todosString = localStorage.getItem(TODO_KEY);
  const todoArray = JSON.parse(todosString);
  if (Array.isArray(todoArray)) {
    todos = todoArray;
  }
}

function saveData() {
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

function rerender() {
  todosContainer.innerHTML = '';
  for (const index in todos) {
    const element = document.createElement('div');
    element.classList.add('todo');
    element.id = index
    const isDone = todos[index].done ? 'checked' : '';
    const isDoneClass = todos[index].done ? element.classList.add('checked__todo') : '';
    isDoneClass;
    element.innerHTML = `
      <div class="todo__day">Дело ${Number(index) + 1}</div>
      <div class="todo__comment">
      <input type="checkbox" id="checkbox" onclick="toggleDone(${index})" ${isDone} />
      <input type="text" value="${todos[index].text}" class="todo__text" id="todo-${index}" ${todos[index][1] === "todo" ? '' : 'checked'}></div>
      <button class="todo__delete", onclick="deleteTodo(${index})">
        <img src="./images/delete.svg", alt="Удалить дело ${index + 1}" />
      </button>
      <button class="todo__edit" onclick="editTodo(${index})">
        <img src="./images/edit.webp", alt="Редактировать дело ${index + 1}" />
      </button>`;
    todosContainer.appendChild(element);
  }
  nextTodo.innerHTML = `Дело ${todos.length + 1}`;
}

/* work with todos */
function addTodo(event) {
  event.preventDefault();

  const data = event.target['comment'].value;
  if (!data) {
    return;
  }

  const newTodo = {
    text: data,
    done: false
  };
  todos.push(newTodo);
  event.target['comment'].value = '';

  rerender();
  saveData();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  rerender();
  saveData();
}

function editTodo(index) {
  const inputElement = document.getElementById(`todo-${index}`);
  const todoText = inputElement.value;
  todos[index].text = todoText;
  saveData();
}


function toggleDone(index) {
  todos[index].done = !todos[index].done;
  const checkbox = document.getElementById(index);
  checkbox.classList.toggle('checked__todo')
  saveData();
}

/* init */
(() => {
  loadData();
  rerender();
})();

