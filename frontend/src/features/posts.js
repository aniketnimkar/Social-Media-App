import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    {
      postId: "id-001",
      name: "Aniket",
      userName: "HalfPro",
      date: "Aug 21 2024",
      userContent: {
        text: "Hi there!",
        image: "https://placehold.co/600x400",
      },
      like: {
        liked: true,
        counter: 7,
      },
      comment: [],
    },
  ],
  likedPosts: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    createPost: (state, action) => {
      state.posts = [action.payload, ...state.posts];
    },
    likeCount: (state, action) => {
      // console.log(action.payload.postId);
      const foundPost = state.posts.find(
        (post) => post.postId === action.payload.postId
      );
      // console.log(JSON.stringify(foundpost));
      if (foundPost) {
        if (foundPost.like.liked) {
          foundPost.like.counter -= 1; // Unlike the post
        } else {
          foundPost.like.counter += 1;
          // Like the post
          state.likedPosts = [...state.likedPosts, action.payload];
        }
        foundPost.like.liked = !foundPost.like.liked; // Toggle the liked state
      }
    },
    likedPost: (state, action) => {
      const isLiked = action.payload.like.liked;
      const postId = action.payload.postId;

      if (isLiked) {
        // Add the post to likedPosts if it's liked
        if (!state.likedPosts.some((post) => post.postId === postId)) {
          state.likedPosts.push(action.payload);
        }
      } else {
        // Remove the post from likedPosts if it's unliked
        state.likedPosts = state.likedPosts.filter(
          (post) => post.postId !== postId
        );
      }
    },
  },
});

// Action generators
export const { createPost, likeCount, likedPost } = postSlice.actions;

export default postSlice.reducer;
