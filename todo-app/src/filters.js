const filters = {
  searchTodo: "",
  hideCompleted: false,
};

export const getFilters = () => filters;

export const setFilters = ({ searchTodo, hideCompleted }) => {
  if (typeof searchTodo === "string") {
    filters.searchTodo = searchTodo;
  }

  if (typeof hideCompleted === "boolean") {
    filters.hideCompleted = hideCompleted;
  }
};
