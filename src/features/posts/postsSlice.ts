import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommentDataType, PostDataType, PostsStateType } from "../../types/postsType"; // Ensure this path is correct
import { fetchPosts, fetchPostById, createNewPost, addPostReaction, increaseViewsCount, editComment } from "./postsAsyncThunks";

const initialState: PostsStateType = {
  entities: [],
  currentPost: null,
  status: "idle",
  error: null,
};

type RejectErrorType = {
  code: number;
  status: string;
  message: string;
}

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // updateUserReaction
  },
  extraReducers: (builder) => {
    //fetchPosts
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<PostDataType[]>) => {
        // remove duplicated posts
        const newPosts = action.payload.filter(
          newPost => !state.entities.some(post => post._id === newPost._id)
        );
        state.entities = [...state.entities, ...newPosts];
        // state.pageNumber = action.payload.pageNumber;
        // state.isLastPage = action.payload.isLastPage;
        state.status = "succeeded";
      }
      )
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      //fetchPost by id
      .addCase(fetchPostById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action: PayloadAction<PostDataType>) => {
        state.currentPost = { ...action.payload }
        state.status = "succeeded";
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error = (action.payload as RejectErrorType).message || 'failed to fetchPostById';
        } else {
          state.error = action.error.message || 'failed to fetchPostById';
        }
      })
    //createNewPost
    builder
      .addCase(createNewPost.fulfilled, (state, action: PayloadAction<PostDataType>) => {
        state.entities.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(createNewPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
    //user reaction : addLike, addDislike, etc...
    builder
      .addCase(addPostReaction.fulfilled, (state, action: PayloadAction<PostDataType>) => {
        state.status = "succeeded"
        const { _id, likes, dislikes } = action.payload;
        const existingPost = state.entities.find(post => post._id === _id);
        if (existingPost) {
          existingPost.likes = likes;
          existingPost.dislikes = dislikes;
        }
      })
      .addCase(addPostReaction.rejected, (state, action) => {
        state.status = "failed"
        if (action.payload) {
          state.error = (action.payload as RejectErrorType).message || '반응 추가에 실패했습니다';
        } else {
          state.error = action.error.message || '반응 추가에 실패했습니다';
        }
      });
    //views
    builder
      .addCase(increaseViewsCount.fulfilled, (state, action: PayloadAction<PostDataType>) => {
        const { _id, viewsCount } = action.payload;
        const existingPost = state.entities.find(post => post._id === _id);
        if (existingPost) {
          existingPost.viewsCount = viewsCount
        }
      });
    //comments
    // builder
    //   .addCase(editComment.fulfilled, (state, action: PayloadAction<CommentDataType>) => {
    //     const { _id, content, postId } = action.payload;
    //     const existingPost = state.entities.find(post => post._id === postId);
    //     alert(existingPost)
    //     const existingComment = existingPost?.comments.find(comment => comment._id === _id)
    //     console.log(existingComment)
    //     // if (existingPost) {
    //     //   existingPost.comments.find(comment => comment._id === _id)!.content = content
    //     // }
    //   })
  },
});

export default postsSlice.reducer;
