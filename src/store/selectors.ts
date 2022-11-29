import { createSelector } from "@reduxjs/toolkit";
import { FilterParam, SortParam } from "./filterSlice";
import { RootState } from "./index";

export const selectAllTodos = (state: RootState) => state.todo.entities;
export const selectFilterParam = (state: RootState) => state.filter.filter;
export const selectSearchQuery = (state: RootState) => state.filter.searchQuery;
export const selectSortParam = (state: RootState) => state.filter.sort;
export const selectCurrentPage = (state: RootState) => state.filter.currentPage;

export const selectTodosByFilters = createSelector(
  [selectAllTodos, selectFilterParam, selectSearchQuery, selectSortParam, selectCurrentPage],
  (todos, filterParam, searchParam, sortParam, currentPage) => {
    todos = todos.filter((todo) => !todo.isDeleted);

    const filteredTodos = todos.filter((todo) => {
      if (filterParam === FilterParam.ShowActive) return !todo.isCompleted;
      if (filterParam === FilterParam.ShowAll) return todo;
      if (filterParam === FilterParam.ShowCompleted) return todo.isCompleted;
      return todo;
    });

    const todosWithSearchQuery = filteredTodos.filter(
      (todo) =>
        todo.title.toLowerCase().includes(searchParam.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchParam.toLowerCase())
    );

    switch (sortParam) {
      case SortParam.SortByCreatedAtASC:
        todosWithSearchQuery.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case SortParam.SortByCreatedAtDesc:
        todosWithSearchQuery.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case SortParam.SortByDeadlineAtASC:
        todosWithSearchQuery.sort(
          (a, b) => new Date(a.deadlineAt).getTime() - new Date(b.deadlineAt).getTime()
        );
        break;
      case SortParam.SortByDeadlineAtDesc:
        todosWithSearchQuery.sort(
          (a, b) => new Date(b.deadlineAt).getTime() - new Date(a.deadlineAt).getTime()
        );
        break;
      case SortParam.SortByIsCompletedASC:
        todosWithSearchQuery.sort((a, b) => +b.isCompleted - +a.isCompleted);
        break;
      case SortParam.SortByIsCompletedDesc:
        todosWithSearchQuery.sort((a, b) => +a.isCompleted - +b.isCompleted);
        break;
      case SortParam.SortByTitleASC:
        todosWithSearchQuery.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case SortParam.SortByTitleDesc:
        todosWithSearchQuery.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }
    return todosWithSearchQuery;
  }
);
