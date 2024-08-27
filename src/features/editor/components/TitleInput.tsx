import React from "react";
import { TextField } from "@mui/material";

interface TitleInputProps {
  title: string;
  setTitle: (title: string) => void;
}

const TitleInput: React.FC<TitleInputProps> = ({ title, setTitle }) => {
  return (
    <div>
      <p className="text-lg font-semibold mb-2">제목</p>
      <TextField
        type="text"
        placeholder="제목을 입력해주세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant="outlined"
        fullWidth
        sx={{
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
    </div>
  );
};

export default TitleInput;
