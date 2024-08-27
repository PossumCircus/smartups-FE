import { Paper, Typography } from "../../../styles/mui/index";

export default function Banner({ category, categoryDescription }: { category: string; categoryDescription: string }) {
  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: "8px",
        height: "10dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Typography variant="h5" fontWeight="bold">
        커뮤니티
      </Typography>
      <Typography variant="body2">{categoryDescription}</Typography>
    </Paper>
  );
}
