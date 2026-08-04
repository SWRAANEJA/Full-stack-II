import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  useAuth
} from "../context/AuthContext";

const Navbar = () => {
  const {
    user,
    logout
  } = useAuth();

  const navigate =
    useNavigate();

  const handleLogout =
    async () => {
      await logout();

      navigate("/login");
    };

  return (
    <nav className="navbar">

      <h2>
        JWT RBAC System
      </h2>

      <div className="nav-links">

        <Link to="/">
          Dashboard
        </Link>

        <Link to="/posts">
          Posts
        </Link>

        {user?.role ===
          "admin" && (
          <Link to="/users">
            Users
          </Link>
        )}

        <span>
          {user?.name}
          {" | "}
          {user?.role}
        </span>

        <button
          onClick={
            handleLogout
          }
        >
          Logout
        </button>

      </div>

    </nav>
  );
};

export default Navbar;