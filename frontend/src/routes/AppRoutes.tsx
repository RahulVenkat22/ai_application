import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "../pages/users/UserList"
import Layout from "../components/layout/Layout";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<div>Dashboard</div>} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRoutes;