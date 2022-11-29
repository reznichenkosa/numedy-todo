import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { setCountPage, setCurrentPage } from "../store/filterSlice";
import { selectTodosByFilters } from "../store/selectors";
import { sendToBin, Todo, toggleComplete, toggleOpen } from "../store/todoSlice";
import TodoItem from "./TodoItem";

const TodoList: React.FC = () => {
  const todos = useAppSelector(selectTodosByFilters);
  const currentPage = useAppSelector((state) => state.filter.currentPage);

  const todosPage = todos.slice((currentPage - 1) * 15, (currentPage - 1) * 15 + 15);
  const dispatch = useAppDispatch();

  const toggleCompleteHandler = (todo: Todo) => {
    dispatch(toggleComplete(todo));
  };

  const toggleOpenHandler = (todo: Todo) => {
    dispatch(toggleOpen(todo));
  };

  const sendToBinHandler = (todo: Todo) => {
    if (window.confirm("Вы действительно хотите удалить задачу?")) {
      dispatch(sendToBin(todo));
    }
  };

  useEffect(() => {
    const newCountPage = Math.ceil(todos.length / 15) || 1;
    dispatch(setCountPage(newCountPage));
    if (newCountPage < currentPage) {
      dispatch(setCurrentPage(newCountPage));
    }
  }, [todos, dispatch, currentPage]);

  return (
    <div className="w-full flex flex-col gap-2">
      {todosPage.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleCompleteHandler={toggleCompleteHandler}
          sendToBinHandler={sendToBinHandler}
          toggleOpenHandler={toggleOpenHandler}
        />
      ))}
      {todosPage.length === 0 && <div className="text-center">Нет задач</div>}
    </div>
  );
};

export default TodoList;
