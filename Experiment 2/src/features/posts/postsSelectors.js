import { createSelector } from "@reduxjs/toolkit";
import { createEntityAdapter } from "@reduxjs/toolkit";

const postsAdapter = createEntityAdapter();

const selectPostsState = (state) => state.posts;

export const selectAllPosts = createSelector(
  [selectPostsState],
  (postsState) => {
    return postsState.ids.map((id) => postsState.entities[id]);
  }
);

export const selectLoading = (state) => state.posts.loading;

export const selectError = (state) => state.posts.error;

export const selectPublishedPosts = createSelector(
  [selectAllPosts],
  (posts) => posts.filter((post) => post.status === "Published")
);

export const selectDraftPosts = createSelector(
  [selectAllPosts],
  (posts) => posts.filter((post) => post.status === "Draft")
);

export const selectScheduledPosts = createSelector(
  [selectAllPosts],
  (posts) => posts.filter((post) => post.status === "Scheduled")
);

export const selectPostAnalytics = createSelector(
  [selectAllPosts],
  (posts) => {
    return {
      total: posts.length,

      published: posts.filter(
        (post) => post.status === "Published"
      ).length,

      drafts: posts.filter(
        (post) => post.status === "Draft"
      ).length,

      scheduled: posts.filter(
        (post) => post.status === "Scheduled"
      ).length,
    };
  }
);