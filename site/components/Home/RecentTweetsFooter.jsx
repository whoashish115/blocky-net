import React, { useEffect } from 'react'

import TweetEmbed from 'react-tweet-embed'
import { useTheme } from '@emotion/react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'

import { DataContext } from "../../store/GlobalState"

const RecentTweets = () => {
  const theme = useTheme()
  const { state } = React.useContext(DataContext);
  const tweets = ["1460895507618799623", "1531171187849560065"]
  const [loading, setLoading] = React.useState(true);


  return (
    <>

      <Box sx={{ borderRadius: theme.shape.borderRadius }}>
        <Paper sx={{ padding: 1, height: 350, margin: .5, ["& .twitter-tweet"]: { marginTop: "0 !important", marginBottom: "8px !important" }, ["& .swiper-wrapper"]: { transitionTimingFunction: 'linear', maxHeight: 334 } }}>

          <Swiper modules={[Pagination, Autoplay, FreeMode]} slidesPerView={"auto"} loop direction="vertical" autoplay={{ delay: 0, disableOnInteraction: false }} speed={loading ? 0 :5000}>
            {/* {tweets.map((index) =>
              <SwiperSlide key={index} style={{visibility:loading ? "visible" : "hidden",height:loading ? "auto" : 0}}>
                <Stack spacing={1} sx={{ marginBottom: "8px" }}>
                  <Stack spacing={1} direction="row">
                    <Skeleton variant="circular" width={40} height={40} animation="wave" />
                    <Skeleton variant="text" width="calc(100% - 40px)" height={40} animation="wave" />
                  </Stack>
                  <Box sx={{ width: "100%", height: 100, borderRadius: `${theme.shape.borderRadius}px`, overflow: "hidden" }}>
                    <Skeleton variant="rectangular" height="100%" width="100%" animation="wave" />
                  </Box>
                </Stack>
              </SwiperSlide>
            )} */}

            {tweets.map((tweetId, index) =>
              <SwiperSlide key={tweetId} >
                <Box sx={{ background: theme.palette.background.default, borderRadius: theme.shape.borderRadius }}>
                  <TweetEmbed style={{ width: 200 }} onTweetLoadSuccess={() => { setLoading(false) }} id={tweetId} options={{ theme: "dark" }} />
                </Box>
              </SwiperSlide>
            )}

          </Swiper>

        </Paper>
      </Box>
    </>
  )
}

export default RecentTweets