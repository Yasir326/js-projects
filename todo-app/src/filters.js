const filters = {
  searchTodo: "",
  hideCompleted: false,
};

export const getFilters = () => filters;

export const setFilters = (updates) => {
  if (typeof updates.searchTodo === "string") {
    filters.searchTodo = updates.searchTodo;
  }

  if (typeof updates.hideCompleted === "boolean") {
    filters.hideCompleted = updates.hideCompleted;
  }
};
