import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Todo = {
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
  entities: [
    {
      id: "1",
      title: "Первая задача",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates autem aperiam commodi animi vitae sequi minima sed recusandae quidem ad! Dolor assumenda tempore vero molestias. Vel aspernatur vero exercitationem laudantium!",
      isCompleted: false,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      deadlineAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Вторая задача",
      description: "Описание второй задачи",
      isCompleted: true,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      deadlineAt: new Date().toISOString(),
    },
  ],
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
} = todoSlice.actions;
export default todoSlice.reducer;
