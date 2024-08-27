import React from "react";
import { TextField, Button } from "@mui/material";

interface HashTagProps {
  hashTags: string[];
  inputHashTagValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddHashTag: () => void;
  handleRemoveHashTag: (index: number) => void;
}

const HashTag: React.FC<HashTagProps> = ({
  hashTags,
  inputHashTagValue,
  handleAddHashTag,
  handleInputChange,
  handleRemoveHashTag,
}) => {
  return (
    <div>
      <p className="text-lg font-semibold mb-2">#태그</p>
      <div className="flex gap-2">
        <TextField
          type="text"
          placeholder="태그를 입력해주세요"
          variant="outlined"
          value={inputHashTagValue}
          onChange={handleInputChange}
          sx={{
            width: "50%",
            borderRadius: 2,
            bgcolor: "background.paper",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "skyblue",
              },
              "&:hover fieldset": {
                borderColor: "skyblue",
              },
              "&.Mui-focused fieldset": {
                borderColor: "skyblue",
              },
            },
          }}
        />

        <Button onClick={handleAddHashTag} variant="contained" sx={{ bgcolor: "#42a5f5" }}>
          추가
        </Button>
      </div>
      <div className="mt-4 flex">
        {hashTags.map((tag, index) => (
          <div key={index}>
            <span className="bg-sky-400 rounded-md px-2 py-1 text-white">{tag}</span>
            <button className="mx-2" onClick={() => handleRemoveHashTag(index)}>
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HashTag;
