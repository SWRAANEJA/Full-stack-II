import Navbar
from "../components/Navbar";

import {
  useAuth
} from "../context/AuthContext";

const Dashboard = () => {
  const { user } =
    useAuth();

  const permissions = {
    admin: [
      "View posts",
      "Create posts",
      "Edit posts",
      "Delete posts",
      "Manage users"
    ],

    editor: [
      "View posts",
      "Edit posts"
    ],

    viewer: [
      "View posts"
    ]
  };

  return (
    <>
      <Navbar />

      <main className="container">

        <h1>
          Welcome,
          {" "}
          {user.name}
        </h1>

        <div className="card">

          <h2>
            User Information
          </h2>

          <p>
            Email:
            {" "}
            {user.email}
          </p>

          <p>
            Role:
            {" "}
            <strong>
              {user.role}
            </strong>
          </p>

        </div>

        <div className="card">

          <h2>
            Your Permissions
          </h2>

          <ul>

            {permissions[
              user.role
            ].map(
              (permission) => (
                <li
                  key={
                    permission
                  }
                >
                  ✅
                  {" "}
                  {permission}
                </li>
              )
            )}

          </ul>

        </div>

      </main>
    </>
  );
};

export default Dashboard;