import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "../pages/users/UserList";
import Layout from "../components/layout/Layout";
import Login from "../pages/auth/Login";
import PrivateRoute from "./PrivateRoutes";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Private Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout>
                <div>Dashboard</div>
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Layout>
                <UserList />
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;