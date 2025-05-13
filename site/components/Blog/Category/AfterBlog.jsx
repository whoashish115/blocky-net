import React from 'react'

import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"

import { styled } from '@mui/system'
import Link from "next/link"

import moment from "moment"
import readingTime from 'reading-time'
import { convert } from 'html-to-text'

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';



const AfterBlog = ({ prevBlog, nextBlog }) => {

    const BlogPost = styled(Box)(({ theme, url }) => ({
        height: '216px',
        display: "flex",
        position: "relative",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        flexDirection: "column",
        padding: 12,
        margin: "auto",
        cursor: "pointer",
        background: `linear-gradient(180deg, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.8) 90%) , url(${url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        borderRadius: `${theme.shape.borderRadius}px`,
        ["&:hover"]: {
            background: `linear-gradient(180deg, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.7) 90%) , url(${url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        },
        ["&:hover .MuiIconButton-root"]: {
            background: theme.palette.secondary.main,
            paddingRight: 14,
            paddingLeft: 14,
        }
    }));
    const BlogPostIconButton = styled(IconButton)(({ theme, isprevicon }) => ({
        position: "absolute",
        top: 8,
        left: isprevicon ? 8 : "auto",
        right: isprevicon ? "auto" : 8,
        background: theme.palette.secondary.main,
        color: "#fff",
        transition: "0.5s",
        ["&:hover"]: {
            background: theme.palette.secondary.main,
        }
    }));

    return (
        (prevBlog && prevBlog._id || nextBlog && nextBlog._id) ? <Grid item xs={12} >
            <Paper sx={{ p: { xs: 1, sm: 1.5 } }}>
                <Box>
                    <Grid container spacing={{ xs: 1, md: 1.5 }}>

                        {prevBlog && prevBlog._id ?
                            <Grid item xs={12} md={prevBlog && nextBlog && prevBlog._id && nextBlog._id ? 6 : 12}>
                                <Link href={`/blog/${prevBlog.categories[0].name}/${prevBlog.slug}`}>
                                    <BlogPost url={prevBlog.thumbnail}>
                                        <Typography color='white' variant="h6">{prevBlog.title}</Typography>
                                        <Typography color='white' gutterBottom variant="body2" >{prevBlog.description.length > 100 ? prevBlog.description.slice(0, 100) + "..." : prevBlog.description}</Typography>

                                        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginLeft: "auto" }}>

                                            <Box display="flex" sx={{ pl: 1 }} justifyContent={"center"} alignItems="center">
                                                <CalendarTodayIcon sx={{ fontSize: "1rem" }} fontSize="small" />
                                                <Typography sx={{ pl: 0.5, pt: 0.25 }} variant="caption" >
                                                    {moment(prevBlog.createdAt).format("DD MMM YYYY")}
                                                </Typography>
                                            </Box>


                                            <Box display="flex" sx={{ pl: 1 }} justifyContent={"center"} alignItems="center">
                                                <AccessTimeIcon sx={{ fontSize: "1rem" }} fontSize="small" />
                                                <Typography sx={{ pl: 0.5, pt: 0.25 }} variant="caption">
                                                    {readingTime(convert(prevBlog.htmlContent)).text}
                                                </Typography>
                                            </Box>

                                        </Box>

                                        <BlogPostIconButton disableRipple isprevicon={"true"} color='primary'><ArrowBackIcon fontSize="small" /></BlogPostIconButton>
                                    </BlogPost>
                                </Link>
                            </Grid>
                            : ""}

                        {nextBlog && nextBlog._id ?
                            <Grid item xs={12} md={prevBlog && nextBlog && prevBlog._id && nextBlog._id ? 6 : 12}>
                                <Link href={`/blog/${nextBlog.categories[0].name}/${nextBlog.slug}`}>
                                    <BlogPost url={nextBlog.thumbnail}>
                                        <Typography color='white'variant="h6">{nextBlog.title}</Typography>
                                        <Typography color='white' gutterBottom variant="body2" >{nextBlog.description.length > 100 ? nextBlog.description.slice(0, 100) + "..." : nextBlog.description}</Typography>

                                        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginLeft: "auto" }}>

                                            <Box display="flex" sx={{ pl: 1 }} justifyContent={"center"} alignItems="center">
                                                <CalendarTodayIcon sx={{ fontSize: "1rem" }} fontSize="small" />
                                                <Typography sx={{ pl: 0.5, pt: 0.25 }} variant="caption">
                                                    {moment(nextBlog.createdAt).format("DD MMM YYYY")}
                                                </Typography>
                                            </Box>

                                            <Box display="flex" sx={{ pl: 1 }} justifyContent={"center"} alignItems="center">
                                                <AccessTimeIcon sx={{ fontSize: "1rem" }} fontSize="small" />
                                                <Typography sx={{ pl: 0.5, pt: 0.25 }} variant="caption">
                                                    {readingTime(convert(nextBlog.htmlContent)).text}
                                                </Typography>
                                            </Box>

                                        </Box>

                                        <BlogPostIconButton disableRipple color='primary'><ArrowForwardIcon fontSize="small" /></BlogPostIconButton>
                                    </BlogPost>
                                </Link>
                            </Grid> : ""}

                    </Grid>
                </Box>
            </Paper>
        </Grid> : ""
    )
}

export default AfterBlog