import { setFilters } from "./filters";
import { createTodo, loadTodos } from "./todos";
import { renderTodos } from "./views";

renderTodos();

document.querySelector("#filter").addEventListener("input", (e) => {
  setFilters({
    searchTodo: e.target.value,
  });
  renderTodos();
});

document.querySelector("#hide-completed").addEventListener("change", (e) => {
  setFilters({
    hideCompleted: e.target.checked,
  });
  renderTodos();
});

document.querySelector("#add-todo").addEventListener("submit", (e) => {
  e.preventDefault();
  const text = e.target.elements.addTodo.value.trim();
  createTodo(text);
  renderTodos();

  e.target.elements.addTodo.value = "";
});

window.addEventListener("storage", (e) => {
  if (e.key === "todos") {
    loadTodos()
    renderTodos();
  }
});
