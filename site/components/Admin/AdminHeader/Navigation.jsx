import React from 'react'

import Link from "next/link"
import Image from 'next/image'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'

// Material UI Components 
import Box from "@mui/material/Box"
import CardActionArea from "@mui/material/CardActionArea"
import Card from "@mui/material/Card"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import Divider from "@mui/material/Divider"
import Avatar from "@mui/material/Avatar"
import List from "@mui/material/List"
import Tooltip from "@mui/material/Tooltip"
import ListSubheader from "@mui/material/ListSubheader"

// Material UI Icons 
import AdminPanelSettingsOutlined from "@mui/icons-material/AdminPanelSettingsOutlined"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import CategoryOutlined from "@mui/icons-material/CategoryOutlined"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ViewQuiltOutlined from "@mui/icons-material/ViewQuiltOutlined"
import Group from "@mui/icons-material/Group"
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LinkIcon from "@mui/icons-material/Link"
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import Class from "@mui/icons-material/Class"
import WebAssetIcon from '@mui/icons-material/WebAsset';
import PersonOutline from "@mui/icons-material/PersonOutline"
import LogoutIcon from '@mui/icons-material/Logout';

import { DataContext } from '../../../store/GlobalState'
import Cookies from 'js-cookie'
import EditProfile from '../../Layout/UserHeader/EditProfile'
import { useTheme } from '@emotion/react'



const Navigation = ({ handleDrawerClose }) => {
    const router = useRouter()
    const currentTheme = useTheme()
    const { state, dispatch } = React.useContext(DataContext)
    const { auth, theme } = state
    
    // Edit Profile
    const [editOpen, setEditOpen] = React.useState(false)

    // Menu
    const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
    const menuOpen = Boolean(menuAnchorEl);
    const handleMenuClick = (event) => { setMenuAnchorEl(event.currentTarget) };
    const handleMenuClose = () => { setMenuAnchorEl(null) };

    const navigationData = {
        quickMenu: {
            name: "Quick Menu",
            data: [
                {
                    name: "Dashboard",
                    icon: <AdminPanelSettingsOutlined />,
                    url: "/admin",
                },
                {
                    name: "Analytics",
                    icon: <AnalyticsOutlinedIcon />,
                    url: "/admin/analytics",
                },
            ]
        },
        data: {
            name: "Collections",
            data: [
                {
                    name: "Users",
                    icon: <Group />,
                    url: "/admin/data/users",
                },
                {
                    name: "Blog Posts",
                    icon: <ArticleOutlinedIcon />,
                    url: "/admin/data/blogs",
                },
                {
                    name: "Comments",
                    icon: <CommentOutlinedIcon />,
                    url: "/admin/data/comments",
                },
                {
                    name: "Categories",
                    icon: <CategoryOutlined />,
                    url: "/admin/data/categories",
                },
                {
                    name: "Pages",
                    icon: <ViewQuiltOutlined />,
                    url: "/admin/data/pages",
                },
                {
                    name: "Navigations",
                    icon: <LinkIcon />,
                    url: "/admin/data/navigations",
                },
                {
                    name: "Navigation Categories",
                    icon: <Class />,
                    url: "/admin/data/navigationCategories",
                },

            ]
        },
     
    }

    const handleLogout = () => {
        Cookies.remove("refreshtoken");
        localStorage.removeItem("firstLogin");
        dispatch({ type: "AUTH", payload: {} });
        dispatch({ type: "NOTIFY", payload: { success: "Logged out!" } });
        return router.push("/");
    };


    return (
        <>
            <Box p={1.5} pr={1}>

                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea disableRipple>
                        <Box ripple sx={{ position: "relative", background: theme == "dark" ? "#162118ff" : "#f0f0f0", borderRadius: "8px" }} p={1} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                            <Avatar src={auth.user.avatar} alt={auth.user.name} sx={{ width: 100, height: 100 }} />
                            <Typography sx={{ fontWeight: 600, ml: 1, mt: 1 }} variant="subtitle2">{`${auth.user.name}`}</Typography>
                            <Tooltip title="User Menu">
                                <IconButton size="small" onClick={handleMenuClick} aria-controls={menuOpen ? 'account-menu' : undefined} aria-haspopup="true" aria-expanded={menuOpen ? 'true' : undefined} sx={{ position: "absolute", right: 5, top: 5 }}  >
                                    <MoreVertIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </CardActionArea>
                </Card>

                {auth.user && <EditProfile editOpen={editOpen} setEditOpen={setEditOpen} />}

                <Menu anchorEl={menuAnchorEl} open={menuOpen} sx={{ zIndex: 10000 }} onClose={handleMenuClose} onClick={handleMenuClose} transformOrigin={{ horizontal: 'right', vertical: 'top' }} PaperProps={{ sx: { ["&::before"]: { display: "none !important" } } }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} >
                    <MenuItem onClick={() => navigator.clipboard.writeText(auth.user._id)}>
                        <ListItemIcon>
                            <ContentCopyIcon fontSize="small" />
                        </ListItemIcon>
                        Copy Your User ID
                    </MenuItem>
                    <MenuItem onClick={() => { handleMenuClose();handleDrawerClose(); setTimeout(() => {  setEditOpen(true)  }, 300);   }}>
                        <ListItemIcon>
                            <PersonOutline fontSize="small" />
                        </ListItemIcon>
                        Edit Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>

            </Box>
            <Box px={1}>
                {Object.keys(navigationData).map((key, index) => (
                    <div key={index}>
                        <List subheader={<ListSubheader disableSticky sx={{ userSelect: "none",color:currentTheme.palette.text.secondary }} color="inherit">{navigationData[key].name}</ListSubheader>}>
                            {navigationData[key].data.map(({ name, icon, url, as }, index) => {
                                return (<Link href={url} as={as && as} key={index}>
                                    <Button sx={{ backgroundColor: currentTheme.palette.mode == "dark" ? (as ? (router.asPath == as && 'rgba(255,255,255, 0.08)') : (router.pathname == url && 'rgba(255,255,255, 0.08)')) : (as ? (router.asPath == as && 'rgba(0,0,0, 0.08)') : (router.pathname == url && 'rgba(0,0,255, 0.08)')), marginTop: 0.5 ,color: as ? (router.asPath == as ? `${currentTheme.palette.primary.main} !important` :`${currentTheme.palette.text.primary} !important`) : (router.pathname == url ? `${currentTheme.palette.primary.main} !important`:`${currentTheme.palette.text.primary} !important`)}} onClick={handleDrawerClose} fullWidth color={as ? router.asPath == as ? "primary" : "inherit" : router.pathname == url ? "primary" : "inherit"} startIcon={icon}>
                                        <Box sx={{ flexGrow: 1 }}>{name}</Box>
                                    </Button>
                                </Link>)
                            })}
                        </List>
                    </div>
                ))}
            </Box>
        </>
    )
}

export default Navigation