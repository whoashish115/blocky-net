import React from 'react'

// Material UI Components 
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Tooltip from "@mui/material/Tooltip"
import Stack from "@mui/material/Stack"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import IconButton from "@mui/material/IconButton"

import { useRouter } from 'next/router'
import { DataContext } from "../../../store/GlobalState"
import ShareBlog from './ShareBlog'
// import SpeakBlog from './SpeakBlog'
import ReportBlog from './ReportBlog'

// Material UI Icons 
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import Bookmark from '@mui/icons-material/Bookmark';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { patchData } from '../../../utils/fetchData'
import { useTheme } from '@emotion/react'
import millify from "millify";
import { htmlToText } from 'html-to-text'


const BlogActions = ({ blog, setBlog }) => {
    const router = useRouter()
    const theme = useTheme()
    const { state, dispatch } = React.useContext(DataContext)
    const { auth } = state
    const isAuthenticated = Object.keys(auth).length !== 0 ? true : false

    const [likeDislikeLoading, setLikeDislikeLoading] = React.useState(false)
    const [isLike, setIsLike] = React.useState(false)
    const [isDislike, setIsDislike] = React.useState(false)

    const [isSaved, setIsSaved] = React.useState(false)
    const [savedLoad, setSavedLoad] = React.useState(false)

    const [actionMenuAnchorEl, setActionMenuAnchorEl] = React.useState(null);
    const ActionMenuOpen = Boolean(actionMenuAnchorEl);
    const handleMenuOpen = (event) => { setActionMenuAnchorEl(event.currentTarget) };
    const handleMenuClose = () => { setActionMenuAnchorEl(null) };

    const handleSignIn = () => {
        dispatch({type:"NOTIFY",payload:{error:"Sign In Required"}})

    }
    // Small Actions  
    const likeBlog = async () => {
        const newBlog = { ...blog, likes: [...blog.likes, auth.user], dislikes: blog.dislikes.filter(dislike => dislike._id !== auth.user._id) }
        setBlog(newBlog)
        try {
            await patchData(`blog/actions/${blog._id}/like`, null, auth.token)
        } catch (err) {
            dispatch({ type: "NOTIFY", payload: { error: err.response.data.msg } })
        }
    }
    const removeLikeBlog = async () => {
        const newBlog = { ...blog, likes: blog.likes.filter(like => like._id !== auth.user._id) }
        setBlog(newBlog)
        try {
            await patchData(`blog/actions/${blog._id}/removelike`, null, auth.token)
        } catch (err) {
            dispatch({ type: "NOTIFY", payload: { error: err.response.data.msg } })
        }
    }
    const dislikeBlog = async () => {
        const newBlog = { ...blog, dislikes: [...blog.dislikes, auth.user], likes: blog.likes.filter(like => like._id !== auth.user._id) }
        setBlog(newBlog)
        try {
            await patchData(`blog/actions/${blog._id}/dislike`, null, auth.token)
        } catch (err) {
            dispatch({ type: "NOTIFY", payload: { error: err.response.data.msg } })
        }

    }
    const removeDislikeBlog = async () => {
        const newBlog = { ...blog, dislikes: blog.dislikes.filter(dislike => dislike._id !== auth.user._id) }
        setBlog(newBlog)
        try {
            await patchData(`blog/actions/${blog._id}/removedislike`, null, auth.token)
        } catch (err) {
            dispatch({ type: "NOTIFY", payload: { error: err.response.data.msg } })
        }
    }
    const saveBlog = async () => {
        const newUser = { ...auth.user, saved: [...auth.user.saved, blog] }
        const newAuthPayload = { token: auth.token, user: newUser }
        dispatch({ type: "AUTH", payload: newAuthPayload });
        try {
            await patchData(`blog/actions/${blog._id}/save`, null, auth.token)
        } catch (err) {
            dispatch({ type: "NOTIFY", payload: { error: err.response.data.msg } })
        }
    }
    const unsaveBlog = async () => {
        const newUser = { ...auth.user, saved: auth.user.saved.filter(savedBlog => savedBlog._id !== blog._id) }
        const newAuthPayload = { token: auth.token, user: newUser }
        dispatch({ type: "AUTH", payload: newAuthPayload });
        try {
            await patchData(`blog/actions/${blog._id}/unsave`, null, auth.token)
        } catch (err) {
            dispatch({ type: "NOTIFY", payload: { error: err.response.data.msg } })
        }
    }

    // ---------------------- Like Blog ---------------------------- 
    React.useEffect(() => {
        if (isAuthenticated) {
            if (blog.likes.find(like => like._id === auth.user._id)) {
                setIsLike(true)
            } else {
                setIsLike(false)
            }
        }
    }, [auth, blog,isAuthenticated])

    const handleLikeBlog = async () => {
        if (isAuthenticated) {
            if (likeDislikeLoading) return;
            setLikeDislikeLoading(true)

            if (isDislike)  removeDislikeBlog() 
            likeBlog()

            setLikeDislikeLoading(false)
        }
        else handleSignIn()
    }
    const handleRemoveLikeBlog = async () => {
        if (isAuthenticated) {
            if (likeDislikeLoading) return;
            setLikeDislikeLoading(true)

            removeLikeBlog()

            setLikeDislikeLoading(false)
        }
        else handleSignIn()

    }

    // ---------------------- Dislike Blog ---------------------------- 
    React.useEffect(() => {
        if (isAuthenticated) {
            if (blog.dislikes.find(dislike => dislike._id === auth.user._id)) {
                setIsDislike(true)
            } else {
                setIsDislike(false)
            }
        }
    }, [auth, blog,isAuthenticated])

    const handleDislikeBlog = async () => {
        if (isAuthenticated) {
            if (likeDislikeLoading) return;
            setLikeDislikeLoading(true)

            if (isLike) removeLikeBlog()
            dislikeBlog()

            setLikeDislikeLoading(false)
        }
        else handleSignIn()
    }
    const handleRemoveDislikeBlog = async () => {
        if (isAuthenticated) {
            if (likeDislikeLoading) return;
            setLikeDislikeLoading(true)

            removeDislikeBlog()

            setLikeDislikeLoading(false)
        }
        else handleSignIn()

    }

    // ---------------------- Save Blog ---------------------------- 
    React.useEffect(() => {
        if (isAuthenticated) {
            if (auth.user.saved && auth.user.saved.find(id => id === blog._id)) {
                setIsSaved(true)
            } else {
                setIsSaved(false)
            }
        }
    }, [auth, blog,isAuthenticated])
    const handleSavePost = async () => {
        if (isAuthenticated) {
            if (savedLoad) return;
            setSavedLoad(true)
            saveBlog()
            setSavedLoad(false)
        }
        else handleSignIn()
    }
    const handleUnSavePost = async () => {
        if (isAuthenticated) {
            if (savedLoad) return;
            setSavedLoad(true)
            unsaveBlog()
            setSavedLoad(false)
        }
        else handleSignIn()
    }

    // ---------------------- Other Blog Actions ----------------------
    const handleReportOpen = async () => {
        await dispatch({ type: "REPORT_BLOG", payload: blog })
    }


    return (
        <Box display={"flex"} justifyContent="space-between" alignItems="center">

            <Stack spacing={{ xs: 0, md: 1 }} direction="row">

                {/* Like  Blog*/}
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Tooltip title="UpVote" arrow>
                        {isLike ?
                            <IconButton onClick={handleRemoveLikeBlog}>
                                <ThumbUpAltIcon fontSize="small" />
                            </IconButton>
                            : <IconButton onClick={handleLikeBlog}>
                                <ThumbUpOffAltIcon fontSize="small" />
                            </IconButton>}
                    </Tooltip>
                    <Typography sx={{ pl: { xs: 0, md: 0.5 } }} variant="subtitle2">{millify(blog.likes.length)}</Typography>
                </Box>

                {/* Dislike Blog */}
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Tooltip title="DownVote" arrow>
                        {isDislike ?
                            <IconButton onClick={handleRemoveDislikeBlog}>
                                <ThumbDownAltIcon fontSize="small" />
                            </IconButton>
                            : <IconButton onClick={handleDislikeBlog}>
                                <ThumbDownOffAltIcon fontSize="small" />
                            </IconButton>}
                    </Tooltip>
                    <Typography sx={{ pl: { xs: 0, md: 0.5 } }} variant="subtitle2">{millify(blog.dislikes.length)}</Typography>
                </Box>

            </Stack>

            <Stack spacing={{ xs: 0, md: 1 }} direction="row">

                {/* Share Blog  */}
                <ShareBlog url={`${process.env.NEXT_PUBLIC_BASE_URL + router.asPath}`} />

                {/* Speak Blog  */}
                {/* <SpeakBlog text={htmlToText(blog.htmlContent)} /> */}

                {/* Save Unsave Blog  */}
                <Box>
                    {isSaved ?
                        <Tooltip title="Saved" arrow>
                            <IconButton aria-label="save" onClick={handleUnSavePost}>
                                <Bookmark fontSize="small" />
                            </IconButton>
                        </Tooltip> :
                        <Tooltip title="Unsaved" arrow>
                            <IconButton aria-label="unsave" onClick={handleSavePost}>
                                <BookmarkAddOutlinedIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>}
                </Box>

                {/* Actions Menu Blog */}
                <Tooltip title="More" arrow>
                    <IconButton onClick={handleMenuOpen} aria-controls={ActionMenuOpen ? 'account-menu' : undefined} aria-haspopup="true" aria-expanded={ActionMenuOpen ? 'true' : undefined}>
                        <MoreHorizIcon fontSize="small" />
                    </IconButton>
                </Tooltip>

                <ReportBlog />

                <Menu
                    anchorEl={actionMenuAnchorEl}
                    open={ActionMenuOpen}
                    onClose={handleMenuClose}
                    onClick={handleMenuClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            background: theme.palette.background.paperSecondary,
                            mt: 1.5,
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                background: `${theme.palette.background.paperSecondary} !important`,
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={handleReportOpen}>
                        <ListItemIcon>
                            <FlagOutlinedIcon />
                        </ListItemIcon>
                        Report
                    </MenuItem>

                </Menu>

            </Stack>
        </Box>

    )
}

export default BlogActions