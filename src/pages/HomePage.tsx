import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import FilterPanel from "../components/FilterPanel";
import Pagination from "../components/Pagination";
import TodoList from "../components/TodoList";
import { useAppSelector } from "../hooks/redux-hooks";
import { setCurrentPage } from "../store/filterSlice";

const HomePage: React.FC = () => {
  const countPage = useAppSelector((state) => state.filter.countPage);
  const currentPage = useAppSelector((state) => state.filter.currentPage);

  const dispatch = useDispatch();

  const setCurrentPageHandler = (currentPage: number) => {
    dispatch(setCurrentPage(currentPage));
  };

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [dispatch]);

  return (
    <div className="mx-auto flex h-full justify-center py-5">
      <div className="md:w-[800px] w-full flex flex-col gap-4 items-center px-2">
        <Link
          to="/create"
          className="flex gap-1 bg-purple-600 rounded-lg py-2 px-3 w-max hover:scale-105 transition-all ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Добавить задачу
        </Link>
        <FilterPanel />
        <TodoList />
        {countPage > 1 && (
          <Pagination
            countPage={countPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPageHandler}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
