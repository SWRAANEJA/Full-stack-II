const express = require("express");

const authenticateToken =
  require("../middleware/authenticateToken");

const authorizeRole =
  require("../middleware/authorizeRole");

const users =
  require("../data/users.json");

const router = express.Router();

router.get(
  "/",
  authenticateToken,
  authorizeRole("admin"),
  (req, res) => {
    const safeUsers = users.map(
      ({ password, ...user }) => user
    );

    return res.status(200).json({
      message:
        "Users fetched successfully.",
      users: safeUsers
    });
  }
);

module.exports = router;