import Link from "next/link"
import Image from 'next/image';

// Material UI Components 
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Chip from "@mui/material/Chip"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import AvatarGroup from "@mui/material/AvatarGroup"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"

import { useTheme } from '@emotion/react';
import moment from "moment"
import readingTime from 'reading-time'
import {convert} from "html-to-text"
import millify from "millify";

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


const BlogCard = ({ blog }) => {
  const theme = useTheme()
  return (
    <Card sx={{ width: "100%",height:"100%",display:"flex",flexDirection:"column" }}>

      {/* Media  */}
      <Link href="/blog/[category]/[slug]" as={`/blog/${blog.categories[0].slug}/${blog.slug}`}>
        <CardMedia sx={{ cursor: "pointer",userSelect:"none" }} title={blog.title}>
            <Image src={blog.thumbnail} height={480} width={960} objectFit="cover" priority={true} alt={blog.thumbnail} />
        </CardMedia>
      </Link>

      {/* Content  */}
      <CardContent sx={{flexGrow:1}}>

        <Link href="/blog/[category]/[slug]" as={`/blog/${blog.categories[0].slug}/${blog.slug}`}>
          <Typography gutterBottom variant="h6" sx={{ textTransform: "capitalize" ,cursor:"pointer" }}>
            {blog.title}
          </Typography>
        </Link>

        <Link href="/blog/[category]/[slug]" as={`/blog/${blog.categories[0].slug}/${blog.slug}`}>
          <Typography variant="subtitle2" color="text.secondary"sx={{ cursor: "pointer" }}>
            {blog.description.length < 80 ? blog.description : blog.description.slice(0, 80) + '...'}
          </Typography>
        </Link>

        <Box mt={1.5}>
          {blog.categories.map(category => (
            <Link key={category._id} href="/blog/[category]" as={`/blog/${category.slug}`}>
              <Chip label={category.name} size="small" color="primary" variant="outlined" sx={{ mr: 0.5, mb: 0.5, ["&:hover"]: { background: `${theme.palette.primary.light} !important`, color: "#fff", cursor: "pointer" } }} />
            </Link>
          ))}
        </Box>

      </CardContent>

      {/* More  */}
      <Box display="flex" justifyContent="space-between" alignItems="flex-end" p={2} pt={0}>
        <AvatarGroup max={2} sx={{ justifyContent: "left" }}>
          {blog.authors.map(author => (
            <Avatar key={author._id} src={author.avatar} alt={author.name} />
          ))}
        </AvatarGroup>
        <Box sx={{ p: 0.5, display: "flex", textAlign: "right", justifyContent: "flex-end", alignItems: "center", flexDirection: "row" }}>
                  <CalendarTodayIcon sx={{ fontSize: "1rem", color: "text.secondary" }} fontSize="small" />
                  <Typography sx={{ pl: 0.5, pt: 0.25 }} color="text.secondary" variant="caption">
                    {moment(blog.createdAt).format("DD MMMM YYYY")}
                  </Typography>
                </Box>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" p={2} pt={0}>

        <Box display="flex" justifyContent={"center"} alignItems="center">
          <VisibilityIcon sx={{ fontSize: "1rem" }} fontSize="small" />
          <Typography sx={{ pl: 0.5,pt:0.25}} variant="caption" >
            {millify(blog.views)}{blog.views > 1 ? " views" : " view"}
          </Typography>
        </Box>

        <Box display="flex" justifyContent={"center"} alignItems="center">
          <AccessTimeIcon sx={{ fontSize: "1rem" }} fontSize="small" />
          <Typography sx={{ pl: 0.5,pt:0.25}} variant="caption">
            {readingTime(convert(blog.htmlContent)).text}
          </Typography>
        </Box>

      </Box>

    </Card>
  )
}

export default BlogCard