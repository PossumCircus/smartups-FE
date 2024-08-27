import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig } from "axios";
import { PostDataType, PaginatedPostsResponseDataType, CommentDataType } from "../../types/postsType";

interface FetchPostByIdArgsDataType {
  postId: string;
  config?: AxiosRequestConfig;
}

interface PostReactionArgsDataType {
  postId: string;
  user_id: string;
  reaction: string;
  config?: AxiosRequestConfig;
}

interface CreatePostArgsDataType {
  author: string | null;  //user_id
  topic: string;
  title: string;
  hashtags: string[];
  content: string;
  config?: AxiosRequestConfig;
}

interface CreateCommentArgsDataType {
  postId: string;
  author: string;
  content: string;
  parentCommentId?: string
  config?: AxiosRequestConfig
}

interface EditCommentArgsDataType {
  postId: string;
  commentId: string;
  content: string;
  config?: AxiosRequestConfig
}

export const fetchPosts = createAsyncThunk<PostDataType[], AxiosRequestConfig>(
  "posts/fetchPosts",
   async (config) => {
  const { data } = await axios.get(`${process.env.REACT_APP_POST_API_URL}`, config);
  if (!data) {
    throw new Error("Failed  to 'fetchPosts' no response.");
  }
  return data;
});

export const fetchInfiniteScrollPosts = createAsyncThunk<PaginatedPostsResponseDataType, AxiosRequestConfig>(
  "posts/fetchInfiniteScrollPosts",
  async (config) => {
    const { data } = await axios.get(`${process.env.REACT_APP_POST_API_URL}/infiniteScroll`, config);
    if (!data) {
      throw new Error("Failed  to 'fetchInfiniteScrollPosts' no response.");
    }
    return data;
  }
);

export const fetchPostById = createAsyncThunk<PostDataType, FetchPostByIdArgsDataType>(
  "posts/fetchPostById",
  async ({ postId, config }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_POST_API_URL}/${postId}`, config);
      if (!data) {
        throw new Error("Network response was not ok, couldn't find post by id");
      }
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "error occurred in fetchPostById");
      }
      return rejectWithValue(error);
    }
  }
);

export const createNewPost = createAsyncThunk<PostDataType, CreatePostArgsDataType>(
  "posts/addNewPost",
  async ({ author, topic, title, hashtags, content, config }) => {
    const postData = { author, topic, title, hashtags, content };
    const { data } = await axios.post(`${process.env.REACT_APP_POST_API_URL}`, postData, config);
    if (!data) {
      throw new Error("Failed to 'addNewPost'");
    }
    return data;
  }
);

export const addPostReaction = createAsyncThunk<PostDataType, PostReactionArgsDataType>(
  "posts/addPostReaction",
  async ({ postId, reaction, config }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_POST_API_URL}/${postId}/${reaction}`, config);
      if (!data) {
        throw new Error("Failed to 'addLike', no response.");
      }
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "error occurred in addPostReaction");
      }
      return rejectWithValue(error);
    }
  }
);

export const increaseViewsCount = createAsyncThunk<PostDataType, FetchPostByIdArgsDataType>(
  "posts/increaseViewsCount",
  async ({ postId }) => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_POST_API_URL}/${postId}/increaseViewsCount`);
      if (!data) {
        throw new Error("Post not found");
      }
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const createComment = createAsyncThunk<CommentDataType, CreateCommentArgsDataType>(
  "posts/createComment",
  async ({ postId, author, content }) => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_COMMENT_API_URL}/${postId}`, { author, content });
      if (!data) {
        throw new Error("Post not found");
      }
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const createReplyComment = createAsyncThunk<CommentDataType, CreateCommentArgsDataType>(
  "posts/createReplyComment",
  async ({ postId, parentCommentId, author, content }) => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_COMMENT_API_URL}/${postId}/${parentCommentId}`, { author, content, parentCommentId });
      if (!data) {
        throw new Error("Parent Comment not found");
      }
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const editComment = createAsyncThunk<CommentDataType, EditCommentArgsDataType>(
  "posts/editComment",
  async ({ postId, commentId, content }) => {
    try {
      const { data } = await axios.patch(`${process.env.REACT_APP_COMMENT_API_URL}/${postId}/${commentId}`, { content });
      if (!data) {
        throw new Error("Comment not found");
      }
      return data;
    } catch (error) {
      console.error(error);
    }
  }
)

export const deleteComment = createAsyncThunk<any, any>(
  "posts/deleteComment",
  async ({ postId, commentId }) => {
    try {
      const { data } = await axios.delete(`${process.env.REACT_APP_COMMENT_API_URL}/${postId}/${commentId}`);
      console.log(data)
      if (!data) {
        throw new Error("Comment not found");
      }
      return data;
    } catch (error) {
      console.error(error);
    }
  }
)