import React from "react";
import { useParams } from "react-router-dom";
import TodoEditForm from "../components/TodoEditForm";
import { useAppSelector } from "../hooks/redux-hooks";

const EditPage = () => {
  const { id } = useParams<{ id: string }>();
  const todo = useAppSelector((state) => state.todo.entities.find((todo) => todo.id === id));

  if (!todo) {
    return <>Такой задачи не существует!</>;
  }

  return (
    <div className="container mx-auto flex h-full justify-center py-5 ">
      <div className="w-[800px] flex flex-col gap-4 items-center">
        <TodoEditForm todo={todo} />
      </div>
    </div>
  );
};

export default EditPage;
