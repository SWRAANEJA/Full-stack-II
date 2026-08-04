import {
  useEffect,
  useState
} from "react";

import Navbar
from "../components/Navbar";

import {
  useAuth
} from "../context/AuthContext";

import api
from "../services/api";

const Posts = () => {
  const { user } =
    useAuth();

  const [
    posts,
    setPosts
  ] = useState([]);

  const [
    title,
    setTitle
  ] = useState("");

  const [
    content,
    setContent
  ] = useState("");

  const [
    editingId,
    setEditingId
  ] = useState(null);

  const [
    message,
    setMessage
  ] = useState("");

  const loadPosts =
    async () => {
      try {
        const response =
          await api.get(
            "/posts"
          );

        setPosts(
          response.data.posts
        );
      } catch (error) {
        setMessage(
          error.response?.data
            ?.message ||
          "Unable to load posts."
        );
      }
    };

  useEffect(() => {
    loadPosts();
  }, []);

  const createPost =
    async (event) => {
      event.preventDefault();

      try {
        await api.post(
          "/posts",
          {
            title,
            content
          }
        );

        setTitle("");
        setContent("");

        setMessage(
          "Post created successfully."
        );

        loadPosts();
      } catch (error) {
        setMessage(
          error.response?.data
            ?.message ||
          "Unable to create post."
        );
      }
    };

  const startEdit =
    (post) => {
      setEditingId(
        post.id
      );

      setTitle(
        post.title
      );

      setContent(
        post.content
      );
    };

  const updatePost =
    async (event) => {
      event.preventDefault();

      try {
        await api.put(
          `/posts/${editingId}`,
          {
            title,
            content
          }
        );

        setEditingId(
          null
        );

        setTitle("");
        setContent("");

        setMessage(
          "Post updated successfully."
        );

        loadPosts();
      } catch (error) {
        setMessage(
          error.response?.data
            ?.message ||
          "Unable to update post."
        );
      }
    };

  const deletePost =
    async (id) => {
      const confirmed =
        window.confirm(
          "Delete this post?"
        );

      if (!confirmed) {
        return;
      }

      try {
        await api.delete(
          `/posts/${id}`
        );

        setMessage(
          "Post deleted successfully."
        );

        loadPosts();
      } catch (error) {
        setMessage(
          error.response?.data
            ?.message ||
          "Unable to delete post."
        );
      }
    };

  const canCreate =
    user.role === "admin";

  const canEdit =
    user.role === "admin" ||
    user.role === "editor";

  const canDelete =
    user.role === "admin";

  return (
    <>
      <Navbar />

      <main className="container">

        <h1>
          Posts
        </h1>

        {message && (
          <p className="message">
            {message}
          </p>
        )}

        {canCreate && (
          <form
            className="card"
            onSubmit={
              createPost
            }
          >

            <h2>
              Create Post
            </h2>

            <input
              placeholder="Post title"
              value={title}
              onChange={
                (event) =>
                  setTitle(
                    event.target.value
                  )
              }
            />

            <textarea
              placeholder="Post content"
              value={content}
              onChange={
                (event) =>
                  setContent(
                    event.target.value
                  )
              }
            />

            <button>
              Create Post
            </button>

          </form>
        )}

        {editingId &&
          canEdit && (

          <form
            className="card"
            onSubmit={
              updatePost
            }
          >

            <h2>
              Edit Post
            </h2>

            <input
              value={title}
              onChange={
                (event) =>
                  setTitle(
                    event.target.value
                  )
              }
            />

            <textarea
              value={content}
              onChange={
                (event) =>
                  setContent(
                    event.target.value
                  )
              }
            />

            <button>
              Update Post
            </button>

          </form>
        )}

        <div className="posts">

          {posts.map(
            (post) => (

              <div
                className="card"
                key={
                  post.id
                }
              >

                <h2>
                  {post.title}
                </h2>

                <p>
                  {post.content}
                </p>

                <small>
                  Author:
                  {" "}
                  {post.author}
                </small>

                <div>

                  {canEdit && (
                    <button
                      onClick={
                        () =>
                          startEdit(
                            post
                          )
                      }
                    >
                      Edit
                    </button>
                  )}

                  {canDelete && (
                    <button
                      className="delete"
                      onClick={
                        () =>
                          deletePost(
                            post.id
                          )
                      }
                    >
                      Delete
                    </button>
                  )}

                </div>

              </div>
            )
          )}

        </div>

      </main>
    </>
  );
};

export default Posts;