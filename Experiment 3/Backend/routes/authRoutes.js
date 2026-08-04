const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const users = require("../data/users.json");

let refreshTokens = [];

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn:
        process.env.ACCESS_TOKEN_EXPIRY ||
        "30s"
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn:
        process.env.REFRESH_TOKEN_EXPIRY ||
        "7d"
    }
  );
};

router.post("/login", (req, res) => {
  const {
    email,
    password
  } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message:
        "Email and password are required."
    });
  }

  const cleanEmail =
    email.trim().toLowerCase();

  const user = users.find(
    (item) =>
      item.email
        .toLowerCase() ===
        cleanEmail &&
      item.password ===
        password
  );

  if (!user) {
    return res.status(401).json({
      message:
        "Invalid email or password."
    });
  }

  const accessToken =
    generateAccessToken(user);

  const refreshToken =
    generateRefreshToken(user);

  refreshTokens.push(
    refreshToken
  );

  return res.status(200).json({
    message:
      "Login successful.",

    accessToken,

    refreshToken,

    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

router.post(
  "/refresh",
  (req, res) => {
    const {
      refreshToken
    } = req.body;

    if (!refreshToken) {
      return res
        .status(401)
        .json({
          message:
            "Refresh token is missing."
        });
    }

    if (
      !refreshTokens.includes(
        refreshToken
      )
    ) {
      return res
        .status(403)
        .json({
          message:
            "Invalid refresh token."
        });
    }

    try {
      const decoded =
        jwt.verify(
          refreshToken,
          process.env
            .JWT_REFRESH_SECRET
        );

      const user =
        users.find(
          (item) =>
            item.id ===
            decoded.id
        );

      if (!user) {
        return res
          .status(404)
          .json({
            message:
              "User not found."
          });
      }

      const accessToken =
        generateAccessToken(
          user
        );

      return res
        .status(200)
        .json({
          message:
            "New access token generated.",
          accessToken
        });

    } catch (error) {
      return res
        .status(403)
        .json({
          message:
            "Refresh token is invalid or expired."
        });
    }
  }
);

router.post(
  "/logout",
  (req, res) => {
    const {
      refreshToken
    } = req.body;

    refreshTokens =
      refreshTokens.filter(
        (token) =>
          token !==
          refreshToken
      );

    return res
      .status(200)
      .json({
        message:
          "Logout successful."
      });
  }
);

module.exports = router;