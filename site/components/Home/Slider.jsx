import React from "react";

import Link from "next/link";
import styled from "@emotion/styled";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";

import ShareBlog from "../Blog/Category/ShareBlog";

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"

const HeroSlider = ({ trendingBlog }) => {

  const Slide = styled(Box)(({ theme, src }) => ({
    background: `linear-gradient(180deg, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,1) 100%), url(${src})  50% no-repeat`,
    backgroundSize: "cover",
    height: 350,
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    justifyContent: "flex-end",
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.down("md")]: {
      height: "35vh",
    }
  }));

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center', minWidth: 250, minHeight: 125,maxWidth:1500, maxHeight: 400, width: '100%', height: "100%", margin: "auto" }}>
        <Swiper modules={[Navigation, Pagination, Autoplay]} slidesPerView={1} autoplay={{ delay: 3000, disableOnInteraction: false }} loop>
          {trendingBlog.map(blog => (
            <SwiperSlide key={blog._id}>
              <Link href="/blog/[category]/[slug]" as={`/blog/${blog.categories[0].slug}/${blog.slug}`}>
                <Slide src={blog.thumbnail}>
                  <Box sx={{ p: 2 }} display="flex" justifyContent={'space-between'} alignItems={'end'}>

                    <Box>
                      <Typography variant="h4" color="primary" sx={{ pb: 1, fontWeight: 800, textTransform: "uppercase" }}>{blog.title}</Typography>
                      <Typography variant="h6" sx={{ cursor: "pointer",color:"#fff", opacity: 0.8 }}>{blog.description.length > 100 ? blog.description.slice(0, 100) + "..." : blog.description}</Typography>
                    </Box>

                    <Box display="flex" justifyContent="flex-end">
                      <Stack direction="row" spacing={1}>
                        <ShareBlog url={`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blog.categories[0].slug}/${blog.slug}`} chipComponent={true} />
                      </Stack>
                    </Box>

                  </Box>
                </Slide>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

    </>
  );
};

export default HeroSlider;
