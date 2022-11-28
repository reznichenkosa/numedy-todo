import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum SortParam {
  SortByCreatedAtASC = "SORT_BY_CREATED_AT_ASC",
  SortByCreatedAtDesc = "SORT_BY_CREATED_AT_DESC",
  SortByDeadlineAtASC = "SORT_BY_DEADLINE_AT_ASC",
  SortByDeadlineAtDesc = "SORT_BY_DEADLINE_AT_DESC",
  SortByTitleASC = "SORT_BY_TITLE_ASC",
  SortByTitleDesc = "SORT_BY_TITLE_DESC",
  SortByIsCompletedASC = "SORT_BY_IS_COMPLETED_ASC",
  SortByIsCompletedDesc = "SORT_BY_IS_COMPLETED_DESC",
}

export enum FilterParam {
  ShowAll = "SHOW_ALL",
  ShowCompleted = "SHOW_COMPLETED",
  ShowActive = "SHOW_ACTIVE",
}

type FilterState = {
  filter: FilterParam;
  sort: SortParam;
  searchQuery: string;
};

const initialState: FilterState = {
  filter: FilterParam.ShowAll,
  sort: SortParam.SortByCreatedAtDesc,
  searchQuery: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSortParam(state, action: PayloadAction<SortParam>) {
      state.sort = action.payload;
    },
    setFilterParam(state, action: PayloadAction<FilterParam>) {
      state.filter = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

export const { setSortParam, setFilterParam, setSearchQuery } = filterSlice.actions;
export default filterSlice.reducer;
