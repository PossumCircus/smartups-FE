import React from "react";
import TitleInput from "./TitleInput";
import TopicSelect from "./TopicSelect";
import SlateEditor from "./SlateEditor";
import HashTag from "./HashTag";
import { Descendant } from "slate";
import { Button } from "@mui/material";

interface CreatePostFormProps {
  title: string;
  setTitle: (title: string) => void;
  selectedTopic: string;
  setSelectedTopic: (topic: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  hashTags: string[];
  inputHashTagValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddHashTag: () => void;
  handleRemoveHashTag: (index: number) => void;
  content: Descendant[];
  setContent: (content: Descendant[]) => void;
}

const EditPostForm: React.FC<CreatePostFormProps> = ({
  title,
  setTitle,
  selectedTopic,
  setSelectedTopic,
  handleSubmit,
  hashTags,
  inputHashTagValue,
  handleInputChange,
  handleAddHashTag,
  handleRemoveHashTag,
  content,
  setContent,
}) => {
  return (
    <div className="mx-auto my-4 w-full max-w-5xl px-4 lg:mt-[18px] lg:px-0 ">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-y-7">
          <TopicSelect selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} />
          <TitleInput title={title} setTitle={setTitle} />
          <HashTag
            hashTags={hashTags}
            inputHashTagValue={inputHashTagValue}
            handleInputChange={handleInputChange}
            handleAddHashTag={handleAddHashTag}
            handleRemoveHashTag={handleRemoveHashTag}
          />
          <SlateEditor content={content} setContent={setContent} />
          <div className="flex justify-end">
            <Button type="submit" variant="contained" sx={{ bgcolor: "#42a5f5" }}>
              수정하기
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPostForm;
