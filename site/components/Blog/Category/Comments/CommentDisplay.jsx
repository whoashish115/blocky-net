import React, { useState, useEffect } from 'react'
import CommentCard from './CommentCard'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Collapse from '@mui/material/Collapse'
import Tooltip from '@mui/material/Tooltip'
import millify from "millify";

import ArrowUpward from '@mui/icons-material/ArrowUpward'
import ArrowDownward from '@mui/icons-material/ArrowDownward'

const CommentDisplay = ({ comment, blog, setBlog, replyCm }) => {
    const [showRep, setShowRep] = useState([])
    const initialNext = 3
    const nextLoad = 3
    const [isSeeReply, setIsSeeReply] = useState(false)
    const [next, setNext] = useState(initialNext)

    useEffect(() => {
        setShowRep(replyCm.slice(0, next))
    }, [replyCm, next])

    return (
        <Box>
            <CommentCard comment={comment} blog={blog} setBlog={setBlog} commentId={comment._id} isSeeReply={isSeeReply} replyCm={replyCm} seeReplyNext={next} seeReplySetNext={setNext} seeReplyNextLoad={nextLoad}
                seeReply={replyCm.length !== 0 &&
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <Tooltip title="View Replies">
                            <IconButton onClick={() => { if (!isSeeReply) { setIsSeeReply(true) } else { setIsSeeReply(false); setNext(initialNext) } }}>
                                {isSeeReply ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
                            </IconButton>
                        </Tooltip>
                        <Typography variant='subtitle2' sx={{ paddingLeft: 0.5 }} >
                            {millify(replyCm.length)}
                        </Typography>
                    </Box>
                }>
                <Collapse in={isSeeReply && showRep.length !== 0}>
                    <Box sx={{ marginTop: 1 }}>
                        {showRep.map((item, index) => (
                            item.reply &&
                            <Box sx={{ marginTop: 1 }} key={index}>
                                <CommentCard comment={item} blog={blog} setBlog={setBlog} commentId={comment._id} />
                            </Box>
                        ))}
                    </Box>
                </Collapse>
            </CommentCard >
        </Box >
    )
}

export default CommentDisplay
