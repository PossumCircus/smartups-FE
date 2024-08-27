import { Link } from "react-router-dom";
import { PostDataType } from "../../../types/postsType";
import { Typography, Box, Paper } from "@mui/material";
import { Person as PersonIcon, ThumbUpOffAlt as LikeIcon, ChatBubbleOutline as CommentIcon, VisibilityOutlined as ViewIcon } from "@mui/icons-material";
import { formatDistanceToNow, parseISO } from "date-fns"
import { ko } from 'date-fns/locale';

type InfiniteScrollCopyPropsType = {
  posts: PostDataType[]
  clickPostHandler: (postId: string) => void
  isFetching: boolean
}

export default function InfiniteScroll({
  posts,
  clickPostHandler,
  isFetching
}: InfiniteScrollCopyPropsType) {

  return (
    <>
      {posts.map((post) => {
        const date = parseISO(post.createdAt)
        const timeAgo = formatDistanceToNow(date, { locale: ko });
        return (
          <Box display="flex" justifyContent="center" >
            <Paper elevation={3} sx={{ p: 2, borderRadius: 2, width: "100%" }}>
              <Box className="postCard:top:authorInfo" display="flex" justifyContent="space-between" flexDirection={{ xs: "column", sm: "row" }} mb={2}>
                <Box display="flex" alignItems="center" gap={1} justifyContent="space-between">
                  {<PersonIcon /> || <img
                    src={`data:image/jpeg;base64,${post.author.profile.avatar}`}
                    className="max-w-6 inline"
                    alt="사진"
                  />}
                  <Typography>{post.author.username}</Typography>
                </Box>
                <Box>
                  <Typography>
                    {`${timeAgo} 전`}
                  </Typography>
                </Box>
              </Box>
              <Box className="postCard:middle:postInfo" display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="h6" sx={{ "&:hover": { opacity: 0.7, }, }}              >
                  <Link to={`posts/${post._id}`} onClick={() => clickPostHandler(post._id)}>
                    <h3>{post.title}</h3>
                  </Link>
                </Typography>

                <Box display="flex" alignItems="center" gap={1}>
                  <ViewIcon sx={{ strokeWidth : 5}} /><Typography>{post.viewsCount}</Typography>
                  <CommentIcon /><Typography>{post.comments.length}</Typography>
                  <LikeIcon /><Typography>{post.likes.length}</Typography>
                </Box>
              </Box>
              <Box className="postCard:divider" width="100%" height="1px" bgcolor="#bdbdbd" mt={1} mb={1}></Box>
              <Box className="postCard:bottom:hashtags" display="flex" justifyContent="space-between" >
                <Box display="flex" gap={1}>
                  {post.hashtags.map((hashtag, index) => (
                    <Typography key={index} variant="body2" component="span"
                      sx={{
                        bgcolor: "skyblue",
                        borderRadius: 3,
                        px: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 25,
                      }}
                    >
                      #{hashtag}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Paper>
          </Box>
        )
      })}
      {isFetching && <div> 로딩중</div>}
    </>
  )
};