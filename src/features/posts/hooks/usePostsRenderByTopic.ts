import { useCallback, useState, useEffect } from 'react'
import { payloadFilter } from '../../../utils'
import { PostDataType } from '../../../types/postsType'

/**
 * Custom hook to render posts based on a specified topic.
 * @param {Post[]} posts - Array of categorized posts.
 * @param {string} topic - Topic value to filter the posts.
 * @returns {[Post[], string, string]} - Filtered posts, original topic, and active topic.
 */

export default function usePostsRenderByTopic(posts: PostDataType[], topic: string)
    : PostDataType[] {
    const [filteredPosts, setFilteredPosts] = useState<PostDataType[]>([])
    const [activeTopic, setActiveTopic] = useState<string>('')

    useEffect(() => {
        if (topic) {
            setActiveTopic(topic)
        }
    }, [topic])

    const postsByTopic = useCallback(() => {
        if (activeTopic) {
            const filteredData = payloadFilter(posts, activeTopic)
            setFilteredPosts(filteredData)
        }
    }, [activeTopic])

    useEffect(() => {
        postsByTopic();
    }, [postsByTopic])

    return filteredPosts
}

