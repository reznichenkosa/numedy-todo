import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { removeTodoFromBin, restoreFromBin, Todo } from "../store/todoSlice";
import DeletedTodoItem from "./DeletedTodoItem";

const DeletedTodoList: React.FC = () => {
  const todos = useAppSelector((state) => state.todo.entities.filter((todo) => todo.isDeleted));
  const dispatch = useAppDispatch();

  const restoreFromBinHandler = (todo: Todo) => {
    if (window.confirm("Вы действительно хотите восстановить задачу?")) {
      dispatch(restoreFromBin(todo));
    }
  };

  const removeTodoFromBinHandler = (todo: Todo) => {
    if (
      window.confirm(
        "Вы действительно хотите удалить задачу из корзины? Восстановление будет невозможно!"
      )
    ) {
      dispatch(removeTodoFromBin(todo));
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {todos.map((todo) => (
        <DeletedTodoItem
          key={todo.id}
          todo={todo}
          restoreFromBinHandler={restoreFromBinHandler}
          removeTodoFromBinHandler={removeTodoFromBinHandler}
        />
      ))}
      {todos.length === 0 && <div className="text-center">Нет удаленных задач</div>}
    </div>
  );
};

export default DeletedTodoList;
