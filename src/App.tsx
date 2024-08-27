import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
// Pages
import {
  HomePage,
  NotFoundPage,
  CommunityPostsPage,
  PostDetailPage,
  EditPage,
  AuthPage,
  UserProfilePage,
  NotificationsPage,
  EditPostPage,
} from "./pages";

import routes from "./constants/routes";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";
import { selectTheme } from "./features/theme/themeSelector";
import { selectUser } from "./features/users";

const App: React.FC = () => {
  const themeMode = useSelector(selectTheme);
  const loginUserId: string | undefined = useSelector(selectUser)?._id

  const theme = createTheme({
    palette: {
      mode: themeMode,
      background: {
        default: themeMode === "dark" ? "#242424" : "#eeeeee",
        paper: themeMode === "dark" ? "#424242" : "#ffffff",
      },
    },
  });

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path={routes.community} element={<CommunityPostsPage />} />
            <Route path={routes.postDetail} element={<PostDetailPage />} />
            <Route path={routes.edit} element={<EditPage />} />
            <Route path="edit/post/:id" element={<EditPostPage />} />
            {loginUserId && <Route path={routes.userProfile} element={<UserProfilePage />} />}
            {loginUserId && <Route path={routes.notifications} element={<NotificationsPage />} />}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path={routes.auth} element={<AuthPage />} />
        </Routes>
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;
