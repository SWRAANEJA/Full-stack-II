import {
  useEffect,
  useState
} from "react";

import Navbar
from "../components/Navbar";

import api
from "../services/api";

const Users = () => {
  const [
    users,
    setUsers
  ] = useState([]);

  const [
    error,
    setError
  ] = useState("");

  useEffect(() => {

    const loadUsers =
      async () => {
        try {
          const response =
            await api.get(
              "/users"
            );

          setUsers(
            response.data.users
          );
        } catch (error) {
          setError(
            error.response?.data
              ?.message ||
            "Unable to load users."
          );
        }
      };

    loadUsers();

  }, []);

  return (
    <>
      <Navbar />

      <main className="container">

        <h1>
          User Management
        </h1>

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        <div className="card">

          <table>

            <thead>
              <tr>
                <th>
                  ID
                </th>

                <th>
                  Name
                </th>

                <th>
                  Email
                </th>

                <th>
                  Role
                </th>
              </tr>
            </thead>

            <tbody>

              {users.map(
                (user) => (

                  <tr
                    key={
                      user.id
                    }
                  >

                    <td>
                      {user.id}
                    </td>

                    <td>
                      {user.name}
                    </td>

                    <td>
                      {user.email}
                    </td>

                    <td>
                      {user.role}
                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </main>
    </>
  );
};

export default Users;