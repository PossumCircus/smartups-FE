import { payloadValidation } from '../../../utils'
import { PostDataType } from '../../../types/postsType'
import { useEffect } from 'react'
/**
 * Custom hook to validate the payload of posts.
 * @param {Post[]} posts - Array of posts to be validated.
 * @returns {boolean} - Boolean indicating whether the payload validation succeeded (true) or failed (false).
 */
export default function usePostsPayloadValidation(posts: PostDataType[]): boolean {
    useEffect(() => {
        try {
            payloadValidation(posts);
        } catch (error) {
            console.error(error);
        }
    }, []);
    return true
}