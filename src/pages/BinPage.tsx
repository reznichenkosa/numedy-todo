import React from "react";
import DeletedTodoList from "../components/DeletedTodoList";
import { useAppDispatch } from "../hooks/redux-hooks";
import { removeAllTodosFromBin } from "../store/todoSlice";

const BinPage = () => {
  const dispatch = useAppDispatch();

  const clearBinHandler = () => {
    if (
      window.confirm("Вы действительно хотите очистить корзину? Восстановление будет невозможно!")
    ) {
      dispatch(removeAllTodosFromBin());
    }
  };

  return (
    <div className="container mx-auto flex h-full justify-center py-5 ">
      <div className="w-[800px] flex flex-col gap-4 items-center">
        <button
          onClick={clearBinHandler}
          className="flex gap-1 bg-red-600 rounded-lg py-2 px-3 w-max hover:scale-105 transition-all ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>
          Очистить корзину
        </button>
        <DeletedTodoList />
      </div>
    </div>
  );
};

export default BinPage;
