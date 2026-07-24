import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../features/posts/postsSlice";

function AddPost() {
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [status, setStatus] = useState("Draft");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!content.trim()) {
      alert("Please enter post content");
      return;
    }

    dispatch(
      addPost(
        content,
        platform,
        status
      )
    );

    setContent("");
    setPlatform("Instagram");
    setStatus("Draft");
  };

  return (
    <div className="card">
      <h2>Create New Post</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your post..."
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />

        <select
          value={platform}
          onChange={(event) => setPlatform(event.target.value)}
        >
          <option value="Instagram">Instagram</option>
          <option value="Facebook">Facebook</option>
          <option value="Twitter">Twitter</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="YouTube">YouTube</option>
        </select>

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
          <option value="Scheduled">Scheduled</option>
        </select>

        <button type="submit">
          Add Post
        </button>
      </form>
    </div>
  );
}

export default AddPost;