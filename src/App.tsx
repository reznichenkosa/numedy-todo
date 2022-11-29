import { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks/redux-hooks";
import useInterval from "./hooks/useInterval";
import MainLayout from "./layouts/MainLayout";
import BinPage from "./pages/BinPage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import { setTodos, Todo } from "./store/todoSlice";

function App() {
  const [isSync, setIsSync] = useState<boolean>(false);
  const [delaySync, setDelayLocal] = useState<number | null>(4000);
  const todos = useAppSelector((state) => state.todo.entities);
  const dispatch = useAppDispatch();

  const syncLocalStorage = useCallback(() => {
    setIsSync(true);
    setTimeout(() => {
      try {
        if (Math.random() < 0.1) {
          throw new Error("Произошла ошибка синхронизации!");
        }
        localStorage.setItem("todos", JSON.stringify(todos));
        setIsSync(false);
      } catch (e) {
        if (e instanceof Error) {
          if (!window.confirm(`${e.message} Попробовать снова?`)) {
            setDelayLocal(null);
          }
        }
        setIsSync(false);
      }
    }, 2000);
  }, [todos]);

  useInterval(syncLocalStorage, delaySync);

  useEffect(() => {
    let localData = localStorage.getItem("todos");
    if (localData) {
      const localTodos = JSON.parse(localData) as Todo[];
      dispatch(setTodos(localTodos));
    }
  }, [dispatch]);

  return (
    <MainLayout isSync={isSync} delaySync={delaySync}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/bin" element={<BinPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
