import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import moment from 'moment'
import CommentMenu from './CommentMenu'
import InputComment from './InputComment'
import { EditData, DeleteData } from "../../../../utils/dataTools.js"
import { DataContext } from '../../../../store/GlobalState'
import millify from "millify";

// Material UI Components 
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Collapse from '@mui/material/Collapse'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'

// Material UI Icons 
import ThumbUp from '@mui/icons-material/ThumbUp'
import ThumbUpOutlined from '@mui/icons-material/ThumbUpOutlined'
import ThumbDown from '@mui/icons-material/ThumbDown'
import ThumbDownOutlined from '@mui/icons-material/ThumbDownOutlined'
import KeyboardArrowDownOutlined from '@mui/icons-material/KeyboardArrowDownOutlined'
import ReplyOutlined from '@mui/icons-material/ReplyOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { patchData } from '../../../../utils/fetchData'
import { Button } from '@mui/material'


const CommentCard = ({ children, comment, blog, commentId, seeReply, setBlog, seeReplyNext, replyCm, isSeeReply, seeReplySetNext, seeReplyNextLoad }) => {

    const { state, dispatch } = React.useContext(DataContext);
    const { auth } = state;
    const isAuthenticated = Object.keys(auth).length !== 0 ? true : false

    const [content, setContent] = useState('')
    const [readMore, setReadMore] = useState(false)
    const [onEdit, setOnEdit] = useState(false)

    const [likeDislikeLoading, setLikeDislikeLoading] = useState(false)
    const [isLike, setIsLike] = useState(false)
    const [isDislike, setIsDislike] = useState(false)

    const [onReply, setOnReply] = useState(false)

    // Small Actions  
    useEffect(() => {
        setContent(comment.content)
        setOnReply(false)
    }, [comment, auth.user])
    const handleUpdate = async () => {
        if (comment.content !== content) {
            const newComments = EditData(blog.comments, comment._id, { ...comment, content,edited:true })
            const newBlog = { ...blog, comments: newComments }
            setBlog(newBlog)
            setOnEdit(false)
            try {
                await patchData(`comment/actions/${comment._id}/update`, { content }, auth.token)
            } catch (err) {
                dispatch({ type: "NOTIFY", payload: { error: err.response.data.msg } })
            }
        } else {
            setOnEdit(false)
        }
    }
    const likeComment = async () => {
        const newComment = { ...comment, likes: [...comment.likes, auth.user], dislikes: DeleteData(comment.dislikes, auth.user._id) }
        const newComments = EditData(blog.comments, comment._id, newComment)
        const newBlog = { ...blog, comments: newComments }
        setBlog(newBlog)
        try {
            await patchData(`comment/actions/${comment._id}/like`, null, auth.token)
        } catch (err) {
            dispatch({ type: "NOTIFY", payload: { error: err.response.data.msg } })
        }
    }
    const removeLikeComment = async () => {
        const newComment = { ...comment, likes: DeleteData(comment.likes, auth.user._id) }
        const newComments = EditData(blog.comments, comment._id, newComment)
        const newBlog = { ...blog, comments: newComments }
        setBlog(newBlog)
        try {
            await patchData(`comment/actions/${comment._id}/removelike`, null, auth.token)
        } catch (err) {
            dispatch({ type: "NOTIFY", payload: { error: err.response.data.msg } })
        }
    }
    const dislikeComment = async () => {
        const newComment = { ...comment, dislikes: [...comment.dislikes, auth.user], likes: DeleteData(comment.likes, auth.user._id) }
        const newComments = EditData(blog.comments, comment._id, newComment)
        const newBlog = { ...blog, comments: newComments }
        setBlog(newBlog)
        try {
            await patchData(`comment/actions/${comment._id}/dislike`, null, auth.token)
        } catch (err) {
            dispatch({ type: "NOTIFY", payload: { error: err.response.data.msg } })
        }
    }
    const removeDislikeComment = async () => {
        const newComment = { ...comment, dislikes: DeleteData(comment.dislikes, auth.user._id) }
        const newComments = EditData(blog.comments, comment._id, newComment)
        const newBlog = { ...blog, comments: newComments }
        setBlog(newBlog)
        try {
            await patchData(`comment/actions/${comment._id}/removedislike`, null, auth.token)
        } catch (err) {
            dispatch({ type: "NOTIFY", payload: { error: err.response.data.msg } })
        }
    }
    const handleSignIn = () => {
        dispatch({ type: "NOTIFY", payload: { error: "Sign In Required" } })
    }


    // ---------------------- Like Comment ---------------------------- 
    React.useEffect(() => {
        if (isAuthenticated) {
            if (comment.likes.find(like => like._id === auth.user._id)) {
                setIsLike(true)
            } else {
                setIsLike(false)
            }
        }
    }, [auth, comment])
    const handleLikeComment = async () => {
        if (isAuthenticated) {
            if (likeDislikeLoading) return;
            setLikeDislikeLoading(true)

            if (isDislike) removeDislikeComment()
            likeComment()

            setLikeDislikeLoading(false)
        } else handleSignIn()
    }
    const handleRemoveLikeComment = async () => {
        if (isAuthenticated) {
            if (likeDislikeLoading) return;
            setLikeDislikeLoading(true)

            removeLikeComment()

            setLikeDislikeLoading(false)
        } else handleSignIn()
    }

    // ---------------------- Dislike Comment ---------------------------- 
    React.useEffect(() => {
        if (isAuthenticated) {
            if (comment.dislikes.find(dislike => dislike._id === auth.user._id)) {
                setIsDislike(true)
            } else {
                setIsDislike(false)
            }
        }
    }, [auth, comment])
    const handleDislikeComment = async () => {
        if (isAuthenticated) {
            if (likeDislikeLoading) return;
            setLikeDislikeLoading(true)

            if (isLike) removeLikeComment()
            dislikeComment()

            setLikeDislikeLoading(false)
        } else handleSignIn()
    }
    const handleRemoveDislikeComment = async () => {
        if (isAuthenticated) {
            if (likeDislikeLoading) return;
            setLikeDislikeLoading(true)

            removeDislikeComment()

            setLikeDislikeLoading(false)
        } else handleSignIn()
    }

    // ---------------------- Reply Comment ---------------------------- 
    const handleReply = () => {
        if (isAuthenticated) {
            if (onReply) {
                return setOnReply(false)
            }
            setOnReply({ ...comment, commentId })
        } else handleSignIn()
    }


    return (
        <Box sx={{ marginTop: comment.reply ? { xs: 1, md: 1.5 } : 0 }}>
            <Box sx={{ paddingLeft: comment.reply ? { xs: 4, sm: 8, md: 12, lg: 16 } : 0 }}>
                <Paper sx={{ p: 1.5, borderRadius: 1, width: "100%", background: (theme) => { return theme.palette.background.default } }}>

                    {/* Comment User Info And Menu  */}
                    <Box display="flex" justifyContent='space-between' alignItems="center">

                        <Box display="flex" justifyContent='flex-start' alignItems="center">

                            <Link href={`/user/profile/${comment.user._id}`}>
                                <Avatar sx={{ cursor: "pointer" }} src={comment.user.avatar} />
                            </Link>

                            <Box pl={1} display="flex" justifyContent='flex-start' flexDirection="column" alignItems="center">
                                <Link href={`/user/profile/${comment.user._id}`}>
                                    <Typography sx={{ bgColor: "red", display: "inline", cursor: "pointer" }} variant="subtitle2" color="primary">
                                        {comment.user.name}
                                        <Typography color="text.secondary" variant="caption" sx={{ textTransform: "capitalize", pl: 0.5 }}>
                                            {" • " + moment(comment.createdAt).fromNow()}
                                            <Typography color="text.secondary" variant="caption" sx={{ textTransform: "lowercase", pl: 0.5 }}>
                                                {comment.edited && "(Edited)"}
                                            </Typography>
                                        </Typography>
                                    </Typography>
                                </Link>
                                <Typography color="text.secondary" variant="caption" sx={{ width: "100%", textTransform: "capitalize" }}>{moment(comment.createdAt).format("DD MMM YYYY")}</Typography>
                            </Box>

                        </Box>

                        <Box>
                            <CommentMenu blog={blog} setBlog={setBlog} comment={comment} setOnReply={setOnReply} setOnEdit={setOnEdit} />
                        </Box>

                    </Box>

                    {/* Comment Content */}
                    <Box p={1} pt={2}>
                        {onEdit ? <TextField maxRows={6} variant="standard" multiline fullWidth value={content} onChange={e => setContent(e.target.value)} />
                            : <Typography display='flex' color="text.primary" variant="body2" sx={{ width: "100%", textTransform: "capitalize", wordBreak: "break-word", display: "inline-block",mt:0.5  }}>
                                {comment.reply && comment.tag._id !== comment.user._id && <Chip label={"@" + comment.tag.name} variant="contained" sx={{ paddingY: 0.35, paddingX: 0, mr: 0.5, display: "inline" }} />}
                                {content.length < 300 ? content : readMore ? content + ' ' : content.slice(0, 300) + '...'}
                                {content.length > 300 && <Typography variant="subtitle2" sx={{ cursor: "pointer", display: "inline" }} onClick={() => setReadMore(!readMore)}>{readMore && 'Read more'}</Typography>}
                            </Typography>}
                    </Box>

                    {/* Comment Actions */}
                    <Box display="flex" justifyContent={onEdit ? "space-between" : "flex-start"} alignItems='center'>

                        <Stack spacing={2} direction="row">

                            {/* Like  */}
                            <Box display="flex" justifyContent="center" alignItems='center'>
                                <Tooltip title="UpVote" arrow>
                                    {isLike ?
                                        <IconButton onClick={handleRemoveLikeComment}>
                                            <ThumbUp fontSize="small" />
                                        </IconButton> :
                                        <IconButton onClick={handleLikeComment}>
                                            <ThumbUpOutlined fontSize="small" />
                                        </IconButton>}
                                </Tooltip>
                                <Typography pl={.5} variant="subtitle2" >
                                    {millify(comment.likes.length)}
                                </Typography>
                            </Box>

                            {/* Dislike  */}
                            <Box display="flex" justifyContent="center" alignItems='center'>
                                <Tooltip title="DownVote" arrow>
                                    {isDislike ?
                                        <IconButton onClick={handleRemoveDislikeComment}>
                                            <ThumbDown fontSize="small" />
                                        </IconButton> :
                                        <IconButton onClick={handleDislikeComment}>
                                            <ThumbDownOutlined fontSize="small" />
                                        </IconButton>}
                                </Tooltip>
                                <Typography pl={.5} variant="subtitle2" >
                                    {millify(comment.dislikes.length)}
                                </Typography>
                            </Box>

                            {/* Heart  */}
                            {comment.heart ?
                                <Box display='flex' justifyContent={"center"} alignItems='center'>
                                    <Tooltip arrow title={`Hearted By ${comment.heartUser.name}`}>
                                        <Badge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} badgeContent={<FavoriteIcon sx={{ width: 17.5, height: 17.5 }} color="error" fontSize="small" />}>
                                            <Avatar sx={{ width: 25, height: 25 }} alt={comment.heartUser.avatar} src={comment.heartUser.avatar} />
                                        </Badge>
                                    </Tooltip>
                                </Box> : ""
                            }

                            {/* Seeing Comments Reply  */}
                            {seeReply}

                        </Stack>

                        {/* Reply And Edit  */}
                        <Box ml={1}>
                            {onEdit
                                ? <Box display='flex' sx={{}}>
                                    <Button size="small" variant="contained" onClick={handleUpdate}>
                                        update
                                    </Button>
                                    <Button size="small" sx={{ marginLeft: 1 }} variant="contained" onClick={() => setOnEdit(false)}>
                                        cancel
                                    </Button>
                                </Box> :

                                <Typography variant="subtitle2"  >
                                    <Box display="flex" justifyContent="center" alignItems='center'>
                                        <Tooltip title="Reply" arrow>
                                            <IconButton color={onReply ? "primary" : "inherit"} onClick={handleReply}>
                                                <ReplyOutlined fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Typography color={onReply ? "primary" : "inherit"} p={.5} variant="subtitle2" >
                                            {millify(blog.comments.filter(item => item.reply === comment._id).length)}
                                        </Typography>
                                        <Typography color={onReply ? "primary" : "inherit"} p={.5} variant="subtitle2" >
                                            {blog.comments.filter(item => item.reply === comment._id).length > 1 ? <>Replies</> : <>Reply</>}
                                        </Typography>
                                    </Box>
                                </Typography>
                            }
                        </Box>

                    </Box>
                </Paper>
            </Box>

            <Collapse sx={{ paddingLeft: { xs: 4, sm: 8, md: 12, lg: 16 }, marginTop: { xs: 1, md: 1.5 } }} in={Boolean(onReply)} timeout="auto" unmountOnExit>
                <Box>
                    <InputComment blog={blog} setBlog={setBlog} onReply={onReply} setOnReply={setOnReply} handleCancelReply={handleReply} />
                </Box>
            </Collapse>

            {children}

            {seeReplyNextLoad && isSeeReply && replyCm.length - seeReplyNext > 0 &&
                <Box textAlign='center' sx={{ paddingLeft: { xs: 4, sm: 8, md: 12, lg: 16 } }}>
                    <IconButton sx={{ marginTop: { xs: 1, md: 1.5 } }} onClick={() => seeReplySetNext(seeReplyNext + seeReplyNextLoad)}>
                        <KeyboardArrowDownOutlined fontSize="small" />
                    </IconButton>
                </Box>}
        </Box >
    )
}

export default CommentCard
