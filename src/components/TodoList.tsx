import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { sendToBin, Todo, toggleComplete } from "../store/todoSlice";
import TodoItem from "./TodoItem";

const TodoList: React.FC = () => {
  const todos = useAppSelector((state) => state.todo.entities.filter((todo) => !todo.isDeleted));
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
    </div>
  );
};

export default TodoList;
