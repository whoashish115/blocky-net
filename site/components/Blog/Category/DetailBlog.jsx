import React from 'react'

// Material UI Components 
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Chip from "@mui/material/Chip"

import UserRightBar from '../../Layout/UserRightBar/Index'
import InnerHTML from 'dangerously-set-html-content'
import Link from 'next/link'
import Image from 'next/image'
import Comments from "./Comments/Index"
import { useRouter } from 'next/router'
import { useTheme } from '@emotion/react'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';


import BlogActions from './BlogActions'
import AfterBlog from './AfterBlog'
import moment from "moment"


const DetailBlog = (props) => {
  const router = useRouter()
  const theme = useTheme()
  const [blog, setBlog] = React.useState({})

  React.useEffect(() => {
    setBlog(props.blog)
  }, [props.blog]);


  return (
    <>

      {blog._id &&
        <Grid container spacing={{ xs: 1, sm: 1.5 }}>

          {/* Blog Top  */}
          <Grid item xs={12}>
            <Paper sx={{ p: { xs: 1, md: 1.5 }, wordWrap: "break-word", display: "flex", flexDirection: { xs: "column", md: "row" } }}>
              <Box sx={{ order: 0, textAlign: 'center' }}><Image style={{ borderRadius: theme.shape.borderRadius }} src={blog.thumbnail} width={"680"} height={340} objectFit="cover" priority={true} /></Box>
              <Box sx={{ order: 1, maxWidth: { xs: "100%", md: "55%" }, display: "flex", flexDirection: 'column',flexGrow:1 }} p={{ xs: 1.5, md: 3 }}>
                <Typography variant="h3" gutterBottom sx={{ textTransform: "capitalize" }}>{blog.title}</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom sx={{ textTransform: "capitalize" }}>{blog.description}</Typography>
                <Box mt={1}>
                  {blog.categories.map(category => (
                    <Link key={category._id} href="/blog/[category]" as={`/blog/${category.slug}`}>
                      <Chip label={category.name} color="primary" variant="outlined" sx={{ mr: 1, mb: 1, ["&:hover"]: { background: `${theme.palette.primary.light} !important`, color: "#fff", cursor: "pointer" } }} />
                    </Link>
                  ))}
                </Box>
                <Box flexGrow={1}></Box>
                <Box sx={{ p: 0.5, display: "flex", textAlign: "right", justifyContent: "flex-end", alignItems: "center", flexDirection: "row" }}>
                  <CalendarTodayIcon sx={{ fontSize: "1rem", color: "text.secondary" }} fontSize="small" />
                  <Typography sx={{ pl: 0.5, pt: 0.25 }} color="text.secondary" variant="caption">
                    {"Published On " + moment(blog.createdAt).format("DD MMM YYYY")}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Blog Left  */}
          <Grid item xs={12} md={8.5}>
            <Grid container spacing={{ xs: 1, sm: 1.5 }}>

              {/* Blog Left Content  */}
              <Grid item xs={12}>
                <Paper sx={{ p: { xs: 1, md: 1.5 }, wordWrap: "break-word" }}>

                  {/* Content  */}
                  <Box className='md-editor-speak-blog' sx={{ wordWrap: "break-word", mb: 5, ["& .spoken-word-playback-controls__button wp-exclude-emoji ,.spoken-word-playback-controls__button--emoji"]: { display: "none!important" } }}>
                    <Box className='md-editor-html-class entry-content' sx={{ wordWrap: "break-word", mb: 5 }}>
                      <InnerHTML html={blog.htmlContent} />
                    </Box>
                  </Box>

                  {/* Actions  */}
                  <BlogActions blog={blog} setBlog={setBlog} />

                </Paper>
              </Grid>

              {/* Blog Left After  */}
              <AfterBlog {...props} />


              {/* Blog Left Comments  */}
              <Grid item xs={12} >
                <Paper sx={{ p: { xs: 1, sm: 1.5 } }}>
                  <Comments blog={blog} setBlog={setBlog} />
                </Paper>
              </Grid>

            </Grid>
          </Grid>

          {/* Blog Right  */}
          <Grid item xs={12} md={3.5}>
            <UserRightBar {...props} />
          </Grid>

        </Grid>}
    </>
  )
}

export default DetailBlog