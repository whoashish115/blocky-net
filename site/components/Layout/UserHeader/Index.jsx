import React from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import Cookie from "js-cookie";

import { DataContext } from "../../../store/GlobalState";
import { getData } from "../../../utils/fetchData"
import DrawerInner from "./DrawerInner";
import SearchBar from "./SearchBar";

// Material UI Components 
import Box from "@mui/material/Box"
import MuiAppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Drawer from "@mui/material/Drawer"
import ListItemIcon from "@mui/material/ListItemIcon"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack"
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab"
import useMediaQuery from "@mui/material/useMediaQuery";
import useScrollTrigger from "@mui/material/useScrollTrigger";

import BookmarksIcon from '@mui/icons-material/Bookmarks';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AdminPanelSettingsOutlined from "@mui/icons-material/AdminPanelSettingsOutlined"
import Logout from "@mui/icons-material/Logout"
import MenuIcon from "@mui/icons-material/Menu"
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import PersonOutline from "@mui/icons-material/PersonOutline"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SubHeader from "./SubHeader";
import EditProfile from "./EditProfile";


const drawerWidth = 280;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    display: "flex",
    flexDirection: "column",
    minHeight: "calc( 100vh - 64px )",
    marginLeft: 0,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      [theme.breakpoints.up("lg")]: {
        marginLeft: `${drawerWidth}px`,
      },
    }),
  })
);
const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== "open", })(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  width: "100%",
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down("lg")]: {
      width: "100%",
      marginLeft: `0px`,
    },
  }),
}));
const SubHeaderBox = styled(Box, { shouldForwardProp: (prop) => prop !== "open", })(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  width: "100%",
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down("lg")]: {
      width: "100%",
      marginLeft: `0px`,
    },
  }),
}));
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",

  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));


const Userheader = ({ children, footer }) => {
  const currentTheme = useTheme();
  const router = useRouter();
  const { state, dispatch } = React.useContext(DataContext);
  const { auth, theme, navigations, navigationCategories } = state;

  // Drawer 
  const isMobileDrawer = useMediaQuery(currentTheme.breakpoints.down("lg"));
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => { setOpen(true) };
  const handleDrawerClose = () => { setOpen(false) };

  // User Menu 
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const MenuOpen = Boolean(menuAnchorEl);
  const handleMenuClick = (event) => { setMenuAnchorEl(event.currentTarget) };
  const handleMenuClose = () => { setMenuAnchorEl(null) };

  // Non User Menu 
  const [nonUserMenuAnchorEl, setNonUserMenuAnchorEl] = React.useState(null);
  const nonUserMenuOpen = Boolean(nonUserMenuAnchorEl);
  const handleNonUserMenuClick = (event) => { setNonUserMenuAnchorEl(event.currentTarget) };
  const handleNonUserMenuClose = () => { setNonUserMenuAnchorEl(null) };

  // Edit Profile
  const [editOpen, setEditOpen] = React.useState(false)


  // Routers 
  const renewData = async () => {
    await getData("admin/user", auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      dispatch({ type: "ADD_USERS", payload: res.users });
    });
    await getData("admin/blog", auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      dispatch({ type: "ADD_BLOGS", payload: res.blogs });
    });
  };
  const adminRouter = () => {
    return (
      <>
        <Link href="/admin">
          <MenuItem onClick={renewData} sx={{color:"text.secondary"}}>
            <ListItemIcon>
              <AdminPanelSettingsOutlined fontSize="small" sx={{color:currentTheme.palette.text.secondary}}/>
            </ListItemIcon>
            Admin Panel
          </MenuItem>
        </Link>
      </>
    )
  }
  const userLoggedRouter = () => {
    return (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Tooltip title="My Account" arrow disableInteractive>
            <IconButton onClick={handleMenuClick} aria-controls={MenuOpen ? 'account-menu' : undefined} aria-haspopup="true" aria-expanded={MenuOpen ? 'true' : undefined}>
              <Avatar alt={auth.user.name} src={auth.user.avatar} sx={{ width: 27, height: 27 }}>M</Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu anchorEl={menuAnchorEl} open={MenuOpen} onClose={handleMenuClose} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
          <Box>
            {auth.user.role === 'admin' && adminRouter()}
          </Box>
          <Link href={"/blog/mysaved"}>
            <MenuItem onClick={handleMenuClose} sx={{color:"text.secondary"}}>
              <ListItemIcon>
                <BookmarksIcon fontSize="small" sx={{color:currentTheme.palette.text.secondary}}/>
              </ListItemIcon>
              My Saved
            </MenuItem>
          </Link>
          <MenuItem onClick={() => { setEditOpen(true); handleMenuClose() }} sx={{color:"text.secondary"}}>
            <ListItemIcon>
              <PersonOutline fontSize="small" sx={{color:currentTheme.palette.text.secondary}}/>
            </ListItemIcon>
            Edit Profile
          </MenuItem>
          <MenuItem onClick={() => { handleLogout(); handleMenuClose() }} sx={{color:"text.secondary"}}>
            <ListItemIcon>
              <Logout fontSize="small" sx={{color:currentTheme.palette.text.secondary}}/>
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </>
    )
  }
  const userRouter = () => {
    return (
      isMobileDrawer ?
        <>
          <IconButton size="small" onClick={handleNonUserMenuClick} aria-controls={nonUserMenuOpen ? 'account-menu' : undefined} aria-haspopup="true" aria-expanded={nonUserMenuOpen ? 'true' : undefined}>
            <PersonOutlineOutlinedIcon />
          </IconButton>
          <Menu
            anchorEl={nonUserMenuAnchorEl}
            open={nonUserMenuOpen}
            onClose={handleNonUserMenuClose}
            onClick={handleNonUserMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >

            <Link href="/auth/signin">
              <MenuItem sx={{color:"text.secondary"}}>
                <ListItemIcon>
                  <PersonOutline fontSize="small" sx={{color:currentTheme.palette.text.secondary}}/>
                </ListItemIcon>
                Sign In
              </MenuItem>
            </Link>

            <Link href="/auth/signup">
              <MenuItem sx={{color:"text.secondary"}}>
                <ListItemIcon>
                  <PersonOutline fontSize="small" sx={{color:currentTheme.palette.text.secondary}}/>
                </ListItemIcon>
                Sign Up
              </MenuItem>

            </Link>
          </Menu>
        </> :
        <>
          <Stack spacing={1} direction="row" alignItems="center" sx={{ paddingLeft: 2 }}>
            <Link href="/auth/signin">
              <Button color={"primary"} variant="outlined">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button variant="contained" color={"primary"}>Sign Up</Button>
            </Link>
          </Stack>
        </>
    )
  }

  // Functions 
  const handleLogout = () => {
    Cookie.remove("refreshtoken");
    localStorage.removeItem("firstLogin");
    dispatch({ type: "AUTH", payload: {} });
    dispatch({ type: "NOTIFY", payload: { success: "Logged out!" } });
    return router.push("/");
  };

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100
  });

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector("#back-to-top-anchor");
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <>
      <AppBar sx={{ ["&.MuiPaper-root"]: { boxShadow: "none" } }} position="fixed" color="inherit" open={open} elevation={0}>

        <Toolbar sx={{ alignItems: "center" }}>

          {/* MenuIcon  */}
          <IconButton color="inherit" onClick={handleDrawerOpen} sx={{ transition: "0.2s", mr: { xs: 0.5, md: 2 }, ...(open && { display: "none" }), }}>
            <MenuIcon fontSize="small" />
          </IconButton>

          {/* Title  */}
          <Box sx={{ flexGrow: "1" }}>
            <Link href="/">
              <Typography sx={{ cursor: "pointer", display: "inline" }} variant="h6">BLOCKY NET</Typography>
            </Link>
          </Box>

          <Stack spacing={0.5} direction="row" alignItems="center" >

            {/* SearchBar  */}
            <SearchBar />

            {/* Theme  */}
            <Tooltip title="Theme Toggle" arrow>
              <IconButton onClick={() => { let themeMode = theme == "dark" ? "light" : "dark"; dispatch({ type: "THEME", payload: themeMode }); localStorage.setItem("theme", themeMode); }}>
                {theme == "light" ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
              </IconButton>
            </Tooltip>

            {/* Route  */}
            {Object.keys(auth).length === 0 ? userRouter() : userLoggedRouter()}

          </Stack>

        </Toolbar>
      </AppBar>

      <DrawerHeader id="back-to-top-anchor" />

      <SubHeaderBox open={open}>
        <SubHeader />
      </SubHeaderBox>

      <Drawer ModalProps={{ keepMounted: true }} sx={{ userSelect: "none", maxWidth: "100%", width: drawerWidth, flexShrink: 0, "& .MuiDrawer-paper": { maxWidth: "100%", width: drawerWidth, boxSizing: "border-box", } }} variant={isMobileDrawer ? "temporary" : "persistent"} open={open}>
        <DrawerInner handleDrawerClose={handleDrawerClose} isMobileDrawer={isMobileDrawer} path={router.asPath} theme={currentTheme} navigations={navigations} navigationCategories={navigationCategories} />
      </Drawer>

      {auth.user && <EditProfile editOpen={editOpen} setEditOpen={setEditOpen} />}

      <Main open={open}>
        <Box sx={{maxWidth: "1500px !important" , marginX:"auto", marginY:2, flex: "1 0 auto"}} p={{ xs: 1, md: 1.5 }}>
          {children}
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          {footer}
        </Box>
      </Main>

      <Zoom in={trigger && !open}>
        <Fab sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 5000 }} onClick={handleClick} color="secondary" size="small">
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>


    </>
  );
};

export default Userheader;
