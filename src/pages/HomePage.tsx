import React from "react";
import FilterPanel from "../components/FilterPanel";
import TodoList from "../components/TodoList";

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto flex h-full justify-center py-5 ">
      <div className="max-w-[800px] flex flex-col gap-4">
        <FilterPanel />
        <TodoList />
      </div>
    </div>
  );
};

export default HomePage;
