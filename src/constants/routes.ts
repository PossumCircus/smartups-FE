const routes = {
  home: "/",
  auth: "/auth",
  login: "/auth?mode=login",
  signup: "/auth?mode=signup",
  community: "/community",
  qna: "/qna",
  edit: "/edit",
  notFound: "*",
  // postDetail: (id: string) => `/posts/${id}`,
  postDetail : "/posts/:id",
  editPost: (id: string) => `/edit/post/${id}`,
  userProfile: "/me",
  userProfileEdit: "/me/edit",
  otherUserProfile: "/other",
  notifications: "/me/notifications",
  // Add more routes as needed
};

export default routes;
