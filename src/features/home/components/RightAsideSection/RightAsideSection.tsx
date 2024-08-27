import { Box, Paper, Typography, Divider } from "../../../../styles/mui/index";

export default function RightAsideSection(){
  return (
    <Box
      sx={{
        display: { xs: "none", lg: "flex" },
        flexDirection: "column",
        width: "25%",
        gap: 2,
      }}
    >
      <Paper
        sx={{
          width: "100%",
          backgroundColor: "background.paper",
          borderRadius: 2,
          p: 2,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box>
            <Typography variant="subtitle2">👋 금주 새로운 소식</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="h6" fontWeight="bold">
              새로운 지원 사업 소식
            </Typography>
            <Box
              sx={{
                border: 2,
                borderColor: "black",
                borderRadius: 1,
                p: 2,
                backgroundColor: "background.paper",
              }}
            >
              <Typography>1. 지원 사업 소식</Typography>
              <Typography>2. 창업자 월세 지원 사업 소식</Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="h6" fontWeight="bold">
              마켓 장터
            </Typography>
            <Box
              sx={{
                border: 2,
                borderColor: "black",
                borderRadius: 1,
                p: 2,
                backgroundColor: "background.paper",
              }}
            >
              <Typography>1. 냉동,냉장고 임대</Typography>
              <Typography>2. 각종 집기 렌탈</Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
      <Paper
        sx={{
          width: "100%",
          backgroundColor: "background.paper",
          border: 1,
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
        <Box>
          <Box
            sx={{
              p: 2,
              borderBottom: 1,
              borderColor: "grey.300",
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              #아고라
            </Typography>
            <Typography variant="body2">각종 의견에 참여 해보세요</Typography>
          </Box>
          <Divider />
          <Box sx={{ p: 2, borderBottom: 1, borderColor: "grey.300" }}>
            <Typography>오래 가는 점포의 특징은?</Typography>
          </Box>
          <Divider />
          <Box sx={{ p: 2, borderBottom: 1, borderColor: "grey.300" }}>
            <Typography>알바생을 고용하기 전에 알아야 하는 것은?</Typography>
          </Box>
          <Divider />
          <Box sx={{ p: 2, borderColor: "grey.300" }}>
            <Typography>좋은 상권이란?</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};