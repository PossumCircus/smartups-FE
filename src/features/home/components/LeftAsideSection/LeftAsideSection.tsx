import { Link as RouterLink } from "react-router-dom";
import { Box, Paper, Typography, Button, Link, List } from "../../../../styles/mui/index";
import BoardNav from "./BoardNav";
import { useTheme } from "@mui/material/styles";
import routes from "../../../../constants/routes";
import { HomeIcon, Groups, QuestionMark } from "../../../../styles/muiIcon/index";
import { useSelector } from "react-redux";
import { selectUser } from "../../../users";

export default function LeftAsideSection(){
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const loginUserId = useSelector(selectUser)._id
  return (
    <Box sx={{ display: { xs: "none", md: "block" } }}>
      <aside>
        <Paper
          sx={{
            width: 250,
            bgcolor: "background.paper",
            p: 2,
            borderColor: "divider",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="p" gutterBottom>
            자영업자를 위한 플랫폼<br/>
            스마트업에 어서 오세요
          </Typography>
          <Typography>회원가입을 하여 더 많은 정보를 얻어보세요!</Typography>
          {loginUserId ? null : (
            <Box sx={{ mt: 4, display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
              <Link component={RouterLink} to={routes.signup} sx={{ width: "100%" }}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="success"
                  sx={{
                    borderColor: "#4caf50",
                    color: isDarkMode ? "white" : "#4caf50",
                    backgroundColor: isDarkMode ? "#4caf50" : "transparent",
                    ":hover": {
                      backgroundColor: isDarkMode ? "white" : "#4caf50",
                      color: isDarkMode ? "#4caf50" : "white",
                    },
                  }}
                >
                  회원 가입
                </Button>
              </Link>
              <Link component={RouterLink} to={routes.login} sx={{ width: "100%" }}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="success"
                  sx={{
                    borderColor: "#4caf50",
                    color: isDarkMode ? "white" : "#4caf50",
                    backgroundColor: isDarkMode ? "#4caf50" : "transparent",
                    ":hover": {
                      backgroundColor: isDarkMode ? "white" : "#4caf50",
                      color: isDarkMode ? "#4caf50" : "white",
                    },
                  }}
                >
                  로그인
                </Button>
              </Link>
            </Box>
          )}
        </Paper>
        <nav>
          <List sx={{ mt: 2 }}>
            <BoardNav to={routes.home} icon={<HomeIcon />} label="홈" iconColor="#0091ea" />
            <BoardNav to={routes.community} icon={<Groups />} label="커뮤니티" iconColor="#ff9800" />
            <BoardNav to={routes.qna} icon={<QuestionMark />} label="Q&A" iconColor="#f44336" />
          </List>
        </nav>
      </aside>
    </Box>
  );
};
