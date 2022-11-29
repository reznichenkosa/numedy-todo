import React from "react";
import TodoCreateForm from "../components/TodoCreateForm";

const CreatePage = () => {
  return (
    <div className="container mx-auto flex h-full justify-center py-5 ">
      <div className="w-[800px] flex flex-col gap-4 items-center">
        <TodoCreateForm />
      </div>
    </div>
  );
};

export default CreatePage;
