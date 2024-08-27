import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider} from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./app/store";
import { fetchPosts } from "./features/posts/postsAsyncThunks";
import App from "./App";
import "./styles/global.css";

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
// import "react-quill/dist/quill.snow.css";

// fetch user/posts data at the beginning of app
// store.dispatch(fetchUsers("http://localhost:8080/api/profile/me"))
store.dispatch(fetchPosts({}));

const router = createBrowserRouter([
  {
    path: "*",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      // { path: "test", element: <TestPage /> },
      { path: "community", element: <CommunityPostsPage /> },
      { path: "posts/:id", element: <PostDetailPage /> },
      { path: "edit/post/:id", element: <EditPostPage /> },
      { path: "edit", element: <EditPage /> },
      { path: "auth", element: <AuthPage /> },
      { path: "me", element: <UserProfilePage /> },
      { path: "me/notifications", element: <NotificationsPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

// Commented out code - no changes needed, but for reference
// const root = ReactDOM.createRoot(document.getElementById("root")!);
// root.render(
//     <React.StrictMode>
//         <Provider store={store}>
//             <RouterProvider router={router} />
//         </Provider>
//     </React.StrictMode>
// );

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
