import AddPost from "./components/AddPost";
import PostList from "./components/PostList";
import Analytics from "./components/Analytics";

import "./App.css";

function App() {
  return (
    <div className="app">
      <header>
        <h1>Redux Social Media Dashboard</h1>

        <p>
          Redux Toolkit State Management Experiment
        </p>
      </header>

      <main>
        <Analytics />

        <AddPost />

        <PostList />
      </main>
    </div>
  );
}

export default App;