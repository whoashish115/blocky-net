import * as React from "react";
import moment from "moment"

import { DataContext } from "../../../../store/GlobalState"

import Box from "@mui/material/Box"
import Tooltip from "@mui/material/Tooltip"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import Avatar from "@mui/material/Avatar"
import Card from "@mui/material/Card"
import Collapse from "@mui/material/Collapse"
import CardActionArea from "@mui/material/CardActionArea"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"

import NorthEastIcon from '@mui/icons-material/NorthEast';
import KeyboardArrowDownOutlined from '@mui/icons-material/KeyboardArrowDownOutlined'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from "next/router"
import { useTheme } from "@emotion/react";
import { postData } from "../../../../utils/fetchData";
import AdminCommentActions from "./AdminCommentActions"
import AdminCommentInput from "./AdminCommentInput";

const AdminCommentCard = (props) => {
    const theme = useTheme()
    const router = useRouter()
    const { state } = React.useContext(DataContext)
    const { auth } = state

    const { children, comment, commentId, allComments, setAllComments, replyCm,isSeeReply ,seeReplyNext, seeReplySetNext, seeReplyNextLoad, seeReply } = props

    const [content, setContent] = React.useState('')
    const [readMore, setReadMore] = React.useState(false)
    const [onReply, setOnReply] = React.useState(false)

    React.useEffect(() => {
        setContent(comment.content)
        setOnReply(false)
    }, [comment, auth.user])

    // ---------------------- Reply Comment ---------------------------- 
    const handleReply = () => {
        if (onReply) {
            return setOnReply(false)
        }
        setOnReply({ ...comment, commentId })
    }



    return (
        <>
            <Box {...props} sx={{ height: "auto", width: '100%', maxWidth: "95vw" }}>
                <Card sx={{ m: 0, borderRadius: 0, background: "transparent", ["&:hover #north-east-icon-1"]: { opacity: 1 } }}>
                    <Divider sx={{ padding: 0, paddingTop: 0, pl: !children ? { xs: 4, sm: 8, md: 12, lg: 16 } : 0 }} />
                    <CardActionArea disableRipple sx={{ paddingY: 1, paddingX: 0.5, pl: !children ? { xs: 4, sm: 8, md: 12, lg: 16 } : 0 }}>

                        <Box display="flex" justifyContent='space-between' alignItems="flex-start" sx={{ p: 1 }}>

                            <Box display="flex" flexGrow={1} justifyContent='flex-start' alignItems="flex-start">
                                    <Avatar sx={{ cursor: "pointer" }} src={comment.user.avatar} />
                                <Box pl={1} display="flex" justifyContent='flex-start' flexDirection="column" alignItems="center">
                                    <Box width="100%" >
                                            <Typography sx={{ display: "inline", cursor: "pointer" }} variant="subtitle2" color="primary">
                                                {comment.user.name}
                                                <Typography color="text.secondary" variant="caption" sx={{ textTransform: "capitalize", pl: 0.5, marginTop: 2 }}>
                                                    {" • " + moment(comment.createdAt).fromNow()}
                                                    <Typography color="text.secondary" variant="caption" sx={{ textTransform: "lowercase", pl: 0.5 }}>
                                                        {comment.edited && "(Edited)"}
                                                    </Typography>
                                                </Typography>
                                            </Typography>
                                    </Box>

                                    <Typography display='flex' color="text.primary" variant="body2" sx={{ width: "100%", textTransform: "capitalize", wordBreak: "break-word", display: "inline-block", mt: 0.5 }}>
                                        {comment.reply && comment.tag._id !== comment.user._id && <Chip label={"@" + comment.tag.name} variant="contained" sx={{ paddingY: 0.35, paddingX: 0, mr: 0.5, display: "inline" }} />}
                                        {content.length < 300 ? content : readMore ? content + ' ' : content.slice(0, 300) + '...'}
                                        {content.length > 300 && <Typography variant="subtitle2" sx={{ cursor: "pointer", display: "inline" }} onClick={() => setReadMore(!readMore)}>{readMore && 'Read more'}</Typography>}
                                    </Typography>

                                    <AdminCommentActions seeReply={seeReply} handleReply={handleReply} comment={comment} allComments={allComments} setAllComments={setAllComments} />

                                </Box>
                            </Box>

                            {children && !comment.reply && <Stack spacing={1} direction="row" sx={{ display: { xs: "none", md: "flex" } }}>
                                <Box sx={{ borderRadius: `${theme.shape.borderRadius}px`, overflow: 'hidden' }} display="flex" justifyContent="center" alignItems='center'>
                                    <Image src={comment.blog.thumbnail} alt={comment.blog.thumbnail} width={120} height={60}></Image>
                                </Box>
                                <Typography sx={{ width: 180 }} variant="subtitle2" >
                                    {comment.blog.title.length < 75 ? comment.blog.title : comment.blog.title.slice(0, 75) + "..."}
                                </Typography>
                                <Box>
                                    <Tooltip arrow title="View">
                                        <IconButton onClick={() => { router.push(`/blog/${comment.blog.categories[0].slug}/${comment.blog.slug}`) }} size="small">
                                            <NorthEastIcon id="north-east-icon-1" sx={{ width: 17.5, height: 17.5, opacity: 0, transition: "0.8s" }} fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Stack>}

                        </Box>
                    </CardActionArea>
                </Card>
            </Box>

            <Divider sx={{ p: 0 }} />

            <Collapse sx={{ paddingLeft: { xs: 4, sm: 8, md: 12, lg: 16 } }} in={Boolean(onReply)} timeout="auto" unmountOnExit>
                <AdminCommentInput auth={auth} handleReply={handleReply} onReply={onReply} comment={comment} allComments={allComments} setAllComments={setAllComments} setOnReply={setOnReply} />
            </Collapse>

            {children}

            {isSeeReply && seeReplyNextLoad && replyCm.length - seeReplyNext > 0 &&
                <Box textAlign='right'>
                    <IconButton sx={{ margin: { xs: 1, md: 1.5 } }} onClick={() => seeReplySetNext(seeReplyNext + seeReplyNextLoad)}>
                        <KeyboardArrowDownOutlined fontSize="small" />
                    </IconButton>
                </Box>}
        </>
    );
};

export default AdminCommentCard;
