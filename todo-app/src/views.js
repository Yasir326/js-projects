import { getFilters } from "./filters";
import { getTodos, removeTodo, saveTodos, toggleTodo } from "./todos";

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

export const generateSummaryDom = (incomeplteTodos) => {
  const summary = document.createElement("h2");
  summary.classList.add("list-title");
  const plural = incomeplteTodos.length === 1 ? "" : "s";
  summary.textContent = `You have ${incomeplteTodos.length} task${plural} left to complete`;

  return summary;
};

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

const createRemoveButton = (removeButton, todoEl, todo) => {
  removeButton.textContent = "remove";
  removeButton.classList.add("button", "button--text");
  todoEl.appendChild(removeButton);
  removeButton.addEventListener("click", () => {
    removeTodo(todo.id);
    saveTodos();
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
    saveTodos();
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
  const filters = getFilters();
  return todos.filter((todo) => {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchTodo.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
    return searchTextMatch && hideCompletedMatch;
  });
};
