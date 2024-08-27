import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PostDetail from "../components/PostDetail";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { postsStatus, selectCurrentPost, addPostReaction } from "../index";
import { useFetchPostById } from "../hooks";
import { selectUser } from "../../users";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PostDetailContainer() {
  const { id } = useParams<{ id: string }>();
  const postId = id as string;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const status = useSelector(postsStatus);
  const post = useSelector(selectCurrentPost);
  const loginUserId = useSelector(selectUser)._id
  
  useFetchPostById(postId)

  const handleAddLike = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!postId) {
      console.error("Post ID is undefined");
      return;
    }
    const reaction = "like";

    try {
      await dispatch(addPostReaction({ postId, reaction, user_id: loginUserId })).unwrap();
      alert("게시글에 좋아요가 추가되었습니다.");
    } catch (error) {
      alert("이미 반응이 추가된 게시글입니다.");
      window.location.reload();
      console.error(error);
    }
  };

  const handleAddDislike = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!postId) {
      console.error("Post ID is undefined");
      return;
    }

    const reaction = "dislike";

    try {
      await dispatch(addPostReaction({ postId, reaction, user_id: loginUserId })).unwrap();
      alert("게시글에 싫어요가 추가되었습니다.");
    } catch (error) {
      alert("이미 반응이 추가된 게시글입니다.");
      window.location.reload();
      console.error(error);
    }
  };

  const handleEditClick = () => {
    if (!loginUserId) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      if (post && post.author._id === loginUserId) {
        navigate(`/edit/post/${post._id}`);
      } else {
        alert("부적절한 접근입니다. 글쓴이만 수정할수있습니다.");
      }
    } catch (error) {
      console.error("Failed to parse token from localStorage", error);
    }
  };

  const handleDeleteClick = async () => {
    if (!loginUserId) {
      alert("로그인이 필요합니다.");
      return;
    }

    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) {
      return;
    }

    try {
      if (post && post.author._id === loginUserId) {
        const url = `${process.env.REACT_APP_POST_API_URL}/${postId}`;
        await axios.delete(url, { data: { postId } });
        navigate("/community");
        window.location.reload();
        alert("게시물이 삭제되었습니다.");
      } else {
        alert("부적절한 접근입니다. 글쓴이만 삭제할수있습니다.");
      }
    } catch (error) {
      console.error("Failed to delete the post", error);
      alert("게시물 삭제에 실패했습니다.");
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!post || !post._id) {
    return <div>No Post Found</div>;
  }

  return (
    <PostDetail
      post={post}
      isLoading={status}
      handleAddLike={handleAddLike}
      handleAddDislike={handleAddDislike}
      handleEditClick={handleEditClick}
      handleDeleteClick={handleDeleteClick}
      loginUserId={loginUserId}
    />
  );

};