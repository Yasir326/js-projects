import { v4 as uuidv4 } from "uuid";

let todos = [];

const loadTodos = () => {
  const todoData = localStorage.getItem("todos");
  try {
    return todoData ? JSON.parse(todoData) : [];
  } catch (e) {
    return [];
  }
};

export const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

export const getTodos = () => todos;

export const createTodo = (text) => {
  if (text.length > 0) {
    todos.push({
      id: uuidv4(),
      text,
      completed: false,
    });
    saveTodos();
  }
};

export const removeTodo = (id) => {
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

export const toggleTodo = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
};

todos = loadTodos();
