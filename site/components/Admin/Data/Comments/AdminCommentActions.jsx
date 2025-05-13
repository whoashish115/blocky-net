import * as React from "react";
import moment from "moment"

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DataContext } from "../../../../store/GlobalState"

import Box from "@mui/material/Box"
import Tooltip from "@mui/material/Tooltip"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import Avatar from "@mui/material/Avatar"
import IconButton from "@mui/material/IconButton"
import Badge from "@mui/material/Badge"

import AddOutlined from "@mui/icons-material/AddOutlined"
import CommentOutlined from "@mui/icons-material/CommentOutlined"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import NorthEastIcon from '@mui/icons-material/NorthEast';

import Link from 'next/link'
import millify from "millify";
import Image from 'next/image'
import { useRouter } from "next/router"
import { useTheme } from "@emotion/react";
import { DeleteData, EditData } from "../../../../utils/dataTools";
import { deleteData, patchData } from "../../../../utils/fetchData";


const AdminCommentActions = ({ comment, allComments, setAllComments, seeReply, handleReply }) => {
    const theme = useTheme()
    const router = useRouter()
    const { state, dispatch } = React.useContext(DataContext)
    const { auth } = state

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event) => { setAnchorEl(event.currentTarget) }
    const handleMenuClose = () => { setAnchorEl(null) }

    const [likeDislikeLoading, setLikeDislikeLoading] = React.useState(false)
    const [isLike, setIsLike] = React.useState(false)
    const [isDislike, setIsDislike] = React.useState(false)

    const [isHeart, setIsHeart] = React.useState(false)
    const [heartLoad, setHeartLoad] = React.useState(false)

    const likeComment = async () => {
        const newComment = { ...comment, likes: [...comment.likes, auth.user], dislikes: DeleteData(comment.dislikes, auth.user._id), blog: comment.blog }
        const newComments = EditData(allComments, comment._id, newComment)
        setAllComments(newComments)
        try {
            await patchData(`comment/actions/${comment._id}/like`, null, auth.token)
        } catch (err) {
            dispatch({ type: "NOTIFY", payload: { error: err.response.data.msg } })
        }
    }
    const removeLikeComment = async () => {
        const newComment = { ...comment, likes: DeleteData(comment.likes, auth.user._id) }
        const newComments = EditData(allComments, comment._id, newComment)
        setAllComments(newComments)
        try {
            await patchData(`comment/actions/${comment._id}/removelike`, null, auth.token)
        } catch (err) {
            dispatch({ type: "NOTIFY", payload: { error: err.response.data.msg } })
        }
    }
    const dislikeComment = async () => {
        const newComment = { ...comment, dislikes: [...comment.dislikes, auth.user], likes: DeleteData(comment.likes, auth.user._id) }
        const newComments = EditData(allComments, comment._id, newComment)
        setAllComments(newComments)
        try {
            await patchData(`comment/actions/${comment._id}/dislike`, null, auth.token)
        } catch (err) {
            dispatch({ type: "NOTIFY", payload: { error: err.response.data.msg } })
        }
    }
    const removeDislikeComment = async () => {
        const newComment = { ...comment, dislikes: DeleteData(comment.dislikes, auth.user._id) }
        const newComments = EditData(allComments, comment._id, newComment)
        setAllComments(newComments)
        try {
            await patchData(`comment/actions/${comment._id}/removedislike`, null, auth.token)
        } catch (err) {
            dispatch({ type: "NOTIFY", payload: { error: err.response.data.msg } })
        }
    }
    const heartComment = async () => {
        const newComment = { ...comment, heart: true, heartUser: auth.user }
        const newComments = EditData(allComments, comment._id, newComment)
        setAllComments(newComments)
        try {
            const res = await patchData(`admin/comment/actions/${comment._id}/heart`, null, auth.token)
            if (res.err) dispatch({ type: "NOTIFY", payload: { error: res.err } })
        } catch (err) {
            dispatch({ type: "NOTIFY", payload: { error: err.response.data.msg } })
        }
    }
    const removeHeartComment = async () => {
        if (comment.heartUser.root && !auth.user.root) { return dispatch({ type: "NOTIFY", payload: { error: "You Cannot OverWrite Heart Given By Root Admin" } }) }
        const newComment = { ...comment, heart: false, heartUser: {} }
        const newComments = EditData(allComments, comment._id, newComment)
        setAllComments(newComments)
        const res = await patchData(`admin/comment/actions/${comment._id}/removeHeart`, null, auth.token)
        if (res.err) dispatch({ type: "NOTIFY", payload: { error: res.err } })
    }
    const handleRemoveComment = async () => {
        if (auth.user.role == "admin") {
            const deleteArr = [...allComments.filter(cm => cm.reply === comment._id), comment]
            setAllComments(allComments.filter(cm => !deleteArr.find(da => cm._id === da._id)))
            deleteArr.forEach(item => { deleteData(`admin/comment/actions/${item._id}/delete`, auth.token) })
        }
    }

    // ---------------------- Like Comment ---------------------------- 
    React.useEffect(() => {
        if (comment.likes.find(like => like._id === auth.user._id)) {
            setIsLike(true)
        } else {
            setIsLike(false)
        }
    }, [auth, comment])
    const handleLikeComment = async () => {
        if (likeDislikeLoading) return;
        setLikeDislikeLoading(true)

        if (isDislike) removeDislikeComment()
        likeComment()

        setLikeDislikeLoading(false)
    }
    const handleRemoveLikeComment = async () => {
        if (likeDislikeLoading) return;
        setLikeDislikeLoading(true)

        removeLikeComment()

        setLikeDislikeLoading(false)
    }

    // ---------------------- Dislike Comment ---------------------------- 
    React.useEffect(() => {
        if (comment.dislikes.find(dislike => dislike._id === auth.user._id)) {
            setIsDislike(true)
        } else {
            setIsDislike(false)
        }
    }, [auth, comment])
    const handleDislikeComment = async () => {
        if (likeDislikeLoading) return;
        setLikeDislikeLoading(true)

        if (isLike) removeLikeComment()
        dislikeComment()

        setLikeDislikeLoading(false)
    }
    const handleRemoveDislikeComment = async () => {
        if (likeDislikeLoading) return;
        setLikeDislikeLoading(true)

        removeDislikeComment()

        setLikeDislikeLoading(false)
    }

    // ---------------------- Heart Comment ---------------------------- 
    React.useEffect(() => {
        if (comment.heart) {
            setIsHeart(true)
        } else {
            setIsHeart(false)
        }
    }, [auth, comment])
    const handleHeartComment = async () => {
        if (heartLoad) return;
        setHeartLoad(true)
        heartComment()
        setHeartLoad(false)
    }
    const handleRemoveHeartComment = async () => {
        if (heartLoad) return;
        setHeartLoad(true)
        removeHeartComment()
        setHeartLoad(false)
    }


    return (
        <>
            <Stack direction="row" spacing={2} sx={{ width: "100%", marginTop: 0.5 }}>

                <Box display='flex' justifyContent={"center"} alignItems='center'>
                    <Tooltip arrow title="UpVote">
                        {isLike ?
                            <IconButton size="small" onClick={handleRemoveLikeComment}>
                                <ThumbUpIcon sx={{ width: 17.5, height: 17.5 }} fontSize="small" />
                            </IconButton> :
                            <IconButton size="small" onClick={handleLikeComment}>
                                <ThumbUpOutlinedIcon sx={{ width: 17.5, height: 17.5 }} fontSize="small" />
                            </IconButton>}
                    </Tooltip>
                    <Typography sx={{ ml: 0.5 }} variant="body2">{millify(comment.likes.length)}</Typography>
                </Box>

                <Box display='flex' justifyContent={"center"} alignItems='center'>
                    <Tooltip arrow title="DownVote">
                        {isDislike ?
                            <IconButton size="small" onClick={handleRemoveDislikeComment}>
                                <ThumbDownIcon sx={{ width: 17.5, height: 17.5 }} fontSize="small" />
                            </IconButton> :
                            <IconButton size="small" onClick={handleDislikeComment}>
                                <ThumbDownOutlinedIcon sx={{ width: 17.5, height: 17.5 }} fontSize="small" />
                            </IconButton>}
                    </Tooltip>
                    <Typography sx={{ ml: 0.5 }} variant="body2">{millify(comment.dislikes.length)}</Typography>
                </Box>

                {seeReply && <Box display='flex' justifyContent={"center"} alignItems='center'>
                    {seeReply}
                </Box>}

                <Box display='flex' justifyContent={"center"} alignItems='center'>
                    <Tooltip arrow title="See Replies">
                        <IconButton onClick={handleReply} size="small" >
                            <ReplyOutlinedIcon sx={{ width: 17.5, height: 17.5 }} fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>

                <Box display='flex' justifyContent={"center"} alignItems='center'>
                    <Tooltip arrow title="Heart">
                        {isHeart ?
                            <IconButton size="small" onClick={handleRemoveHeartComment}>
                                <Badge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} badgeContent={<FavoriteIcon sx={{ width: 15, height: 15 }} color="error" fontSize="small" />}>
                                    <Avatar sx={{ width: 20, height: 20 }} alt={comment.heartUser.avatar} src={comment.heartUser.avatar} />
                                </Badge>
                            </IconButton> :
                            <IconButton size="small" onClick={handleHeartComment}>
                                <FavoriteBorderIcon sx={{ width: 17.5, height: 17.5 }} fontSize="small" />
                            </IconButton>
                        }
                    </Tooltip>
                </Box>

                <Box display='flex' justifyContent={"center"} alignItems='center'>
                    <Tooltip arrow title="Action Menu">
                        <IconButton size="small" onClick={handleMenuClick} >
                            <MoreVertIcon sx={{ width: 17.5, height: 17.5 }} fontSize="small" />
                        </IconButton>
                    </Tooltip>

                    <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose} onClick={handleMenuClose} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} >
                        <MenuItem onClick={handleRemoveComment}>
                            <ListItemIcon>
                                <DeleteOutlineIcon fontSize="small" />
                            </ListItemIcon>
                            Delete
                        </MenuItem>
                    </Menu>
                </Box>

            </Stack>
        </>
    )
}

export default AdminCommentActions