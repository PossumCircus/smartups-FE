import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditPostForm from "../components/EditPostForm";
import { Descendant, Element, Text } from "slate";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../users";
import { AppDispatch, RootState } from "../../../app/store";
import { PostDataType } from "../../../types/postsType";
import { selectSinglePostById } from "../../posts/postsSelectors";
import { fetchPostById } from "../../posts/postsAsyncThunks";
import axios from "axios";

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  } as Element,
];

//content가 비어있는지 확인하는 로직
const isContentEmpty = (content: Descendant[]): boolean => {
  return (
    content.length === 1 &&
    (content[0] as Element).type === "paragraph" &&
    (content[0] as Element).children.length === 1 &&
    Text.isText((content[0] as Element).children[0]) &&
    (content[0] as Element).children[0].text === ""
  );
};

const EditPostContainer: React.FC = () => {
  const [title, setTitle] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [hashTags, setHashTags] = useState<string[]>([]);
  const [inputHashTagValue, setInputHashTagValue] = useState("");
  const [content, setContent] = useState<Descendant[]>(initialValue);
  const { id } = useParams<{ id: string }>();
  const postId = id as string;
  const [post, setPost] = useState<PostDataType | undefined>(undefined);
  const dispatch = useDispatch<AppDispatch>();
  const fetchedPost: PostDataType | undefined = useSelector((state: RootState) => selectSinglePostById(state, postId));
  const selectedPost = useMemo(() => fetchedPost, [fetchedPost]);
  const loginUserId = useSelector(selectUser)._id

  useEffect(() => {
    if (selectedPost) {
      setPost(selectedPost);
      setTitle(selectedPost.title);
      setSelectedTopic(selectedPost.topic);
      setHashTags(selectedPost.hashtags);
      try {
        const parsedContent = JSON.parse(selectedPost.content);
        setContent(parsedContent);
      } catch (e) {
        console.error("Error parsing content", e);
        setContent(initialValue);
      }
    }
    if (!fetchedPost) {
      dispatch(fetchPostById({ postId }));
      console.log("postID", { postId });
    }
  }, [fetchedPost, postId, dispatch, selectedPost]);

  const navigate = useNavigate();

  //해쉬태그값저장
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputHashTagValue(e.target.value);
  };

  // 해쉬태그추가
  const handleAddHashTag = () => {
    if (hashTags.length >= 5) {
      alert("5개가 최대입니다");
      return;
    }

    if (inputHashTagValue.trim() !== "") {
      const newTag = inputHashTagValue.trim(); // 입력값 그대로 사용
      setHashTags([...hashTags, newTag]);
      setInputHashTagValue("");
    }
  };

  //해쉬태그삭제
  const handleRemoveHashTag = (index: number) => {
    const newHashTags = hashTags.filter((_, i) => i !== index);
    setHashTags(newHashTags);
  };

  //글수정API
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title === "" || isContentEmpty(content) || selectedTopic === "") {
      alert("빈칸을 채워주세요");
      return;
    }

    const confirmUpdate = window.confirm("수정하시겠습니까?");
    if (!confirmUpdate) {
      return;
    }

    const requestBody = {
      author: loginUserId,
      topic: selectedTopic,
      title,
      hashtags: hashTags,
      content: JSON.stringify(content),
      postId: postId,
    };

    console.log("requestBody", requestBody);
    console.log("postID", postId);
    try {
      const res = await axios.patch(`${process.env.REACT_APP_POST_API_URL}/${postId}`, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        console.log("Update successful");
        navigate("/community?page=1");
        window.location.reload();
      } else {
        console.log("Update failed");
      }
    } catch (e) {
      console.log("Error during the request", e);
    }
  };

  return (
    <EditPostForm
      inputHashTagValue={inputHashTagValue}
      handleInputChange={handleInputChange}
      handleAddHashTag={handleAddHashTag}
      handleRemoveHashTag={handleRemoveHashTag}
      hashTags={hashTags}
      title={title}
      setTitle={setTitle}
      selectedTopic={selectedTopic}
      setSelectedTopic={setSelectedTopic}
      handleSubmit={handleSubmit}
      content={content}
      setContent={setContent}
    />
  );
};

export default EditPostContainer;
