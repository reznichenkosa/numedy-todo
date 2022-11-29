import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import BinPage from "./pages/BinPage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <MainLayout>
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
