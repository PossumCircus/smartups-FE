import { useDispatch } from "react-redux";
import { fetchPostById } from "../index";
import { useEffect } from "react";
import { AppDispatch } from "../../../app/store"; // Adjust the import to your store file

/**
 *
 * @param {string} postId - object id of post
 */

export default function useFetchPostById(postId: string) {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (postId) {
            dispatch(fetchPostById({ postId }));
        }
    }, [postId, dispatch]);
}