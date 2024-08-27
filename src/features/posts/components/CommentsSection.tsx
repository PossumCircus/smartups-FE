import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { useParams } from "react-router-dom";
import { Box, Typography, Avatar, IconButton, Paper, Container } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, KeyboardReturn as RepliedCommentIcon } from '@mui/icons-material';
import { PostDataType } from '../../../types/postsType'
import CommentsSubmitForm from './CommentsSubmitForm'
import { deleteComment } from "../postsAsyncThunks";
type FormType = {
    [commentId: string]: boolean;
}

type CommentsSectionPropsType = {
    loginUserId: string;
    post: PostDataType;
}

export default function CommentsSection({
    loginUserId,
    post
}:CommentsSectionPropsType){
    const [replyFormStates, setReplyFormStates] = useState<FormType>({}); // 각 댓글에 대한 ReplyForm 표시 상태를 관리
    const [isReplyComment, setIsReplyComment] = useState<boolean>(false)
    const [editFormStates, setEditFormStates] = useState<FormType>({}); // 각 댓글에 대한 ReplyForm 표시 상태를 관리
    const [isEditingComment, setIsEditingComment] = useState<boolean>(false)
    const { id } = useParams<{ id: string }>();
    const postId = id as string;
    const dispatch = useDispatch<AppDispatch>();

    const toggleReplyForm = (commentId: string) => {
        setReplyFormStates(prevStates => ({
            ...prevStates,
            [commentId]: !prevStates[commentId] // 클릭한 댓글의 ReplyForm 표시 상태를 반전시킴
        }));
    };
    const toggleEditForm = (replyCommentId: string) => {
        setEditFormStates(prevStates => ({
            ...prevStates,
            [replyCommentId]: !prevStates[replyCommentId] // 클릭한 댓글의 EditForm 표시 상태를 반전시킴
        }));
    };

    const handleDeleteComment = (commentId: string) => {
        const doubleCheck = window.confirm('정말 삭제하시겠습니까?');
        if (doubleCheck) {
            dispatch(deleteComment({
                postId,
                commentId,
            }))
            window.location.reload()
        }
    }

    return (
        <Container className="postDetail:main:bottom:commentsWrapper" component="section" sx={{ mt: 2, minHeight: '100vh', justifyContent: 'center', alignItems: 'center', minWidth: '100%' }}  >
            <Paper className="postDetail:main:bottom:comments" component="article" elevation={0} sx={{ mb: 1 }} >
                {post && post.comments.map((comment, i) => {
                    if (!comment) return null;
                    return (
                        <Box className={`"postDetail:main:bottom:comments[parentComment]:wrapper" my-1 border-l-2 ${comment.author._id === loginUserId ? 'border-blue-400' : 'border-gray-400'} bg-gradient-to-tr from-slate-100 to-slate-white`}
                            key={comment._id}
                            sx={{ display: 'flex', flexDirection: 'column', mb: 1, pl: 1 }}>
                            <Box className="postDetail:main:bottom:comments[parentComment]:authorInfo" sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, borderBottom: '1px solid #CCCCCC', width: '100%', pb: 1 }}>
                                    <Avatar src="/img/ping.png" alt="user avatar" sx={{ maxWidth: 24, maxHeight: 24 }} />
                                    <Typography variant="body2">{comment.author.username}</Typography>
                                </Box>
                                {/* <Typography>{comment.date}</Typography> */}
                            </Box>
                            <Box className="postDetail:main:bottom:comments[parentComment]:commentHandleButtons" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {
                                    loginUserId && (
                                        <IconButton sx={{ p: 1, '& svg': { fontSize: 15 } }} onClick={() => {
                                            toggleReplyForm(comment._id)
                                            setIsReplyComment(true)
                                        }}>
                                            <RepliedCommentIcon sx={{ transform: 'scaleX(-1) scale(1.3)', color: 'grey' }} />
                                        </IconButton>
                                    )
                                }
                                <Box sx={{ display: 'flex' }}>
                                    {loginUserId && (comment.author?._id === loginUserId) && (
                                        <>
                                            <IconButton sx={{ p: 1, '& svg': { fontSize: 15 } }} onClick={() => {
                                                toggleEditForm(comment._id)
                                                setIsEditingComment(prev => !prev)
                                            }}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton sx={{ p: 1, '& svg': { fontSize: 15 } }} onClick={() => handleDeleteComment(comment._id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </>
                                    )}
                                </Box>
                            </Box>
                            <Box className="postDetail:main:bottom:comments[parentComment]:content">
                                <Typography sx={{ minHeight: '10dvh' }}>{comment.content}</Typography>
                            </Box>
                            {
                                replyFormStates[comment._id] && <CommentsSubmitForm isReplyComment={isReplyComment} targetCommentId={comment._id} commentAuthor={comment.author!._id}/>
                            }
                            {
                                editFormStates[comment._id] && <CommentsSubmitForm isEditingComment={isEditingComment} targetCommentId={comment._id} prevComment={comment.content} />
                            }
                            < Box className="postDetail:main:bottom:comments[replyComment]:wrapper" sx={{ display: `${!comment.replies ? 'none' : 'block'}` }}>
                                {comment.replies?.map((reply, j) => {
                                    if (!reply) return null;
                                    return (
                                        <Box className="postDetail:main:bottom:comments[replyComment]" sx={{ display: 'flex', flexDirection: 'row' }} key={reply._id}>
                                            <RepliedCommentIcon sx={{ transform: 'scaleX(-1) scaleX(0.8)', color: 'grey' }} />
                                            <Box className={`my-1 border-l-2 ${reply.author?._id === loginUserId ? 'border-blue-400' : 'border-gray-400'} bg-gradient-to-tr from-slate-100 to-slate-white`}
                                                sx={{ mb: 1, pl: 2, pb: 3, display: 'flex', flexDirection: 'column', width: '100%' }}>
                                                <Box className="postDetail:main:bottom:comments[replyComment]:authorInfo" sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, borderBottom: '1px solid #CCCCCC', width: '100%', pb: 1 }}>
                                                        <Avatar src="/img/ping.png" alt="user avatar" sx={{ maxWidth: 24, maxHeight: 24 }} />
                                                        <Typography variant="body2">{reply.author?.username}</Typography>
                                                    </Box>
                                                </Box>
                                                <Box className="postDetail:main:bottom:comments[replyComment]:commentHandleButtons" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                    {loginUserId && (reply.author?._id === loginUserId) && (
                                                        <>
                                                            <IconButton sx={{ p: 1, '& svg': { fontSize: 15 } }} onClick={() => {
                                                                toggleEditForm(reply._id)
                                                                setIsEditingComment(prev => !prev)
                                                            }}>
                                                                <EditIcon />
                                                            </IconButton>
                                                            <IconButton sx={{ p: 1, '& svg': { fontSize: 15 } }} onClick={() => handleDeleteComment(reply._id)}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </>
                                                    )}
                                                </Box>
                                                <Box className="postDetail:main:bottom:comments[replyComment]:content">
                                                    <Typography sx={{ minHeight: '4dvh' }} >
                                                        {reply.content}
                                                    </Typography>
                                                </Box>
                                                {
                                                    editFormStates[reply._id] && <CommentsSubmitForm isEditingComment={isEditingComment} targetCommentId={reply._id} prevComment={reply.content} />
                                                }
                                            </Box>
                                        </Box>
                                    )
                                }
                                )}
                            </Box>
                        </Box>
                    )
                }
                )}
            </Paper >
        </Container >
    )
}