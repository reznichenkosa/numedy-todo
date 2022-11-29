import React from "react";
import cn from "classnames";

interface PaginationProps {
  countPage: number;
  currentPage: number;
  setCurrentPage: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, countPage, setCurrentPage }) => {
  const pageNumberArray = new Array(countPage).fill(1).map((item, i) => i + 1);

  return (
    <div className="w-max bg-slate-800 rounded-xl p-3 flex justify-center gap-1">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-slate-900 h-10 w-16 flex justify-center items-center rounded-lg cursor-pointer hover:bg-purple-500 transition-all ease-in-out disabled:text-slate-600"
      >
        Пред.
      </button>
      {pageNumberArray.map((item) => (
        <button
          key={item}
          onClick={() => setCurrentPage(item)}
          className={cn(
            "bg-slate-900 h-10 w-10 flex justify-center items-center rounded-lg cursor-pointer hover:bg-purple-500 transition-all ease-in-out",
            { "bg-purple-500": item === currentPage }
          )}
        >
          {item}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === countPage}
        className="bg-slate-900 h-10 w-16 flex justify-center items-center rounded-lg cursor-pointer hover:bg-purple-500 transition-all ease-in-out disabled:text-slate-600"
      >
        След.
      </button>
    </div>
  );
};

export default Pagination;
