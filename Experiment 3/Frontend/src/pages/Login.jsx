import {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  useAuth
} from "../context/AuthContext";

const Login = () => {
  const [
    email,
    setEmail
  ] = useState(
    "admin1@example.com"
  );

  const [
    password,
    setPassword
  ] = useState(
    "admin123"
  );

  const [
    error,
    setError
  ] = useState("");

  const [
    loading,
    setLoading
  ] = useState(false);

  const {
    login
  } = useAuth();

  const navigate =
    useNavigate();

  const handleSubmit =
    async (event) => {
      event.preventDefault();

      setError("");

      setLoading(true);

      try {
        await login(
          email,
          password
        );

        navigate(
          "/"
        );

      } catch (error) {
        setError(
          error.response
            ?.data
            ?.message ||
          "Login failed. Check the email, password, and backend server."
        );
      } finally {
        setLoading(
          false
        );
      }
    };

  const fillAdmin = () => {
    setEmail(
      "admin1@example.com"
    );

    setPassword(
      "admin123"
    );
  };

  const fillEditor = () => {
    setEmail(
      "editor1@example.com"
    );

    setPassword(
      "editor123"
    );
  };

  const fillViewer = () => {
    setEmail(
      "viewer1@example.com"
    );

    setPassword(
      "viewer123"
    );
  };

  return (
    <div className="login-page">

      <form
        className="login-box"
        onSubmit={
          handleSubmit
        }
      >

        <h1>
          JWT Login
        </h1>

        <p>
          Role-Based Authentication
        </p>

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        <label>
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={
            (event) =>
              setEmail(
                event.target.value
              )
          }
          placeholder="Enter email"
          required
        />

        <label>
          Password
        </label>

        <input
          type="password"
          value={password}
          onChange={
            (event) =>
              setPassword(
                event.target.value
              )
          }
          placeholder="Enter password"
          required
        />

        <button
          type="submit"
          disabled={
            loading
          }
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        <div className="demo">

          <h3>
            Dummy Test Accounts
          </h3>

          <button
            type="button"
            onClick={
              fillAdmin
            }
          >
            Use Admin Account
          </button>

          <p>
            Email:
            {" "}
            admin1@example.com
          </p>

          <p>
            Password:
            {" "}
            admin123
          </p>

          <button
            type="button"
            onClick={
              fillEditor
            }
          >
            Use Editor Account
          </button>

          <p>
            Email:
            {" "}
            editor1@example.com
          </p>

          <p>
            Password:
            {" "}
            editor123
          </p>

          <button
            type="button"
            onClick={
              fillViewer
            }
          >
            Use Viewer Account
          </button>

          <p>
            Email:
            {" "}
            viewer1@example.com
          </p>

          <p>
            Password:
            {" "}
            viewer123
          </p>

        </div>

      </form>

    </div>
  );
};

export default Login;