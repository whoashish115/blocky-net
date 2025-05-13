import React, { useState, useEffect } from "react";
import AdminCommentCard from "./AdminCommentCard";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Collapse from "@mui/material/Collapse";
import millify from "millify";


import ArrowUpward from "@mui/icons-material/ArrowUpward";
import ArrowDownward from "@mui/icons-material/ArrowDownward";

const CommentDisplay = ({ comment, allComments, setAllComments, replyCm }) => {
    const [showRep, setShowRep] = useState([]);
    const initialNext = 3;
    const nextLoad = 3;
    const [isSeeReply, setIsSeeReply] = useState(false);
    const [next, setNext] = useState(initialNext);

    useEffect(() => {
        setShowRep(replyCm.slice(0, next));
    }, [replyCm, next]);

    return (
        <Box>
            <AdminCommentCard
                comment={comment}
                commentId={comment._id}
                allComments={allComments}
                setAllComments={setAllComments}
                isSeeReply={isSeeReply}
                replyCm={replyCm}
                seeReplyNext={next}
                seeReplySetNext={setNext}
                seeReplyNextLoad={nextLoad}
                seeReply={
                    replyCm.length !== 0 && (
                        <Box display="flex" alignItems="center" justifyContent="center">
                            <Tooltip title="View Replies">
                                <IconButton
                                    size="small"

                                    onClick={() => {
                                        if (!isSeeReply) {
                                            setIsSeeReply(true);
                                        } else {
                                            setIsSeeReply(false);
                                            setNext(initialNext);
                                        }
                                    }}
                                >
                                    {isSeeReply ? (
                                        <ArrowUpward sx={{ width: 17.5, height: 17.5 }} fontSize="small" />
                                    ) : (
                                        <ArrowDownward sx={{ width: 17.5, height: 17.5 }} fontSize="small" />
                                    )}
                                </IconButton>
                            </Tooltip>
                            <Typography variant="body2" sx={{ ml: 0.5 }}>
                                {millify(replyCm.length)}
                            </Typography>
                        </Box>
                    )
                }
            >
                <Collapse in={isSeeReply && showRep.length !== 0}>
                    {showRep.map(
                        (item, index) =>
                            item.reply && (
                                <Box key={index}>
                                    <AdminCommentCard comment={item} isSeeReply={isSeeReply} allComments={allComments} setAllComments={setAllComments} />
                                </Box>
                            )
                    )}
                </Collapse>
            </AdminCommentCard>
        </Box>
    );
};

export default CommentDisplay;
