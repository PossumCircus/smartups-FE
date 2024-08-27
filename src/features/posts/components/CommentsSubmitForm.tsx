import { ChangeEvent, useState, useRef, FormEvent } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { createComment, createReplyComment, editComment } from "..";
import { selectUser } from '../../users';
import { useParams, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";
import { createNotification } from '../../notifications';

type CommentsSubmitFormPropsType = {
  isReplyComment?: boolean;
  isEditingComment?: boolean;
  commentAuthor?: string;
  prevComment?: string;
  targetCommentId?: string
}

export default function CommentsSubmitForm({
  isReplyComment,
  isEditingComment,
  commentAuthor,
  prevComment,
  targetCommentId
}: CommentsSubmitFormPropsType) {
  const [content, setContent] = useState<string>('');
  const [editContent, setEditContent] = useState<string>(prevComment as string);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>();
  const postId = id as string;
  const loginUserId = useSelector(selectUser)._id
  const url = new URL(window.location.href);
  const path = url.pathname;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (isEditingComment) {
      setEditContent(e.target.value);
      console.log('edit')
    } else {
      setContent(e.target.value)
      console.log('content')
    }
  };

  const handleCommentSubmit = () => {
    if (content.trim() !== '') {
      dispatch(createComment({ postId, author: loginUserId, content }))
      setContent(""); // 등록 후 입력 필드 초기화
    }
  };

  const handleReplyCommentSubmit = () => {
    if (content.trim() !== '') {
      console.log('Comment submitted:', content);
      dispatch(createReplyComment({
        postId,
        parentCommentId: targetCommentId,
        author: loginUserId,
        content
      }))
      setContent('');
      dispatch(createNotification({
        recipient: commentAuthor as string,
        sender: loginUserId,
        isNewOne: true,
        isRead: false,
        notificationType: 'comment_new_reply',
        link: path
      }))
    }
  };

  const handleEditCommentSubmit = () => {
    if (editContent?.trim() !== '') {
      dispatch(editComment({
        postId,
        commentId: targetCommentId as string,
        content: editContent,
      }))
    }
    setEditContent('');
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isReplyComment) {
      handleReplyCommentSubmit();
    } else if (isEditingComment) {
      handleEditCommentSubmit();
    } else {
      handleCommentSubmit();
    }
    window.location.reload()
  }

  const handleTextfieldClick = () => {
    if (!loginUserId) navigate("/auth?mode=login")
  }

  return (
    <Box className="comments-textarea" component="section" sx={{ mt: 2 }}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Typography
          component="label"
          htmlFor="comment"
          sx={{ display: "block", fontSize: "0.875rem", fontWeight: 500 }}
        />
        <TextField
          id="comment"
          name="comment"
          placeholder={`${loginUserId ? '건전한 댓글 문화를 지향 해주세요' : '로그인이 필요한 기능입니다.'}`}
          inputRef={textareaRef}
          value={isEditingComment ? editContent : content}
          onChange={handleChange}
          onClick={handleTextfieldClick}
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          sx={{
            mt: 1,
            borderRadius: 1,
            resize: "none",
            border: "1px solid",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "rgba(0, 0, 0, 0.23)",
              },
              "&:hover fieldset": {
                borderColor: "rgba(0, 0, 0, 0.23)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "transparent",
              },
            },
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button variant="contained" type="submit">
            {isEditingComment ? '수정완료' : '등록'}
          </Button>
        </Box>
      </form>
    </Box >
  );
}