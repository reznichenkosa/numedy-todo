import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { selectTodosByFilters } from "../store/selectors";
import { sendToBin, Todo, toggleComplete } from "../store/todoSlice";
import TodoItem from "./TodoItem";

const TodoList: React.FC = () => {
  const todos = useAppSelector(selectTodosByFilters);
  const dispatch = useAppDispatch();

  const toggleCompleteHandler = (todo: Todo) => {
    dispatch(toggleComplete(todo));
  };

  const sendToBinHandler = (todo: Todo) => {
    if (window.confirm("Вы действительно хотите удалить задачу?")) {
      dispatch(sendToBin(todo));
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleCompleteHandler={toggleCompleteHandler}
          sendToBinHandler={sendToBinHandler}
        />
      ))}
      {todos.length === 0 && <div className="text-center">Нет задач</div>}
    </div>
  );
};

export default TodoList;
