import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  deletePost,
  updatePost,
} from "../features/posts/postsSlice";

const PostItem = React.memo(function PostItem({ post }) {
  const dispatch = useDispatch();

  const handleDelete = useCallback(() => {
    dispatch(deletePost(post.id));
  }, [dispatch, post.id]);

  const handleStatusChange = useCallback(
    (event) => {
      dispatch(
        updatePost({
          id: post.id,
          changes: {
            status: event.target.value,
          },
        })
      );
    },
    [dispatch, post.id]
  );

  return (
    <div className="post-card">
      <h3>{post.platform}</h3>

      <p>{post.content}</p>

      <p>
        <strong>Status:</strong> {post.status}
      </p>

      <select
        value={post.status}
        onChange={handleStatusChange}
      >
        <option value="Draft">Draft</option>
        <option value="Published">Published</option>
        <option value="Scheduled">Scheduled</option>
      </select>

      <button
        className="delete-button"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
});

export default PostItem;