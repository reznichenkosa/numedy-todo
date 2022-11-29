import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Todo = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isDeleted: boolean;
  isOpen: boolean;
  createdAt: string;
  deadlineAt: string;
};

type TodoState = {
  entities: Todo[];
};

const initialState: TodoState = {
  entities: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<Todo[]>) {
      state.entities = action.payload;
    },
    addTodo(state, action: PayloadAction<Todo>) {
      state.entities.push(action.payload);
    },
    toggleComplete(state, action: PayloadAction<Todo>) {
      const toggledTodo = state.entities.find((todo) => todo.id === action.payload.id);
      if (toggledTodo) {
        toggledTodo.isCompleted = !toggledTodo.isCompleted;
      }
    },
    removeTodoFromBin(state, action: PayloadAction<Todo>) {
      state.entities = state.entities.filter((todo) => todo.id !== action.payload.id);
    },
    removeAllTodosFromBin(state) {
      state.entities = state.entities.filter((todo) => !todo.isDeleted);
    },
    updateTodo(state, action: PayloadAction<Todo>) {
      state.entities = state.entities.map((todo) => {
        if (todo.id === action.payload.id) {
          return action.payload;
        }
        return todo;
      });
    },
    sendToBin(state, action: PayloadAction<Todo>) {
      const deletedTodo = state.entities.find((todo) => todo.id === action.payload.id);
      if (deletedTodo) {
        deletedTodo.isDeleted = true;
      }
    },
    restoreFromBin(state, action: PayloadAction<Todo>) {
      const deletedTodo = state.entities.find((todo) => todo.id === action.payload.id);
      if (deletedTodo) {
        deletedTodo.isDeleted = false;
      }
    },
    toggleOpen(state, action: PayloadAction<Todo>) {
      const toggledTodo = state.entities.find((todo) => todo.id === action.payload.id);
      if (toggledTodo) {
        toggledTodo.isOpen = !toggledTodo.isOpen;
      }
    },
  },
});

export const {
  addTodo,
  toggleComplete,
  removeTodoFromBin,
  updateTodo,
  sendToBin,
  restoreFromBin,
  removeAllTodosFromBin,
  toggleOpen,
  setTodos,
} = todoSlice.actions;
export default todoSlice.reducer;
