import React, { useState } from "react";
import { useAppDispatch } from "../hooks/redux-hooks";
import { addTodo, Todo } from "../store/todoSlice";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

interface TodoCreateFormProps {}

export type FormData = Omit<Todo, "id" | "createdAt" | "isCompleted" | "isDeleted" | "isOpen">;

const intialFormData = { title: "", description: "", deadlineAt: "" };

const TodoCreateForm: React.FC<TodoCreateFormProps> = () => {
  const [formData, setFormData] = useState<FormData>(intialFormData);
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo: Todo = {
      id: uuidv4(),
      title: formData.title,
      description: formData.description,
      deadlineAt: formData.deadlineAt,
      createdAt: new Date().toISOString(),
      isCompleted: false,
      isOpen: true,
      isDeleted: false,
    };

    dispatch(addTodo(newTodo));
    navigation("/");
  };

  return (
    <form
      onSubmit={submitFormHandler}
      className="w-full bg-slate-800 rounded-xl p-3 flex flex-col gap-3 justify-between"
    >
      <input
        onChange={inputChangeHandler}
        value={formData.title}
        type="text"
        className="rounded-lg px-3 py-2 bg-slate-900"
        placeholder="Заголовок"
        name="title"
        required
      />
      <textarea
        onChange={inputChangeHandler}
        value={formData.description}
        className="rounded-lg px-3 py-2 bg-slate-900 resize-none h-28"
        placeholder="Описание"
        name="description"
        required
      ></textarea>
      <input
        value={formData.deadlineAt}
        onChange={inputChangeHandler}
        type="date"
        className="rounded-lg px-3 py-2 bg-slate-900"
        onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => {
          if (!e.target.value) {
            e.target.type = "text";
          }
        }}
        name="deadlineAt"
        placeholder="Дата завершения"
        required
      />
      <button className="flex self-end gap-1 bg-purple-600 rounded-lg py-2 px-3 w-max hover:scale-105 transition-all ease-in-out">
        Создать
      </button>
    </form>
  );
};

export default TodoCreateForm;
