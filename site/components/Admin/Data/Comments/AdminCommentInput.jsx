import * as React from "react";

import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import Avatar from "@mui/material/Avatar"

import { postData } from "../../../../utils/fetchData";
import {useRouter} from "next/router"

const AdminCommentInput = ({ comment, allComments, setOnReply,handleReply, setAllComments, auth, onReply }) => {
    const [content, setContent] = React.useState("");
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!content.trim()) { if (setOnReply) return setOnReply(false) }
        setContent('')

        const newComment = { content, blogId: comment.blog._id, reply: onReply && onReply.commentId, tag: onReply && onReply.user }
        const res = await postData("comment", newComment, auth.token);
        if (res.err) return dispatch({ type: "NOTIFY", payload: { error: res.err } });

        setAllComments([{...res.comment,blog:comment.blog}, ...allComments])
        if (setOnReply) return setOnReply(false);
    }

    return (
        <>
            <Box component="form" onSubmit={handleSubmit} >
                <Stack spacing={1} direction="row" sx={{ paddingY:2,paddingX:1,background: (theme) => { return theme.palette.background.default } }}>
                    <Avatar src={auth.user.avatar} />
                    <TextField InputProps={{ startAdornment: (onReply ? <Chip label={"@" + onReply.user.name} variant="contained" sx={{ marginRight: 1, marginBottom: 0.5 }} /> : "") }} maxRows={6} multiline fullWidth variant="standard" type="text" placeholder="Add Your Comment" value={content} onChange={e => setContent(e.target.value)} />
                </Stack>

                <Stack spacing={1} direction="row" justifyContent="flex-end" sx={{ p: 1.5, pt: 0, borderRadius: 1, background: (theme) => { return theme.palette.background.default } }}>
                    <Box>
                        <Button color="inherit" onClick={handleReply} variant="contained" disableElevation>Cancel</Button>
                    </Box>
                    <Box>
                        <Button type="submit" disabled={!Boolean(content)} variant="contained" disableElevation>Comment</Button>
                    </Box>
                </Stack>
            </Box>
        </>
    )
}

export default AdminCommentInput