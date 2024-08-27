import { RootState } from '../../app/store';
import { PostDataType, PostsStateType } from '../../types/postsType'; // Ensure this path is correct
import { payloadFilter } from "../../utils";

export const selectAllPosts = (state: RootState): PostDataType[] => state.posts.entities;

export const selectSinglePostById = (state: RootState, postId: string): PostDataType | undefined =>
  state.posts.entities.find((post: PostDataType) => post._id === postId);

export const postsStatus = (state: RootState): PostsStateType["status"] => state.posts.status;

export const postsError = (state: RootState): PostsStateType["error"] => state.posts.error;

export const selectPostsByCategory = (state: RootState, category: string): PostDataType[] => {
  const filteredPosts = payloadFilter(state.posts.entities, category)
  return filteredPosts
}

export const selectCurrentPost = (state: RootState): PostDataType | null => state.posts.currentPost;