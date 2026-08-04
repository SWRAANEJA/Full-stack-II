require("dotenv").config();

const express =
  require("express");

const cors =
  require("cors");

const authRoutes =
  require("./routes/authRoutes");

const postRoutes =
  require("./routes/postRoutes");

const userRoutes =
  require("./routes/userRoutes");

const app =
  express();

app.use(
  cors({
    origin:
      "http://localhost:5173",
    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE"
    ]
  })
);

app.use(
  express.json()
);

app.get(
  "/",
  (req, res) => {
    res.json({
      message:
        "JWT RBAC Backend is running."
    });
  }
);

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/posts",
  postRoutes
);

app.use(
  "/api/users",
  userRoutes
);

const PORT =
  process.env.PORT ||
  5000;

app.listen(
  PORT,
  () => {
    console.log(
      `Backend running at http://localhost:${PORT}`
    );
  }
);