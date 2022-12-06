import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//ALL TYPE DEFINITION
type PostType = {
  posts: [];
};

// TYPE END
const initialState: PostType = {
  posts: [],
};

const postsSlice = createSlice({
  // A name, used in action types:
  name: "posts",
  // The initial state:
  initialState,
  // An object of "case reducers".
  // Key names will be used to generate actions:
  reducers: {
    getAllPosts: (state, action) => {
      state.posts = action.payload.posts;
      //   state.singleTodo[action.payload.name] = action.payload.value;
    },
  },
});

export const { getAllPosts } = postsSlice.actions;
export default postsSlice.reducer;
