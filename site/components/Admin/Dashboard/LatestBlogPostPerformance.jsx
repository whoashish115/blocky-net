import React from 'react'

import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Collapse from "@mui/material/Collapse"
import Stack from "@mui/material/Stack"
import EditIcon from '@mui/icons-material/Edit';
import CardMedia from '@mui/material/CardMedia';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import MobileStepper from '@mui/material/MobileStepper';

import Paper from "@mui/material/Paper"

import CommentOutlined from "@mui/icons-material/CommentOutlined"
import VisibilityIcon from '@mui/icons-material/Visibility';

import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';

import { useTheme } from '@emotion/react'
import { DataContext } from "../../../store/GlobalState"
import Image from "next/image"
import Link from "next/link"


const LatestBlogPostPerformance = () => {
    const { state, dispatch } = React.useContext(DataContext)
    const { blogs } = state
    const theme = useTheme()

    const steps = [...blogs.slice(Math.max(blogs.length - 5, 0))];
    const maxSteps = steps.length;
    const [activeStep, setActiveStep] = React.useState(0);
    const handleNext = () => { setActiveStep((prevActiveStep) => prevActiveStep + 1); };
    const handleBack = () => { setActiveStep((prevActiveStep) => prevActiveStep - 1); };


    const [blog, setBlog] = React.useState()
    React.useEffect(() => {
        setBlog(steps[activeStep])
    }, [activeStep,blogs,steps]);

    return (
        <Collapse in={blog}>
            {blog && <Paper sx={{ p: { xs: 1, md: 2 } }}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom sx={{ textTransform: "capitalize" }}>Latest Blog Post</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Card key={blog._id} sx={{ p: 0 }}>

                            {/* Media  */}
                            <CardMedia sx={{ userSelect: "none", position: "relative" }} title={blog.title}>
                                <Image src={blog.thumbnail} height={480} width={960} objectFit="cover" priority={true} style={{  borderRadius: `${theme.shape.borderRadius}px` }} alt={blog.thumbnail} />
                                <Typography variant="body2" sx={{ bottom: 0, zIndex: 3, right: 0, left: 0, p:1, fontWeight: 600,  }}>
                                    {blog.title}
                                </Typography>
                            </CardMedia>

                            {/* Content */}
                            <CardContent sx={{ p: 1 }}>
                                {blog.likes.length + blog.dislikes.length !== 0 && <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography gutterBottom variant="subtitle2" color="text.secondary">
                                        Likes ( Vs Dislikes ) Percentage
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle2" color="text.secondary">
                                        {Math.round(blog.likes.length * 100 / (blog.likes.length + blog.dislikes.length)) + "%"}
                                    </Typography>
                                </Box>}
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography gutterBottom variant="subtitle2" color="text.secondary">
                                        Comments
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle2" color="text.secondary">
                                        {blog.comments.filter(cm => !cm.reply).length}
                                    </Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography gutterBottom variant="subtitle2" color="text.secondary">
                                        Views
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle2" color="text.secondary">
                                        {blog.views}
                                    </Typography>
                                </Box>

                                <Stack justifyContent='center' spacing={1} direction='row'>
                                    <Link href="/admin/edit/blog/[id]" as={`/admin/edit/blog/${blog._id}`}>
                                        <Tooltip title="Edit Blog Post" arrow>
                                            <IconButton size="small" sx={{color:theme.palette.text.primary}}>
                                                <EditIcon fontSize="small" sx={{ width: 17.5, height: 17.5 }} />
                                            </IconButton>
                                        </Tooltip>
                                    </Link>
                                    <Link href="/admin/analytics/[slug]" as={`/admin/analytics/${blog.slug}`}>
                                        <Tooltip title="Go To Blog Post Analytics" arrow>
                                            <IconButton size="small" sx={{color:theme.palette.text.primary}}>
                                                <AssessmentOutlinedIcon fontSize="small" sx={{ width: 17.5, height: 17.5 }} />
                                            </IconButton>
                                        </Tooltip>
                                    </Link>
                                    <Link href="/admin/data/comments/[slug]" as={`/admin/data/comments/${blog.slug}`}>
                                        <Tooltip title="View Comments" arrow>
                                            <IconButton size="small" sx={{color:theme.palette.text.primary}}>
                                                <CommentOutlined fontSize="small" sx={{ width: 17, height: 17 }} />
                                            </IconButton>
                                        </Tooltip>
                                    </Link>
                                    <Link href="/blog/[category]/[slug]" as={`/blog/${blog.categories[0].slug}/${blog.slug}`}>
                                        <Tooltip title="View Blog Post" arrow>
                                            <IconButton size="small" sx={{color:theme.palette.text.primary}}>
                                                <VisibilityIcon fontSize="small" sx={{ width: 17.5, height: 17.5 }} />
                                            </IconButton>
                                        </Tooltip>
                                    </Link>
                                </Stack>

                            </CardContent>

                        </Card>
                    </Grid>
                </Grid>
                <MobileStepper
                    variant="text"
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={<IconButton disabled={activeStep === maxSteps - 1} onClick={handleNext}><KeyboardArrowRight fontSize="small" /></IconButton>}
                    backButton={<IconButton onClick={handleBack} disabled={activeStep === 0}><KeyboardArrowLeft fontSize="small" /></IconButton>}
                />
            </Paper>}
        </Collapse>
    )
}

export default LatestBlogPostPerformance