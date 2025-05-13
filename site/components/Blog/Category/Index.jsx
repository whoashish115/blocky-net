import React from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'

import BlogCard from '../../smallComponents/BlogCard'
import { useTheme } from '@emotion/react'

const Category = ({ blogs, category }) => {
  const theme = useTheme()

  return (
    <Box>
      <Grid container spacing={{ xs: 1.5, md: 2 }}>

        <Grid item xs={12} md={12}>
          <Box sx={{ maxWidth: "100%", p: { xs: 1, md: 1.5 }, mb: { xs: 1, md: 1.5 }, display: "flex", background: theme.palette.background.paper, borderRadius: `${theme.shape.borderRadius}px`, justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="subtitle1" sx={{textTransform:"capitalize"}}> {category}</Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={12}>
          <Grid container spacing={{ xs: 1.5, md: 2 }}>
            {(blogs.length === 0 ? (<Grid item xs={12}><Typography sx={{ pt: 1.5 }} variant="subtitle1" textAlign={"center"}>No blogs</Typography></Grid>) : (
              blogs.map((blog) => (
                <Grid item xs={12} sm={4} md={3} key={blog._id}>
                  <BlogCard blog={blog} />
                </Grid>
              ))
            ))}
          </Grid>
        </Grid>

      </Grid>
    </Box>
  )
}

export default Category