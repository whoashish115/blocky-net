import React from 'react'
import Grid from "@mui/material/Grid"
import LatestBlogPostPerformance from './LatestBlogPostPerformance'
import LatestUserJoined from './LatestUserJoined'

const Index = () => {
  return (
    <>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item md={12} lg={4}>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid item xs={12}>
              <LatestBlogPostPerformance />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12} lg={4}>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid item xs={12}>
              <LatestUserJoined />
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item md={12} lg={4}>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid item xs={12}>
              sad
            </Grid>
            <Grid item xs={12}>
              sad
            </Grid>
          </Grid>
        </Grid> */}
      </Grid>
    </>
  )
}

export default Index