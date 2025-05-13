import React, { useEffect } from "react";

import TweetEmbed from "react-tweet-embed";
import { useTheme } from "@emotion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

import { DataContext } from "../../store/GlobalState";

const RecentTweets = () => {
  const theme = useTheme();
  const { state } = React.useContext(DataContext);
  const tweets = ["1460895507618799623", "1531171187849560065", "1531171187849560065", "1531171187849560065"];
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);


  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false)
  //   }, 7000);
  // }, []);

  const showTweets = () => {
    return (
      <Swiper modules={[Pagination, Autoplay, FreeMode]} slidesPerView={"auto"} autoplay={{ delay: 1, disableOnInteraction: false }} loop={true} direction="vertical"  speed={1000}>
        {tweets.map((tweetId) => (

          <SwiperSlide key={tweetId} style={{ width: "auto",height:"auto" }}>
            <Box sx={{ display: "inline" }}>
              <Button color="inherit" sx={{ width: 'auto', background: (theme) => { return theme.palette.background.paper }, ["&:hover"]: { background: (theme) => { return theme.palette.background.default } }, paddingX: 2.5, paddingY: 1, marginBottom: 1, marginRight: 0, boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1);" }}>
                <Box>
                 1
                 1
                 1
                 1
                 1
                 1
                 1
                 1
                 1
                </Box>
              </Button>
            </Box>
          </SwiperSlide>
            ))}
        
      </Swiper>
    )
  }

  return (
    <>
      <Box sx={{ borderRadius: theme.shape.borderRadius }}>
        <Paper sx={{ padding: 1,height:"350px", margin: 0.5, ["& .twitter-tweet"]: { marginTop: "0 !important", marginBottom: "8px !important", }, ["& .swiper-wrapper"]: { transitionTimingFunction: "linear", maxHeight: 334 } }} >

          {/* {loading && <Swiper modules={[Pagination, FreeMode]} slidesPerView={"auto"} loop direction={"vertical"}>
          {tweets.map((index) =>
            <SwiperSlide key={index} style={{ height: "auto" }}>
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
          )}
        </Swiper>} */}
          {/* <Swiper modules={[Pagination, Autoplay, FreeMode]} slidesPerView={"auto"} loop autoplay={{ delay: 0, disableOnInteraction: false }} speed={5000} >
          {tweets.map((tweetId) =>
            <SwiperSlide key={tweetId} style={{ height: "auto" }}>
              <Box sx={{ background: theme.palette.background.default, borderRadius: theme.shape.borderRadius }}>
                <TweetEmbed onTweetLoadSuccess={() => { console.log("hello") }} id={tweetId} options={{ theme: "dark" }} />
              </Box>
            </SwiperSlide>
          )}
        </Swiper> */}
          {showTweets()}
        </Paper>
      </Box>
    </>
  );
};

export default RecentTweets;
