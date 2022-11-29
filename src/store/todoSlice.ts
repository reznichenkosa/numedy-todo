import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { v4 as uuidv4 } from "uuid";

const arr = new Array(32).fill(1).map((item, i) => ({
  id: uuidv4(),
  title: i + 1 + " Задача",
  description:
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates autem aperiam commodi animi vitae sequi minima sed recusandae quidem ad! Dolor assumenda tempore vero molestias. Vel aspernatur vero exercitationem laudantium!",
  isCompleted: false,
  isDeleted: false,
  isOpen: true,
  createdAt: new Date(`2022-11-${29 - (i % 20)}`).toISOString(),
  deadlineAt: new Date(`2022-12-${1 + (i % 20)}`).toISOString(),
}));

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
  entities: [...arr],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
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
} = todoSlice.actions;
export default todoSlice.reducer;
