import * as React from 'react'

import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"

import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';

import { useTheme } from '@mui/material';
import { DataContext } from '../../../store/GlobalState';
import { getData } from '../../../utils/fetchData';

import PieChart from './PieChart';
import LineChart from './LineChart'
import TopContent from './TopContent'

const Analytics = () => {
  const [views, setViews] = React.useState([]);

  React.useEffect(() => {
    getData(`views/allViews?secret=${process.env.VIEW_TOKEN}`).then(res => {
      if (res.views) {
        var viewsList = []
        res.views.forEach(allView => {
          allView.views.forEach(view => {
            viewsList.push(view)
          })
        });
        setViews(viewsList)
      }
      else { setViews([]) }
    })
  }, [])
  React.useEffect(() => {
    let liveViewsTimeout = setInterval(() => {
      getData(`views/allViews?secret=${process.env.VIEW_TOKEN}`).then(res => {
        if (res.views) {
          var viewsList = []
          res.views.forEach(allView => {
            allView.views.forEach(view => {
              viewsList.push(view)
            })
          });
          setViews(viewsList)
        }
        else { setViews([]) }
      })
    }, 20000);
    return () => {
      clearTimeout(liveViewsTimeout);
    };
  }, [])

  return (
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item md={12} lg={8.5}>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid item xs={12}>
              <LineChart views={views} />
            </Grid>
            <Grid item xs={12}>
             <TopContent/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12} lg={3.5}>
          <PieChart views={views} />
        </Grid>
      </Grid>
  )
}

export default Analytics