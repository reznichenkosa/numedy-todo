import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Todo = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isDeleted: boolean;
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
    addTodo(state, action: PayloadAction<Todo>) {
      state.entities.push(action.payload);
    },
    toggleComplete(state, action: PayloadAction<Todo>) {
      const toggledTodo = state.entities.find((todo) => todo.id === action.payload.id);
      if (toggledTodo) {
        toggledTodo.isCompleted = !toggledTodo.isCompleted;
      }
    },
    removeTodo(state, action: PayloadAction<Todo>) {
      state.entities = state.entities.filter((todo) => todo.id !== action.payload.id);
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
  },
});

export const { addTodo, toggleComplete, removeTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
