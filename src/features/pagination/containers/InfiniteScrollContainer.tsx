import { useState, useCallback } from "react";
import { fetchInfiniteScrollPosts, increaseViewsCount } from "../../posts";
import { useDispatch } from "react-redux";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { AppDispatch } from "../../../app/store";
import { PostDataType } from "../../../types/postsType";
import InfiniteScroll from "../components/InfiniteScroll";

export default function InfiniteScrollContainer() {
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState<PostDataType[]>([]);
  const [hasNextPage, setNextPage] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  const POST_SIZE = 150; // post div card height
  const PAGE_SIZE =
    (typeof visualViewport === "undefined" || visualViewport === null
      ? 100
      : Math.ceil(visualViewport.width / POST_SIZE)) * 10;

  const fetchInfinitePosts = useCallback(async () => {
    try {
      const result = await dispatch(
        fetchInfiniteScrollPosts({
          params: { page, size: PAGE_SIZE },
        })
      ).unwrap();

      setPosts((prevPosts) => [...prevPosts, ...result.contents]);
      setPage(result.pageNumber + 1);
      setNextPage(!result.isLastPage);
      setIsFetching(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, [dispatch, page]);

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchInfinitePosts, hasNextPage);

  const clickPostHandler = (postId: string): void => {
    dispatch(increaseViewsCount({ postId }));
  };

  return (
    <InfiniteScroll
      posts={posts}
      clickPostHandler={clickPostHandler}
      isFetching={isFetching}
    />
  );
};