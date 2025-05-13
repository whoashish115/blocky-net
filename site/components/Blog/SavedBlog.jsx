import * as React from "react";

import { DataContext } from "../../store/GlobalState";
import Cookie from "js-cookie";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import Link from "next/link";
import { useRouter } from "next/router";


// Material UI Components 
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Tooltip from "@mui/material/Tooltip"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import MenuItem from "@mui/material/MenuItem"
import Menu from "@mui/material/Menu"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import Toolbar from "@mui/material/Toolbar"
import ListItemIcon from "@mui/material/ListItemIcon"
import MoreVertIcon from '@mui/icons-material/MoreVert';

import useMediaQuery from "@mui/material/useMediaQuery";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab"

// Material UI Icons 
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AdminPanelSettingsOutlined from "@mui/icons-material/AdminPanelSettingsOutlined"
import MenuIcon from "@mui/icons-material/Menu"
import BlogCard from "../smallComponents/BlogCard"
import { patchData } from "../../utils/fetchData";

const SavedBlog = () => {
  const router = useRouter()
  const { state, dispatch } = React.useContext(DataContext);
  const { auth } = state;

  const initialNext = 4
  const nextLoad = 4
  const [next, setNext] = React.useState(initialNext)
  const [savedBlog, setSavedBlog] = React.useState([])

  React.useEffect(() => {
    if (auth.user) {
      setSavedBlog(auth.user.saved.slice(0, next))
    }
  }, [auth.user, next])

  const unsaveBlog = async (id) => {
    const newUser = { ...auth.user, saved: auth.user.saved.filter(savedBlog => savedBlog._id !== id) }
    const newAuthPayload = { token: auth.token, user: newUser }
    dispatch({ type: "AUTH", payload: newAuthPayload });
    try {
      await patchData(`blog/actions/${id}/unsave`, null, auth.token)
    } catch (err) {
      dispatch({ type: "NOTIFY", payload: { error: err.response.data.msg } })
    }
  }

  // Menu
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const menuOpen = Boolean(menuAnchorEl);
  const handleMenuClick = (event) => { setMenuAnchorEl(event.currentTarget) };
  const handleMenuClose = () => { setMenuAnchorEl(null) };


  return (
    <>
      <Grid container spacing={{ xs: 1.5, md: 2.5 }}>
        <Grid item xs={12}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">My Saved</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={{ xs: 1, md: 1.5 }}>
            {savedBlog.length == 0 ? <Grid item xs={12}><Typography variant="subtitle2" textAlign="center">No Blog Posts</Typography></Grid> : savedBlog.map((blog) => (
              <Grid item xs={12} sm={4} md={3} l={2.4} key={blog._id}>
                <Box sx={{ position: "relative" }}>
                  <BlogCard blog={blog} />
                  <Box sx={{ position: "absolute", right: 10, top: 10 }}>
                    <Tooltip title="Actions" arrow>
                      <IconButton size="small" sx={{ background: "rgba(0,0,0,0.75)", ["&:hover"]: { background: "rgba(0,0,0,0.75)" } }} onClick={handleMenuClick}>
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Menu anchorEl={menuAnchorEl} open={menuOpen} sx={{ zIndex: 10000 }} onClose={handleMenuClose} onClick={handleMenuClose} transformOrigin={{ horizontal: 'right', vertical: 'top' }} PaperProps={{ sx: { ["&::before"]: { display: "none !important" } } }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} >
                    <MenuItem onClick={() => { unsaveBlog(blog._id) }}>
                      <ListItemIcon>
                        <BookmarkRemoveIcon fontSize="small" />
                      </ListItemIcon>
                      Remove from My Saved
                    </MenuItem>
                  </Menu>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

    </>
  )
}

export default SavedBlog