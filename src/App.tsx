import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegPage from "./pages/RegPage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import AccountPage from "./pages/AccountPage";
import Forum from "./pages/Forum";
import TaskPage from "./pages/TaskPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/forum" element={<Forum />} />
      <Route path="/createTask" element={<TaskPage />} />
    </Routes>
  );
}

export default App;
