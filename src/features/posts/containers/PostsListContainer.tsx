import PostsList from "../components/PostsList"
import { usePostsRenderByTopic, usePostsPayloadValidation } from "../hooks"
import { postsError, postsStatus, selectPostsByCategory } from "../postsSelectors"
import { increaseViewsCount } from "../postsAsyncThunks"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "../../../app/store"

interface PostsListContainerProps {
    category: string
    topic: string;
    itemCountPerPage: number;
    currentPage: number;
    isInfinite: boolean;
}

export default function PostsListContainer({ category, topic, itemCountPerPage, currentPage } : PostsListContainerProps){
    const status = useSelector((state: RootState) => postsStatus(state))
    const error = useSelector((state: RootState) => postsError(state))
    const posts = useSelector((state: RootState) => selectPostsByCategory(state, category))
    const isPostsValid = usePostsPayloadValidation(posts)
    const postsByTopic = usePostsRenderByTopic(posts, topic)
    const dispatch = useDispatch<AppDispatch>()
    const clickPostHandler = (postId: string): void => {
        dispatch(increaseViewsCount({ postId }));
    };
    return (
        <PostsList
            topic={topic}
            itemCountPerPage={itemCountPerPage}
            currentPage={currentPage}
            posts={posts}
            status={status}
            error={error}
            isPostsValid={isPostsValid}
            postsByTopic={postsByTopic}
            clickPostHandler={clickPostHandler}
        />
    )
}

