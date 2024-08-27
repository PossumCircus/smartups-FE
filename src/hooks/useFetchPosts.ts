import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchPosts } from '../features/posts/postsAsyncThunks';
import { AppDispatch, RootState } from '../app/store';
import { postsStatus } from '../features/posts/postsSelectors';
/**
 * Custom hook to fetch posts from a specified API endpoint.
 */
export default function useFetchPosts(): void {
    const dispatch = useDispatch<AppDispatch>();
    const status = useSelector(postsStatus)
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (status === 'idle') await dispatch(fetchPosts({}))
            } catch (error) {
                console.error(error)
            }
        }

        fetchData();

    }, [dispatch, status]);

};