import React from "react";

import Link from "next/link"
import { useRouter } from 'next/router'
import { useTheme } from "@emotion/react";
import InfiniteScroll from 'react-infinite-scroll-component';

import BlogCard from "../smallComponents/BlogCard";
import { DataContext } from '../../store/GlobalState';
import { getData } from "../../utils/fetchData";

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Chip from "@mui/material/Chip"
import Stack from "@mui/material/Stack"


const Blog = (props) => {
  const theme = useTheme()

  const [page, setPage] = React.useState(1)
  const [blogs, setBlogs] = React.useState([])
  const [queryURL, setQueryUrl] = React.useState("blog?limit=6&sort=-createdAt&category=all&title=all")

  const { state, dispatch } = React.useContext(DataContext);
  const { categories } = state

  React.useEffect(() => {
    if (props.blogs) setBlogs(props.blogs)
  }, [props.blogs]);

  React.useEffect(async () => {
    const res = await getData(queryURL);
    setBlogs(res?.blogs || [])
  }, [queryURL]);

  const handleLoadmore = async () => {
    const res = await getData(queryURL + `&page=${page + 1}`);
    setBlogs([...blogs, ...res.blogs])
  }

  return (
    <Box >
      <Box sx={{ maxWidth: "100%", p: { xs: 1, md: 1.5 }, mb: { xs: 1, md: 1.5 }, display: "flex", background: theme.palette.background.paper, borderRadius: `${theme.shape.borderRadius}px`, justifyContent: "space-between", alignItems: "center" }}>
        <Stack direction="row" spacing={0.5} sx={{ mr: 1, overflow: "auto" }}>
          <Chip label="Newest" onClick={() => { setQueryUrl("blog?limit=6&sort=-createdAt&category=all&title=all") }} />
          <Chip label="Oldest" onClick={() => { setQueryUrl("blog?limit=6&sort=createdAt&category=all&title=all") }} />
        </Stack>
      </Box>

      <Grid container spacing={{ xs: 1.5, md: 2 }}>
        {(blogs.length === 0 ? (<Grid item xs={12}><Typography sx={{ pt: 1.5 }} variant="subtitle1" textAlign={"center"}>No blogs</Typography></Grid>) : (
          blogs.map((blog) => (
            <Grid item xs={12} sm={6} md={4} key={blog._id}>
              <BlogCard blog={blog} />
            </Grid>
          ))
        ))}
      </Grid>

      <Box sx={{ textAlign: "center" }}>
        {blogs.length % 6 ? "" : <Button variant="contained" sx={{ mt: 2,mb:1 }} onClick={handleLoadmore}>Load more </Button>}
      </Box>

      {/* <InfiniteScroll
        dataLength={6} 
        next={handleLoadmore}
        hasMore={blogs.length % 6}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      /> */}

    </Box>
  );
};

export default Blog;
