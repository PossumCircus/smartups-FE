import {
    fetchPosts, fetchInfiniteScrollPosts, fetchPostById,
    createNewPost,
    addPostReaction,
    increaseViewsCount,
    createComment, createReplyComment, editComment, deleteComment
} from "./postsAsyncThunks";
import {
    selectAllPosts,
    selectSinglePostById,
    selectPostsByCategory,
    selectCurrentPost,
    postsStatus,
    postsError,
} from "./postsSelectors";
export {
    // posts components
    // redux async thunk function
    fetchPosts,
    fetchInfiniteScrollPosts,
    fetchPostById,
    createNewPost,
    addPostReaction,
    increaseViewsCount,
    createComment,
    createReplyComment,
    editComment,
    deleteComment,
    // redux posts selector
    selectAllPosts,
    selectSinglePostById,
    selectPostsByCategory,
    selectCurrentPost,
    postsStatus,
    postsError,
}