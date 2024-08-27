import { Outlet } from "react-router-dom";
import Header from "./Header/HeaderContainer";
import { Box } from "../styles/mui/index";

export default function MainLayout(){
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Box component="main" sx={{ flexGrow: 1, px: 4, overflow: "auto", }}      >
        <Outlet />
      </Box>
    </div>
  );
};