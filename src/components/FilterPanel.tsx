import React from "react";

const FilterPanel = () => {
  return (
    <div className="w-full bg-slate-800 rounded-xl p-3 flex justify-between">
      <input
        type="text"
        placeholder="Поиск"
        className="rounded-lg px-3 py-1 text-slate-100 bg-slate-900"
      />
      <div className="flex gap-3">
        <select name="" id="" className="rounded-lg px-3 py-1 text-slate-100 bg-slate-900 w-48">
          <option value="" disabled>
            Сортировать по
          </option>
          <option value="">test</option>
        </select>
        <select name="" id="" className="rounded-lg px-3 py-1 text-slate-100 bg-slate-900 w-48">
          <option value="" disabled>
            Фильтр
          </option>
          <option value="">sadfsadf sdafsad fs</option>
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;
