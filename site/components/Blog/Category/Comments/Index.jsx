import React from 'react'

import InputComment from './InputComment'
import CommentDisplay from './CommentDisplay'
import { DataContext } from '../../../../store/GlobalState'
import Link from "next/link"

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import millify from "millify";

import ReportComment from './ReportComment'
import KeyboardArrowDownOutlined from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlined from '@mui/icons-material/KeyboardArrowUpOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';


const Index = ({ blog, setBlog }) => {
  const { state } = React.useContext(DataContext);
  const { auth } = state;
  const isAuthenticated = Object.keys(auth).length !== 0 ? true : false

  const [comments, setComments] = React.useState([])
  const [showComments, setShowComments] = React.useState([])
  const initialNext = 4
  const nextLoad = 4
  const [next, setNext] = React.useState(initialNext)
  const [replyComments, setReplyComments] = React.useState([])

  React.useEffect(() => {
    const newCm = blog.comments.filter(cm => !cm.reply).reverse()
    setComments(newCm)
    setShowComments(newCm.slice(0, next))
  }, [blog.comments, next])

  React.useEffect(() => {
    const newRep = blog.comments.filter(cm => cm.reply).reverse()
    setReplyComments(newRep)
  }, [blog.comments])

  return (
    <Box>
      <ReportComment />
      <Grid container spacing={{ xs: 1, md: 1.5 }}>

        <Grid item xs={12}>
          <Box p={1} display="flex" alignItems="flex-start">
              <CommentOutlinedIcon sx={{mt:0.5}} fontSize="small" />
            <Box sx={{ flexGrow: 1, pl: 1 }} display="flex" alignItems="flex-start" justifyContent="center" flexDirection="column">
              <Typography sx={{ fontWeight: 600 }} variant="h6">
                {`Comments ( ${millify(blog.comments.filter(cm => !cm.reply).length)} )`}
              </Typography>
              {!isAuthenticated && <Typography sx={{ fontWeight: 600 }} component="h6" variant="body2"> <Link href="/auth/signin"><Box sx={{ display: 'inline', cursor: "pointer" ,color:"primary.main"}} >Sign In</Box></Link> To Add  Your Comment</Typography>}
            </Box>

          </Box>
        </Grid>

        <Grid item xs={12}>
          <InputComment blog={blog} setBlog={setBlog} />
        </Grid>

        <Grid item xs={12}>
          <Stack spacing={1.5} direction="column">
            {showComments.map((comment, index) => (<CommentDisplay key={index} comment={comment} blog={blog} setBlog={setBlog} replyCm={replyComments.filter(item => item.reply === comment._id)} />))}
          </Stack>
          {comments.length - next > 0 &&
            <Typography textAlign="center">
              <IconButton size="small" onClick={() => setNext(next + nextLoad)} sx={{ marginTop: { xs: 1, md: 1.5 } }}>
                <KeyboardArrowDownOutlined />
              </IconButton>
            </Typography>}
          {comments.length === 0 && <Typography variant="subtitle2" textAlign="center">No Comments Yet</Typography>}
        </Grid>

      </Grid>
    </Box>
  )
}

export default Index