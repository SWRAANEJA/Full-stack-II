import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import ProtectedRoute
from "./components/ProtectedRoute";

import RoleRoute
from "./components/RoleRoute";

import Login
from "./pages/Login";

import Dashboard
from "./pages/Dashboard";

import Posts
from "./pages/Posts";

import Users
from "./pages/Users";

import Unauthorized
from "./pages/Unauthorized";

import NotFound
from "./pages/NotFound";

function App() {
  return (
    <Routes>

      <Route
        path="/login"
        element={
          <Login />
        }
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>

            <Dashboard />

          </ProtectedRoute>
        }
      />

      <Route
        path="/posts"
        element={
          <ProtectedRoute>

            <Posts />

          </ProtectedRoute>
        }
      />

      <Route
        path="/users"
        element={
          <RoleRoute
            allowedRoles={[
              "admin"
            ]}
          >

            <Users />

          </RoleRoute>
        }
      />

      <Route
        path="/unauthorized"
        element={
          <Unauthorized />
        }
      />

      <Route
        path="*"
        element={
          <NotFound />
        }
      />

    </Routes>
  );
}

export default App;