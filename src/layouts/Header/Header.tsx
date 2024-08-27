import React from "react";
import routes from "../../constants/routes";
import {
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  InputBase,
  Badge,
  Menu,
  MenuItem,
  Drawer,
} from "../../styles/mui/index";
import { Link } from "react-router-dom";
import { Search as SearchIcon, Menu as MenuIcon, Person as PersonIcon, Mail as MailIcon } from "@mui/icons-material"
import DarkModeToggle from "../../features/theme/containers/DarkModeToggleContainer";
import HeaderHamburgerButton from "./HeaderHamburgerButton";

interface HeaderProps {
  open: boolean;
  myMenuAnchorEl: null | HTMLElement;
  handleMyMenuOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleMyMenuClose: () => void;
  myProfileAnchorEl: null | HTMLElement;
  handleMyProfileOpen: (event: React.MouseEvent<HTMLLIElement>) => void;
  handleMyProfileClose: () => void;
  toggleDrawer: (newOpen: boolean) => () => void;
  loginUserId: string | null;
  handleLogOut: () => void;
  newNotificationsLength: number;
  handleNavigateToNotification: () => void
}

export default function Header({
  myMenuAnchorEl,
  handleMyMenuOpen,
  handleMyMenuClose,
  myProfileAnchorEl,
  handleMyProfileOpen,
  handleMyProfileClose,
  toggleDrawer,
  open,
  loginUserId,
  handleLogOut,
  newNotificationsLength,
  handleNavigateToNotification
}: HeaderProps) {
  return (
    <AppBar position="static" color="inherit" elevation={0} sx={{ boxShadow: "none" }}>
      <div className="w-full mx-auto max-w-[1280px]">
        <Toolbar className="flex justify-between">
          <Box className="logoAndToggleMenu" display="flex" alignItems="center">
            <div className="sidebarToggle md:hidden">
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer open={open} onClose={toggleDrawer(false)}>
                <HeaderHamburgerButton toggleDrawer={toggleDrawer} />
              </Drawer>
            </div>
            <Link to="/" className="logoButton">
              <img
                src="/img/logo.png"
                alt="logo"
                style={{ width: "40px", height: "40px", marginLeft: "16px", marginRight: "16px" }}
              />
            </Link>
          </Box>
          <Box className="searchBar hidden md:block"
            sx={{ display: "flex", alignItems: "center", border: "1px solid", borderRadius: 1, px: 1, ml: 2, minWidth: "340px", }} >
            <InputBase
              sx={{ ml: 1, flex: 1, color: "inherit" }}
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
            />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search" onClick={() => alert("준비중입니다.")}>
              <SearchIcon />
            </IconButton>
          </Box>
          <Box className="userLogin" display="flex" alignItems="center" ml={2}>
            <div className="md:hidden">
              <IconButton color="inherit" aria-label="search">
                <SearchIcon />
              </IconButton>
            </div>
            <DarkModeToggle />
            {loginUserId ?
              (
                <div>
                  <IconButton onClick={handleNavigateToNotification}>
                    <Badge badgeContent={newNotificationsLength} color="secondary">
                      <MailIcon color="action" />
                    </Badge>
                  </IconButton>
                  <IconButton color="inherit" onClick={handleMyMenuOpen}>
                    <PersonIcon />
                  </IconButton>
                  <Menu
                    anchorEl={myMenuAnchorEl}
                    open={Boolean(myMenuAnchorEl)}
                    onClose={handleMyMenuClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <MenuItem onClick={(e) => {
                      handleMyMenuClose()
                      handleMyProfileOpen(e)
                    }}>내 정보</MenuItem>
                    <MenuItem onClick={handleLogOut}>로그아웃</MenuItem>
                  </Menu>
                  <Menu
                    anchorEl={myProfileAnchorEl}
                    open={Boolean(myProfileAnchorEl)}
                    onClose={handleMyProfileClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                    transformOrigin={{ vertical: "top", horizontal: "right", }}
                  >
                    <MenuItem onClick={handleMyProfileClose}>
                      <Link to={routes.userProfile}>프로필</Link>
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <>
                  <Link to={routes.login} style={{ textDecoration: "none" }}>
                    <Button sx={{ color: "#42a5f5", ":hover": { color: "white", backgroundColor: "#42a5f5" }, mx: 1, }}                    >
                      로그인
                    </Button>
                  </Link>
                  <Link to={routes.signup} style={{ textDecoration: "none" }}>
                    <Button variant="outlined"
                      sx={{ borderColor: "#42a5f5", color: "#42a5f5", ":hover": { backgroundColor: "#42a5f5", borderColor: "#42a5f5", color: "white", }, mx: 1, }}>
                      회원 가입
                    </Button>
                  </Link>
                </>
              )}
          </Box>
        </Toolbar>
      </div>
    </AppBar>
  );
};