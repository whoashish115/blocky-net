import React from 'react'

import Link from "next/link"
import { useRouter } from 'next/router'
import { useTheme } from '@emotion/react'

import Newsletter from './Newsletter'
import ShowPost from './ShowPost'

import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Chip from "@mui/material/Chip"

const UserRightBar = (props) => {
  const theme = useTheme()
  const hasBlog = Boolean(props.blog)

  return (
    <>
      <Box sx={{ position: "sticky", top: "64px" }}>

        <Grid container spacing={{ xs: 1, sm: 1.5 }}>

          {/* Newsletter  */}
          <Newsletter />

          {/* Related Post  */}
          {hasBlog && <ShowPost title={"Related Post"} blogs={props.relatedBlog} />}

          {/* Recent Post  */}
          {!hasBlog && <ShowPost title={"Recent Post"} blogs={props.recentBlog} />}

          {/* Labels  */}
          {hasBlog && <Grid item xs={12}>
            <Paper sx={{ p: { xs: 1, md: 1.5 }, wordWrap: "break-word" }}>
              <Typography p={0.5} gutterBottom variant="subtitle1" sx={{ textTransform: "capitalize", borderRadius: `${theme.shape.borderRadius}px`, textAlign: "center", p: 1, pb: 0 }}>Labels</Typography>
              <Box display="flex" sx={{ flexWrap: "wrap" }}>
                {props.blog.categories.map((category, index) => (
                  <Link key={index} href="/blog/[category]" as={`/blog/${category.slug}`}>
                    <Chip label={category.name} sx={{ mr: 1, mt: 1 }} />
                  </Link>
                ))}
              </Box>
            </Paper>
          </Grid>}

        </Grid>
      </Box>
    </>
  )
}

export default UserRightBar