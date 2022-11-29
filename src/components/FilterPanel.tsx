import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import {
  FilterParam,
  setCurrentPage,
  setFilterParam,
  setSearchQuery,
  setSortParam,
  SortParam,
} from "../store/filterSlice";

const FilterPanel: React.FC = () => {
  const { filter, searchQuery, sort } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();

  const changeFilterHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilterParam(e.target.value as FilterParam));
    dispatch(setCurrentPage(1));
  };

  const changeSortHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortParam(e.target.value as SortParam));
    dispatch(setCurrentPage(1));
  };

  const changeSearchQueryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
    dispatch(setCurrentPage(1));
  };

  return (
    <div className=" justify-center w-full bg-slate-800 rounded-xl p-3 flex flex-wrap gap-3 md:justify-between">
      <input
        onChange={changeSearchQueryHandler}
        value={searchQuery}
        type="text"
        placeholder="Поиск"
        className="rounded-lg px-3 py-1 text-slate-100 bg-slate-900"
      />
      <div className="flex gap-3 flex-wrap justify-center">
        <select
          onChange={changeSortHandler}
          value={sort}
          className="rounded-lg px-3 py-1 text-slate-100 bg-slate-900 w-48"
        >
          <option value="" disabled>
            Сортировка
          </option>
          <option value={SortParam.SortByCreatedAtASC}>По дате создания ASC</option>
          <option value={SortParam.SortByCreatedAtDesc}>По дате создания DESC</option>
          <option value={SortParam.SortByDeadlineAtASC}>По дате завершения ASC</option>
          <option value={SortParam.SortByDeadlineAtDesc}>По дате завершения DESC</option>
          <option value={SortParam.SortByIsCompletedASC}>Сначала завершенные</option>
          <option value={SortParam.SortByIsCompletedDesc}>Сналача незавершенные</option>
          <option value={SortParam.SortByTitleASC}>По заголовку ASC</option>
          <option value={SortParam.SortByTitleDesc}>По заголовку DESC</option>
        </select>
        <select
          onChange={changeFilterHandler}
          value={filter}
          className="rounded-lg px-3 py-1 text-slate-100 bg-slate-900 w-48"
        >
          <option value="" disabled>
            Фильтр
          </option>
          <option value={FilterParam.ShowAll}>Все</option>
          <option value={FilterParam.ShowActive}>Активные</option>
          <option value={FilterParam.ShowCompleted}>Завершенные</option>
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;
