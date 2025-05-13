import * as React from "react";

import { DataContext } from "../../../../../store/GlobalState"

import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Chip from "@mui/material/Chip"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"


import KeyboardArrowDownOutlined from '@mui/icons-material/KeyboardArrowDownOutlined';

import AdminNoData from "../../../../smallComponents/AdminNoData";
import AdminCommentDisplay from "../AdminCommentDisplay";
import { useRouter } from "next/router";

const BlogComments = () => {
    const { state } = React.useContext(DataContext)
    const { blogs } = state
    const router = useRouter()
    const { slug } = router.query

    const [allComments, setAllComments] = React.useState([])
    const [comments, setComments] = React.useState([])
    const [showComments, setShowComments] = React.useState([])
    const initialNext = 10
    const nextLoad = 10
    const [next, setNext] = React.useState(initialNext)
    const [replyComments, setReplyComments] = React.useState([])

    React.useEffect(() => {
        var allCm = []
        blogs.filter(blog => blog.slug == slug).forEach((blog) => {
            blog.comments.forEach((comment) => {
                allCm.push({ ...comment, id: comment._id, blog: { title: blog.title, thumbnail: blog.thumbnail, _id: blog._id, categories: blog.categories, slug: blog.slug } })
            });
        });
        setAllComments(allCm)
    }, [blogs])

    React.useEffect(() => {
        const newCm = allComments.filter(cm => !cm.reply)
        setComments(newCm)
        setShowComments(newCm.slice(0, next))
    }, [allComments, next])

    React.useEffect(() => {
        const newReplyCm = allComments.filter(cm => cm.reply)
        setReplyComments(newReplyCm)
    }, [allComments])

    return (
        <>
            <Box sx={{ height: "auto", width: '100%', maxWidth: "95vw" }}>
                <Box>
                    <Divider sx={{ p: 0 }} />
                    <Toolbar variant="dense" sx={{ paddingX: "8px !important" }}>
                        <Typography>Comments {" ( " + comments.length + " ) "}</Typography>

                    </Toolbar>
                    <Divider sx={{ p: 0 }} />
                </Box>

                <Stack>
                    {showComments.map(comment => (<Box key={comment._id}><AdminCommentDisplay comment={comment} allComments={allComments} setAllComments={setAllComments} replyCm={replyComments.filter(item => item.reply === comment._id)} /></Box>))}
                </Stack>

                {comments.length - next > 0 &&
                    <Typography textAlign="center">
                        <IconButton size="small" onClick={() => setNext(next + nextLoad)} sx={{ marginTop: { xs: 1, md: 1.5 } }}>
                            <KeyboardArrowDownOutlined />
                        </IconButton>
                    </Typography>}
                {comments.length === 0 && <AdminNoData />}

            </Box>
        </>
    );
};

export default BlogComments;
