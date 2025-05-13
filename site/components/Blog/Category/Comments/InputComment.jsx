import React from 'react'
import { DataContext } from '../../../../store/GlobalState'

// Material UI Components 
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Collapse from "@mui/material/Collapse"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Chip from "@mui/material/Chip"
import { postData } from '../../../../utils/fetchData'
import { useRouter } from "next/router"


const InputComment = ({ blog, setBlog, onReply, setOnReply, handleCancelReply }) => {
    const [content, setContent] = React.useState("");
    const { state, dispatch } = React.useContext(DataContext);
    const { auth } = state;
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!content.trim()) { if (setOnReply) return setOnReply(false); return }
        setContent('')

        const newComment = { content, blogId: blog._id, reply: onReply && onReply.commentId, tag: onReply && onReply.user }
        const res = await postData("comment", newComment, auth.token);
        if (res.err) return dispatch({ type: "NOTIFY", payload: { error: res.err } });

        setBlog({ ...blog, comments: [res.comment, ...blog.comments] })
        if (setOnReply) return setOnReply(false);
    }

    return (
        <Box component="form" onSubmit={handleSubmit} >
            <Collapse in={Object.keys(auth).length !== 0}>
            {Object.keys(auth).length !== 0 ?
                <>
                    {/* For User Comment  */}
                    <Stack spacing={1} direction="row" sx={{ p: 1.5, borderRadius: 1, background: (theme) => { return theme.palette.background.default } }}>
                        <Avatar src={auth.user.avatar} sx={{ width: 35, height: 35 }} />
                        <TextField InputProps={{ startAdornment: (onReply ? <Chip label={"@" + onReply.user.name} variant="contained" sx={{ marginX: 1, marginBottom: 0.5 }} /> : "") }} maxRows={6} multiline fullWidth variant="standard" type="text" placeholder="Add Your Comment" value={content} onChange={e => setContent(e.target.value)} />
                        {!handleCancelReply && <Box><Button type="submit" disabled={!Boolean(content)} variant="contained" disableElevation>Comment</Button></Box>}
                    </Stack>

                    {/* For Reply Comment  */}
                    {handleCancelReply &&
                        <Stack spacing={1} direction="row" justifyContent="flex-end" sx={{ p: 1.5, pt: 0, borderRadius: 1, background: (theme) => { return theme.palette.background.default } }}>
                            <Box>
                                {handleCancelReply && <Button color="inherit" onClick={handleCancelReply} variant="contained" disableElevation>Cancel</Button>}
                            </Box>
                            <Box>
                                <Button type="submit" disabled={!Boolean(content)} variant="contained" disableElevation>Comment</Button>
                            </Box>
                        </Stack>}
                </> : ""}
                            </Collapse>
        </Box>
    )
}

export default InputComment