import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

// Normalize posts using createEntityAdapter
const postsAdapter = createEntityAdapter({
  selectId: (post) => post.id,
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

// Simulated API request
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async () => {
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            content: "Learning Redux Toolkit today!",
            platform: "Instagram",
            status: "Published",
            createdAt: new Date().toISOString(),
          },
          {
            id: "2",
            content: "Building a social media dashboard.",
            platform: "LinkedIn",
            status: "Draft",
            createdAt: new Date().toISOString(),
          },
          {
            id: "3",
            content: "React and Redux make state management easier.",
            platform: "Twitter",
            status: "Scheduled",
            createdAt: new Date().toISOString(),
          },
        ]);
      }, 1000);
    });

    return response;
  }
);

// Initial state
const initialState = postsAdapter.getInitialState({
  loading: false,
  error: null,
});

// Create Redux slice
const postsSlice = createSlice({
  name: "posts",

  initialState,

  reducers: {
    addPost: {
      reducer: (state, action) => {
        postsAdapter.addOne(state, action.payload);
      },

      prepare: (content, platform, status) => ({
        payload: {
          id: Date.now().toString(),
          content,
          platform,
          status,
          createdAt: new Date().toISOString(),
        },
      }),
    },

    updatePost: (state, action) => {
      postsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload.changes,
      });
    },

    deletePost: (state, action) => {
      postsAdapter.removeOne(state, action.payload);
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        postsAdapter.setAll(state, action.payload);
      })

      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  addPost,
  updatePost,
  deletePost,
} = postsSlice.actions;

export default postsSlice.reducer;