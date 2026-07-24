import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PostItem from "./PostItem";

import {
  fetchPosts,
} from "../features/posts/postsSlice";

import {
  selectAllPosts,
  selectLoading,
  selectError,
} from "../features/posts/postsSelectors";

function PostList() {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) {
    return <h2>Loading posts...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (
    <div>
      <h2>All Posts</h2>

      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
          />
        ))
      )}
    </div>
  );
}

export default PostList;