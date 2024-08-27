import React from "react";
import { ShareLinkButton } from "./index";
import { PostDataType, PostsStateType } from "../../../types/postsType";
import { postTimeConverter } from "../../../utils";
import { CommentsSection, CommentsSubmitForm } from "./index";
import { Edit as EditIcon, Delete as DeleteIcon, ThumbUp as ThumbUpIcon, ThumbDown as ThumbDownIcon, Person as PersonIcon, VisibilityOutlined as ViewIcon, ChatBubbleOutline as CommentIcon, ThumbUpOffAlt as LikeIcon } from '@mui/icons-material';
import { Box, Container, Paper, Typography, Avatar, Divider, IconButton, Chip, Tooltip } from '@mui/material';

interface PostDetailProps {
  post: PostDataType | undefined;
  isLoading: PostsStateType["status"];
  handleAddLike: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleAddDislike: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleEditClick: () => void;
  handleDeleteClick: () => void;
  loginUserId: string;
}

export default function PostDetail({
  post,
  isLoading,
  handleAddLike,
  handleAddDislike,
  handleEditClick,
  handleDeleteClick,
  loginUserId,
}: PostDetailProps) {
  if (isLoading === "loading") {
    return <div>Loading...</div>;
  }
  if (isLoading === "failed") {
    return <div>Post not found</div>;
  }
  if (isLoading === "succeeded" && post) {

    const postCreatedAt = postTimeConverter(post.createdAt)

    const parsedContent = JSON.parse(post.content);
    const textContent = parsedContent.map((paragraph: any, index: number) => (
      <Typography key={index} paragraph>
        {paragraph.children[0].text}
      </Typography>
    ));

    return (
      <Box className="postDetailWrapper" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'center', alignItems: 'center', }}      >
        <Container
          className="postDetail:main"
          component="section"
          maxWidth="xl"
          sx={{ mt: 8, mb: 8, borderX: 4, borderColor: 'red.200', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
          <Paper
            component="article" sx={{ borderY: 2, borderColor: 'green.800', p: 2, borderRadius: 2, width: { xs: '80%', sm: '80%', md: '60%' }, }}>
            <Box className="postDetail" sx={{ px: 2 }}>
              <Box className="postDetail:main:top:authorInfo" component="section" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar>
                    {post.author.profile?.avatar ? (<img src={`data:image/jpeg;base64,${post.author.profile.avatar}`} alt="profile" />) : (<PersonIcon />)}
                  </Avatar>
                  <Typography component="span">{post.author.username}</Typography>
                </Box>
                <Typography component="span">{postCreatedAt}</Typography>
              </Box>
              <Divider />
              <Box className="postDetail:main:top:postInfo" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
                  {post.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ViewIcon sx={{ fontSize: '1.5rem' }} /><Typography component="span">{post.viewsCount}</Typography>
                  <CommentIcon sx={{ fontSize: '1.5rem' }} /><Typography component="span">{post.commentsCount}</Typography>
                  <LikeIcon /><Typography component="span">{post.likes.length}</Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box className="postDetail:main:top:hashTags&postHandleButtons" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                <Box className="postDetail:main:top[hashTags]" sx={{ display: 'flex', gap: 1 }}>
                  {post.hashtags.map((hashtag, index) => (
                    <Chip key={index} label={`#${hashtag}`} color="primary" />
                  ))}
                </Box>
                <Box className="postDetail:main:top[postHandleButtons]" sx={{ display: 'flex', gap: 1 }}>
                  <ShareLinkButton />
                  {loginUserId && loginUserId === post.author._id && (
                    <>
                      <IconButton onClick={handleEditClick}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={handleDeleteClick}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </Box>
              </Box>
              <Box className="postDetail:main:middle:content" component="main" >
                <Typography component="p" sx={{ mt: 2 }}>
                  {textContent}
                </Typography>
              </Box>
              <Box className="postDetail:main:middle:contentReactions" sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                <Tooltip title="Like">
                  <IconButton onClick={handleAddLike} color="primary">
                    <ThumbUpIcon />
                    <Typography component="span" sx={{ ml: 1 }}>
                      {post.likes.length}
                    </Typography>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Dislike">
                  <IconButton onClick={handleAddDislike} color="error">
                    <ThumbDownIcon />
                    <Typography component="span" sx={{ ml: 1 }}>
                      {post.dislikes.length === 0 ? 0 : `-${post.dislikes.length}`}
                    </Typography>
                  </IconButton>
                </Tooltip>
              </Box>
              <Box className="postDetail:main:bottom:comments">
                <CommentsSubmitForm />
                <CommentsSection post={post} loginUserId={loginUserId} />
              </Box>
            </Box>
          </Paper>
        </Container>
        <Box
          className="postDetail:footer"
          component="footer"
          sx={{ py: 2, textAlign: 'center', mt: 'auto', backgroundColor: 'grey.200', }}>
          <Typography variant="body2">© 2024 SmartUp. All rights reserved.</Typography>
        </Box>
      </Box>
    );
  }
};
