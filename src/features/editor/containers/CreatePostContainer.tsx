import React, { useState } from "react";
import CreatePostForm from "../components/CreatePostForm";
import { Descendant } from "slate";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../users";
import { AppDispatch } from "../../../app/store";
import { createNewPost } from "../../posts/postsAsyncThunks";
import { useNavigate } from "react-router-dom";
const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

const CreatePostContainer: React.FC = () => {
  const [title, setTitle] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [hashTags, setHashTags] = useState<string[]>([]);
  const [inputHashTagValue, setInputHashTagValue] = useState("");
  const [content, setContent] = useState<Descendant[]>(initialValue);
  const author = useSelector(selectUser)._id
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  //해쉬태그값저장
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputHashTagValue(e.target.value);
  };

  //해쉬태그추가
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

  //글저장
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(selectedTopic);

    if (!title || selectedTopic === "none" || !hashTags || !content) {
      alert("모든 필드를 작성해주세요.");
      return;
    }

    const postData = {
      author,
      title,
      topic: selectedTopic,
      hashtags: hashTags,
      content: JSON.stringify(content),
    };

    dispatch(createNewPost(postData));
    navigate("/community?page=1");
    window.location.reload();
  };

  return (
    <CreatePostForm
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

export default CreatePostContainer;
