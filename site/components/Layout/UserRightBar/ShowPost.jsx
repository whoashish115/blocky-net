import React from 'react'

// Material UI Components 
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import CardActionArea from "@mui/material/CardActionArea"
import Stack from "@mui/material/Stack"

// Material UI Icons 
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { useRouter } from 'next/router'
import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import Image from "next/image"
import Link from "next/link"
import readingTime from 'reading-time'
import { convert } from 'html-to-text'


const TrendingPost = ({ title, blogs }) => {
    const theme = useTheme()

    return (
        blogs && blogs.length > 0 ? <>
            <Grid item xs={12}>
                <Paper sx={{ p: { xs: 1, md: 1.5 }, wordWrap: "break-word" }}>

                    <Typography p={0.5} gutterBottom variant="subtitle1" sx={{ textTransform: "capitalize", borderRadius: `${theme.shape.borderRadius}px`, textAlign: "center", p: 1 }}>{title}</Typography>

                    <Box display="flex" sx={{ flexWrap: "wrap" }}>
                        <Stack direction="column" spacing={1}>

                            {/* Card */}
                            {blogs.map((blog,index) => (
                                <Link href="/blog/[category]/[slug]" as={`/blog/${blog.categories[0].slug}/${blog.slug}`}key={index}>
                                    <CardActionArea sx={{ borderRadius: `${theme.shape.borderRadius}px` }}>
                                        <Box sx={{ position: "relative", ["&:hover .trend-image-backdrop"]: { opacity: 0.2 } }} display="flex" justifyContent="flex-start" alignItems="center">

                                            <Image style={{ borderRadius: theme.shape.borderRadius }} src={blog.thumbnail} width={"720"} height={360} objectFit="cover" priority={true}></Image>
                                            <Box className={"trend-image-backdrop"} sx={{ background: "rgb(0,0,0)", width: "100%", height: "100%", position: "absolute", borderRadius: `${theme.shape.borderRadius}px`, transition: "0.2s opacity ease-in-out", opacity: 0.3 }}></Box>

                                            <Box sx={{ position: "absolute", p: 1.5, pr: 1, bottom: 0 }}>
                                                <Typography variant="body1" sx={{ fontWeight: 600 ,color:"white",}}> {blog.title} </Typography>
                                                <Typography variant="caption"  sx={{ fontWeight: 400,color:"rgba(255,255,255,0.8)" }}>{blog.description.length < 60 ? blog.description : blog.description.slice(0, 60) + '...'}</Typography>
                                            </Box>

                                            <Box sx={{ position: "absolute", p: 1, pr: 1, top: 0, right: 0 }} display="flex" alignItems="center">
                                                <Box pl={0.5} display="flex" justifyContent={"center"} alignItems="center">
                                                    <AccessTimeIcon sx={{ fontSize: "1rem" }} fontSize="small" />
                                                    <Typography sx={{ pl: 0.5, pt: 0.25 }} variant="caption">
                                                        {readingTime(convert(blog.htmlContent)).text}
                                                    </Typography>
                                                </Box>
                                            </Box>

                                        </Box>
                                    </CardActionArea>
                                </Link>
                            ))}

                        </Stack>
                    </Box>
                </Paper>
            </Grid>
        </> : ""
    )
}

export default TrendingPost