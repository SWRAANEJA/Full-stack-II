import {
  Link
} from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="center-page">

      <h1>
        403 - Access Denied
      </h1>

      <p>
        You do not have
        permission to access
        this page.
      </p>

      <Link to="/">
        Go to Dashboard
      </Link>

    </div>
  );
};

export default Unauthorized;