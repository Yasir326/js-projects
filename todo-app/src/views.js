import { getFilters } from "./filters";
import { getTodos, removeTodo, toggleTodo } from "./todos";

export const renderTodos = () => {
  const filteredTodos = filterTodos();
  const incomeplteTodos = filteredTodos.filter((todo) => !todo.completed);
  const emptyMessage = document.createElement("p");
  const todoEl = document.querySelector("#todos");
  emptyMessage.classList.add("empty-message");
  emptyMessage.textContent = "Nothing left todo ☹️";

  todoEl.innerHTML = "";

  document
    .querySelector("#todos")
    .appendChild(generateSummaryDom(incomeplteTodos));

  filteredTodos.length > 0
    ? filteredTodos.forEach((todo) => {
        todoEl.appendChild(generateTodoDom(todo));
      })
    : todoEl.appendChild(emptyMessage);
};

const generateTodoDom = (todo) => {
  const {
    checkbox,
    containerEl,
    todoText,
    todoEl,
    removeButton,
  } = generateElements();

  createCheckbox(checkbox, containerEl, todo);
  todoText.textContent = todo.text;
  containerEl.appendChild(todoText);
  //Setup container
  createContainer(todoEl, containerEl);
  //Setup remove button
  createRemoveButton(removeButton, todoEl, todo);
  return todoEl;
};

const generateSummaryDom = (incomeplteTodos) => {
  const summary = document.createElement("h2");
  summary.classList.add("list-title");
  const plural = incomeplteTodos.length === 1 ? "" : "s";
  summary.textContent = `You have ${incomeplteTodos.length} task${plural} left to complete`;

  return summary;
};

const createRemoveButton = (removeButton, todoEl, todo) => {
  removeButton.textContent = "remove";
  removeButton.classList.add("button", "button--text");
  todoEl.appendChild(removeButton);
  removeButton.addEventListener("click", () => {
    removeTodo(todo.id);
    renderTodos();
  });
};

const createContainer = (todoEl, containerEl) => {
  todoEl.classList.add("list-item");
  containerEl.classList.add("list-item__container");
  todoEl.appendChild(containerEl);
};

const createCheckbox = (checkbox, containerEl, todo) => {
  checkbox.setAttribute("type", "checkbox");
  containerEl.appendChild(checkbox);
  checkbox.checked = todo.completed;
  checkbox.addEventListener("change", () => {
    // todo.completed = !todo.completed;
    toggleTodo(todo.id);
    renderTodos();
  });
};

const generateElements = () => {
  const todoEl = document.createElement("label");
  const containerEl = document.createElement("div");
  const removeButton = document.createElement("button");
  const checkbox = document.createElement("input");
  const todoText = document.createElement("span");
  return { checkbox, containerEl, todoText, todoEl, removeButton };
};

const filterTodos = () => {
  const todos = getTodos();
  const {searchTodo, hideCompleted} = getFilters();
  return todos.filter((todo) => {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(searchTodo.toLowerCase());
    const hideCompletedMatch = !hideCompleted || !todo.completed;
    return searchTextMatch && hideCompletedMatch;
  });
};
