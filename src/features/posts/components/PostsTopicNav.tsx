import { Link } from "react-router-dom";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Box, Button, Menu, MenuItem, IconButton, Typography } from "@mui/material";
import { useState } from "react";

interface NavPathType {
  path: string;
  section: string;
}
interface PostsTopicNavPropsType {
  navPaths: NavPathType[];
  topic: string | null;
  handleWriteClick: () => void;
}

export default function PostsTopicNav({ navPaths, topic, handleWriteClick }: PostsTopicNavPropsType) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box className="postsTopicNav:WriteAndNav">
      <Box display="flex" pt={4} justifyContent="space-between" alignItems="center" fontWeight="fontWeightBold">
        <Box className="writeButton" flexShrink={0}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleWriteClick}
            sx={{ borderRadius: "4px", textTransform: "none", boxShadow: "none" }}
          >
            ✏️작성하기
          </Button>
        </Box>
        <Box className="navPaths" display="flex" gap={2} sx={{ gap: { sm: 4 } }}>
          {navPaths &&
            navPaths.map((v, index) => {
              const isActive = topic === v.path.split("=")[1];
              const isAllView = v.section === "전체 보기" && !topic;
              return (
                <Box key={index} component="ul" m={0} p={0}>
                  <Box component="li">
                    <Link to={v.path} style={{ textDecoration: "none" }}>
                      <Typography sx={{ borderBottom: isActive || isAllView ? "2px solid orange" : "none", }}>
                        {v.section}
                      </Typography>
                    </Link>
                  </Box>
                </Box>
              );
            })}
        </Box>
        <Box className="filterMenu" position="relative" zIndex="50" display={{ xs: "none", sm: "block" }}>
          <IconButton onClick={handleClick} sx={{ px: 2, py: 1, borderRadius: 0 }}>
            <FilterListIcon style={{ width: "20px", height: "20px" }} />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleClose}>좋아요순 정렬</MenuItem>
            <MenuItem onClick={handleClose}>조회수순 정렬</MenuItem>
            <MenuItem onClick={handleClose}>최신순 정렬</MenuItem>
            <MenuItem onClick={handleClose}>오래된순 정렬</MenuItem>
          </Menu>
        </Box>
      </Box>
      <Box width="100%" height="1px" bgcolor="#bdbdbd" my={2}></Box>
    </Box>
  );
}
