import Header from "./Header";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectUser } from "../../features/users";
import { AppDispatch } from "../../app/store";
import { selectAllNotifications } from "../../features/notifications";

export default function HeaderContainer(){
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>()
  const loginUserId = useSelector(selectUser)._id
  const newNotificationsLength = useSelector(selectAllNotifications).filter(content => content.isNewOne === true && content.isRead === false).length
  const [myMenuAnchorEl, setMyMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [myProfileAnchorEl, setMyProfileAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);

  const handleMyMenuOpen = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setMyMenuAnchorEl(event.currentTarget);
  };

  const handleMyMenuClose = (): void => {
    setMyMenuAnchorEl(null);
    setMyProfileAnchorEl(null)
  };

  const handleMyProfileOpen = (event: React.MouseEvent<HTMLLIElement>): void => {
    setMyProfileAnchorEl(event.currentTarget)
  }

  const handleMyProfileClose = (): void => {
    setMyMenuAnchorEl(null);
    setMyProfileAnchorEl(null)
  }

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleLogOut = () => {
    dispatch(logOut())
    handleMyMenuClose();
    navigate("/auth?mode=login");
  };

  const handleNavigateToNotification = () => {
    navigate("/me/notifications")
  }
  
  return (
    <Header
      toggleDrawer={toggleDrawer}
      myMenuAnchorEl={myMenuAnchorEl}
      handleMyMenuOpen={handleMyMenuOpen}
      handleMyMenuClose={handleMyMenuClose}
      myProfileAnchorEl={myProfileAnchorEl}
      handleMyProfileOpen={handleMyProfileOpen}
      handleMyProfileClose={handleMyProfileClose}
      open={open}
      loginUserId={loginUserId}
      handleLogOut={handleLogOut}
      newNotificationsLength={newNotificationsLength}
      handleNavigateToNotification={handleNavigateToNotification}
    />
  );
};