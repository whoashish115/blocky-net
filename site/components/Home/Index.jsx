import React from 'react'

import Slider from './Slider'
import Blog from './Blog'
import UserRightBar from '../Layout/UserRightBar/Index'

import Grid from "@mui/material/Grid"

const Index = (props) => {

  return (
    <>
          <link rel="stylesheet" href="https://unpkg.com/swiper@8/swiper-bundle.min.css" />

      <Grid container spacing={{ xs: 1.5, md:2}}>

        <Grid item xs={12}>
          {/* <Grid container spacing={{ xs: 1, md: 1.5 }}> */}
          <Grid container>

            <Grid item xs={12} md={3}>
            </Grid>

            {props.trendingBlog.length > 0 &&<Grid item xs={12} >
            {/* {props.trendingBlog.length > 0 &&<Grid item xs={12}> */}
              <Slider {...props} />
            </Grid>}

            <Grid item xs={12} md={3}>
               {/* <RecentTweets />  */}
            </Grid>

          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={{ xs: 1.5, md:2 }}>

            <Grid item xs={12} md={8.5}>
              <Blog {...props} />
            </Grid>

            <Grid item xs={12} md={3.5}>
              <UserRightBar {...props} />
            </Grid>

          </Grid>
        </Grid>

      </Grid>
    </>
  )
}

export default Index