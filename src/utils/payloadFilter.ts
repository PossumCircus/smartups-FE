import { PostDataType } from "../types/postsType";

/**
 * Filters the payload data by the specified category or topic.
 *
 * @param {Data} data - The data object containing the payload to filter.
 * @param {string} categoryOrTopic - The category or topic to filter by.
 * @returns {Post[]} - The filtered array of posts that match the category or topic.
 */
export default function payloadFilter(data: PostDataType[], categoryOrTopic: string): PostDataType[] {
  const filteredData = data.filter(post =>
    typeof post.topic === 'string' &&
    post.topic.length > 1 &&
    post.topic.includes(categoryOrTopic)
  );

  return filteredData;
}