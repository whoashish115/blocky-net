import React from 'react'

import Link from "next/link"
import { useRouter } from "next/router"
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import Navigation from './Navigation'
import { getData } from '../../../utils/fetchData'
import { DataContext } from "../../../store/GlobalState"

import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import AppBar from "@mui/material/AppBar"
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Collapse from "@mui/material/Collapse"
import Drawer from "@mui/material/Drawer"

import Menu from "@mui/icons-material/Menu"
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LightModeIcon from "@mui/icons-material/LightMode"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';



const RefreshDataIconButton = styled(IconButton, { shouldForwardProp: (prop) => prop !== "rotate", })(({ theme, rotate }) => ({
  ...(rotate && {
    transition: "1s",
    animation: `rotate 1s infinite linear`,
  }),
  "@keyframes rotate": {
    "0%": {
      transform: "rotate(0deg)"
    },
    "100%": {
      transform: "rotate(180deg)"
    }
  },

}));
const drawerWidth = 250;
const getTitle = (path) => {
  if (path == "/admin") return "Admin Dashboard"
  else if (path == "/admin/analytics") return "Analytics"
  else if (path == "/admin/analytics/[slug]") return "Analytics Related To Particular Blog"

  else if (path == "/admin/data/categories") return "Categories Collection"
  else if (path == "/admin/data/blogs") return "Blog Posts Collection"
  else if (path == "/admin/data/navigations") return "Navigations Collection"
  else if (path == "/admin/data/navigationCategories") return "Navigation Categories Collection"
  else if (path == "/admin/data/users") return "Users Collection"
  else if (path == "/admin/data/comments") return "Comments Collection"
  else if (path == "/admin/data/comments/[id]") return "Comments Collection Related To Particular Blog"
  else if (path == "/admin/data/pages") return "Pages Collection"

  else if (path == "/admin/create/user") return "Create a new User"
  else if (path == "/admin/create/blog") return "Create a new Blog Post"
  else if (path == "/admin/create/navigation") return "Create a new Navigation"
  else if (path == "/admin/create/navigationCategory") return "Create a new Navigation Category"
  else if (path == "/admin/create/page") return "Create a new Page"
  else if (path == "/admin/create/category") return "Create a new Category"

  else if (path == "/admin/edit/blog") return "Edit Blog Post"
  else if (path == "/admin/edit/user") return "Edit User"
  else if (path == "/admin/edit/navigation") return "Edit Navigation"
  else if (path == "/admin/edit/navigationCategory") return "Edit Navigation Category"
  else if (path == "/admin/edit/page") return "Edit Page"
  else if (path == "/admin/edit/category") return "Edit Category"

}

const Index = ({ children }, props) => {
  const router = useRouter()
  const currentTheme = useTheme()
  const { state, dispatch } = React.useContext(DataContext)
  const { theme, auth } = state

  // Mobile Drawer Open / Close 
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setMobileOpen(true);
  };
  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  // Data Refreshing 
  const [refreshing, setRefreshing] = React.useState(false);
  const [rotate, setRotate] = React.useState(false);
  const renewData = async () => {
    if (refreshing) return
    setRefreshing(true)
    setRotate(true)

    await getData("category").then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      dispatch({ type: "ADD_CATEGORIES", payload: res.categories });
    });
    await getData("navigation").then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      dispatch({ type: "ADD_NAVIGATIONS", payload: res.navigations });
    });
    await getData("navigationCategory").then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      dispatch({ type: "ADD_NAVIGATION_CATEGORIES", payload: res.navigationCategories });
    });
    await getData("page").then((res) => {
      if (res.err) return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      dispatch({ type: "ADD_PAGES", payload: res.pages });
    });
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
    dispatch({ type: "NOTIFY", payload: { success: "Data Refresh Successfully" } });
    setRotate(false)
    setRefreshing(false)
  };

  // Full Screen Mode 
  const [fullScreen, setFullScreen] = React.useState(false);
  const fullScreenMode = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };
  React.useEffect(() => {
    document.addEventListener('fullscreenchange', function (event) {
      if (document.fullscreenElement) {
        setFullScreen(true);
      } else { setFullScreen(false); }
    });
    document.addEventListener('webkitfullscreenchange', function (event) {
      if (document.fullscreenElement) {
        setFullScreen(true);
      } else { setFullScreen(false); }
    });
    document.addEventListener('mozfullscreenchange', function (event) {
      if (document.fullscreenElement) {
        setFullScreen(true);
      } else { setFullScreen(false); }
    });
  }, []);

  const { window } = props
  const container = window !== undefined ? () => window().document.body : undefined;


  const Title = getTitle()

  return (
    <>

      <Box p={1.5} sx={{ display: 'flex' ,}}>


        <AppBar position="fixed" color="inherit" sx={{ width: { md: `calc(100% - ${drawerWidth}px)` }, ml: { md: `${drawerWidth}px` }, }}>
          <Toolbar>

            <IconButton color="inherit" edge="start" onClick={handleDrawerOpen} sx={{ mr: 2, display: { md: 'none' } }}>
              <Menu />
            </IconButton>

            <Box sx={{ flexGrow: 1 }}>
              <Link href={"/admin"}>
                <Typography variant="h6" noWrap component="div" sx={{ display: 'inline', cursor: "pointer" }}>
                  Admin Panel
                </Typography>
              </Link>
            </Box>

            <Stack spacing={1} direction="row" alignItems="flex-end">

              {/* Full Screen Toggle  */}
              <Box>
                <Tooltip title="Full Screen Toggle" arrow>
                  <IconButton onClick={fullScreenMode}>
                    {fullScreen ? <FullscreenExitIcon fontSize="small" sx={{ width: 22.5, height: 22.5 }} /> : <FullscreenIcon fontSize="small" sx={{ width: 22.5, height: 22.5 }} />}
                  </IconButton>
                </Tooltip>
              </Box>

              {/* Refresh All Data  */}
              <Box>
                <Tooltip title="Refresh All Data" arrow>
                  <RefreshDataIconButton rotate={rotate} onClick={renewData}>
                    <AutorenewIcon fontSize="small" sx={{ strokeWidth: 1, stroke: currentTheme.palette.text.secondary }} />
                  </RefreshDataIconButton>
                </Tooltip>
              </Box>

              {/* Theme  */}
              <Box>
                <Tooltip title="Theme Toggle" arrow>
                  <IconButton  onClick={() => { let themeMode = theme == "dark" ? "light" : "dark"; dispatch({ type: "THEME", payload: themeMode }); localStorage.setItem("theme", themeMode); }}>
                    {theme == "light" ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
                  </IconButton>
                </Tooltip>
              </Box>

              {/* User Panel  */}
              <Box>
                <Link href={"/"}>
                  <Tooltip title="Go To User Panel" arrow >
                    <IconButton color="inherit">
                      <ArrowForwardIcon color='text.secondary' sx={{ strokeWidth: 1, stroke: currentTheme.palette.text.secondary }} fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Link>
              </Box>

            </Stack>

          </Toolbar>
        </AppBar>

        <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
          <Drawer container={container} variant="temporary" open={mobileOpen} onClose={handleDrawerClose} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }, zIndex: 7001 }}><Navigation handleDrawerClose={handleDrawerClose} /></Drawer>
          <Drawer variant="permanent" sx={{ display: { xs: 'none', md: 'block' }, '& .MuiDrawer-paper': { overflow: "hidden", ["&:hover"]: { overflowY: "scroll", paddingRight: "0px !important" }, boxSizing: 'border-box', width: drawerWidth, paddingRight: "10px !important" } }} open ><Navigation handleDrawerClose={handleDrawerClose} /></Drawer>
        </Box>

        <Box component="main" sx={{ flexGrow: 1, p: { xs: 1, md: 1.5 }, width: { md: `calc(100% - ${drawerWidth}px)` } }}>
          <Toolbar />

          <Collapse in={fullScreen}>
            <Toolbar variant="dense" sx={{ paddingX: "8px !important", background: currentTheme.palette.background.paper, mb: { xs: 1.5, md: 2.5 }, borderRadius: `${currentTheme.shape.borderRadius}px` }}>

              <Stack spacing={1} direction="row" alignItems="center">

                {/* Back  */}
                <Tooltip title="Back" arrow>
                  <IconButton size="small" onClick={() => { router.back() }} color="inherit">
                    <ArrowBackIcon sx={{ strokeWidth: 1, stroke: (theme) => { return theme.palette.text.primary } }} fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Typography variant="subtitle1">{Title}</Typography>

              </Stack>

            </Toolbar>
          </Collapse>

          {children}
        </Box>

      </Box>
    </>
  )
}

export default Index