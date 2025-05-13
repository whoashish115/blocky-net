import React from 'react'

import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Collapse from "@mui/material/Collapse"
import Stack from "@mui/material/Stack"
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import CardMedia from '@mui/material/CardMedia';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Divider from '@mui/material/Divider';
import Paper from "@mui/material/Paper"

import CommentOutlined from "@mui/icons-material/CommentOutlined"
import ThumbUpIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDownOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';

import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';


import millify from "millify";

import { useTheme } from '@emotion/react'
import { DataContext } from "../../../store/GlobalState"
import Image from "next/image"
import Link from "next/link"

const TopContent = () => {
  const { state, dispatch } = React.useContext(DataContext)
  const { blogs } = state
  const theme = useTheme()

  const [sortedBlog, setSortedBlog] = React.useState([]);

  React.useEffect(() => {
    setSortedBlog(blogs.sort(function (a, b) { return b.views - a.views; }))
  }, [blogs]);

  const initialNext = 4
  const nextLoad = 4
  const [next, setNext] = React.useState(initialNext)

  return (
    <Collapse in={sortedBlog.length > 0}>
      <Paper sx={{ p: 2 }}>
        <Grid container spacing={1.5}>

          <Grid item xs={12}>
            <Box display="flex" justifyContent={"space-between"} alignItems="center">
              <Typography variant="h6" gutterBottom textAlign="center" sx={{ textTransform: "capitalize" }}>Your Top Content In This Period</Typography>
              <Link href="/admin/data/blogs">
                <Button disableElevation variant="outlined">Go To Blog Posts</Button>
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12}>
            {sortedBlog.length > 0 && <Stack spacing={1.5}>
              {sortedBlog.slice(0, next).map(blog => (
                <Card key={blog._id} sx={{ p: 0 }}>
                  <CardActionArea disableRipple sx={{ p: 1, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", ["&:hover #overlay-action-buttons"]: { opacity: 1 } }}>

                    {/* Media  */}
                    <Link href="/blog/[category]/[slug]" as={`/blog/${blog.categories[0].slug}/${blog.slug}`}>
                      <CardMedia sx={{ cursor: "pointer", userSelect: "none" }} title={blog.title}>
                        <Image src={blog.thumbnail} style={{ borderRadius: `${theme.shape.borderRadius}px` }} height={75} width={150} objectFit="cover" priority={true} alt={blog.thumbnail} />
                      </CardMedia>
                    </Link>

                    {/* Content  */}
                    <Box flexGrow={1} display="inline-flex" height="100%">

                      <CardContent sx={{ py: "0px !important", display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                        <Link href="/blog/[category]/[slug]" as={`/blog/${blog.categories[0].slug}/${blog.slug}`}>
                          <>
                            <Typography sx={{ wordBreak: "break-word", width: "250px", fontWeight: 700 }} component="div" variant="body1">
                              {blog.title}
                            </Typography>
                            <Typography sx={{ wordBreak: "break-word", width: "250px" }} component="div" variant="body2" color="text.secondary">
                              {blog.description.length > 100 ? blog.description.slice(0, 100) + "..." : blog.description}
                            </Typography>
                          </>
                        </Link>
                      </CardContent>

                      {/* Data  */}
                      <Box position={"relative"} flexGrow={1}>

                        <Stack spacing={1.5} direction="row" sx={{ mr: 1, cursor: "default", width: "100%", height: "100%" }}>
                          <Tooltip title="Likes Count" arrow>
                            <Stack spacing={0.75} direction="row" alignItems="center">
                              <ThumbUpIcon sx={{color:theme.palette.text.secondary}} fontSize="small" />
                              <Box>{millify(blog.likes.length)}</Box>
                            </Stack>
                          </Tooltip>
                          <Tooltip title="Dislikes Count" arrow>
                            <Stack spacing={0.75} direction="row" alignItems="center">
                              <ThumbDownIcon sx={{color:theme.palette.text.secondary}} fontSize="small" />
                              <Box>{millify(blog.dislikes.length)}</Box>
                            </Stack>
                          </Tooltip>
                          <Tooltip title="Comments Count" arrow>
                            <Stack spacing={0.75} direction="row" alignItems="center">
                              <CommentOutlined sx={{color:theme.palette.text.secondary}} fontSize="small" />
                              <Box>{millify(blog.comments.filter(cm => !cm.reply).length)} </Box>
                            </Stack>
                          </Tooltip>
                          <Tooltip title="Views Count" arrow>
                            <Stack spacing={0.75} direction="row" alignItems="center">
                              <VisibilityIcon sx={{color:theme.palette.text.secondary}} fontSize="small" />
                              <Box>{millify(blog.views)}</Box>
                            </Stack>
                          </Tooltip>
                        </Stack>

                        <Stack id="overlay-action-buttons" spacing={1.5} direction="row" alignItems="center" sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: theme.palette.background.paper, opacity: 0 }}>
                          <Box>
                            <Link href="/admin/edit/blog/[id]" as={`/admin/edit/blog/${blog._id}`}>
                              <Tooltip title="Edit Blog Post" arrow>
                                <IconButton>
                                  <ModeEditOutlineOutlinedIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Link>
                          </Box>
                          <Box>
                            <Link href="/admin/analytics/[slug]" as={`/admin/analytics/${blog.slug}`}>
                              <Tooltip title="View Analytics" arrow>
                                <IconButton>
                                  <AssessmentOutlinedIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Link>
                          </Box>
                          <Box>
                            <Link href="/admin/data/comments/[slug]" as={`/admin/data/comments/${blog.slug}`}>
                              <Tooltip title="View Comments" arrow>
                                <IconButton>
                                  <CommentOutlined fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Link>
                          </Box>
                          <Box>
                            <Link href="/blog/[category]/[slug]" as={`/blog/${blog.categories[0].slug}/${blog.slug}`}>
                              <Tooltip title="View Blog Post" arrow>
                                <IconButton>
                                  <VisibilityIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Link>
                          </Box>
                        </Stack>

                      </Box>
                    </Box>

                  </CardActionArea>
                </Card>
              ))}
            </Stack>}
          </Grid>

          <Grid item xs={12}>
            {blogs.length - next > 0 && <Button disableElevation onClick={() => setNext(next + nextLoad)} variant="outlined">Show More</Button>}
          </Grid>

        </Grid>
      </Paper>

    </Collapse>
  )
}

export default TopContent