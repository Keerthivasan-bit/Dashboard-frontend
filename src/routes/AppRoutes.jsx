import { Routes, Route } from "react-router-dom";
import DataTablePage from "../components/Dashboard";
import LoginPage from "../components/LoginPage";
import Attendance from "../components/Attendance";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<DataTablePage />} />
      <Route path="/attendance" element={<Attendance />} />
    </Routes>
  );
};

export default AppRoutes;
