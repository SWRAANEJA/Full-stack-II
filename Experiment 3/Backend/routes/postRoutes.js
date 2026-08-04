const express = require("express");

const authenticateToken =
  require("../middleware/authenticateToken");

const authorizeRole =
  require("../middleware/authorizeRole");

const router = express.Router();

let posts = [
  {
    id: 1,
    title: "JWT Authentication",
    content:
      "JWT provides stateless authentication.",
    author: "Admin User"
  },
  {
    id: 2,
    title: "Role Based Access Control",
    content:
      "RBAC controls access using user roles.",
    author: "Editor User"
  }
];

router.get(
  "/",
  authenticateToken,
  (req, res) => {
    return res.status(200).json({
      message: "Posts fetched successfully.",
      posts
    });
  }
);

router.post(
  "/",
  authenticateToken,
  authorizeRole("admin"),
  (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message:
          "Title and content are required."
      });
    }

    const newPost = {
      id: posts.length + 1,
      title,
      content,
      author: req.user.name
    };

    posts.push(newPost);

    return res.status(201).json({
      message:
        "Post created successfully by Admin.",
      post: newPost
    });
  }
);

router.put(
  "/:id",
  authenticateToken,
  authorizeRole("admin", "editor"),
  (req, res) => {
    const postId = Number(req.params.id);

    const post = posts.find(
      (item) => item.id === postId
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found."
      });
    }

    const { title, content } = req.body;

    post.title =
      title || post.title;

    post.content =
      content || post.content;

    return res.status(200).json({
      message:
        "Post updated successfully.",
      post
    });
  }
);

router.delete(
  "/:id",
  authenticateToken,
  authorizeRole("admin"),
  (req, res) => {
    const postId = Number(req.params.id);

    const postIndex =
      posts.findIndex(
        (item) => item.id === postId
      );

    if (postIndex === -1) {
      return res.status(404).json({
        message: "Post not found."
      });
    }

    posts.splice(postIndex, 1);

    return res.status(200).json({
      message:
        "Post deleted successfully."
    });
  }
);

module.exports = router;