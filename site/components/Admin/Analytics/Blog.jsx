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
import Divider from '@mui/material/Divider';
import Paper from "@mui/material/Paper"

import { getData } from "../../../utils/fetchData"
import moment from "moment"

import { useRouter } from 'next/router'
import { useTheme } from '@emotion/react'

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { styled, alpha } from '@mui/material/styles';


const Blog = () => {
  const router = useRouter()
  const theme = useTheme()

  const { slug } = router.query
  const [views, setViews] = React.useState();
  const path = "/blog/[category]/[slug]"
  React.useEffect(() => { getData(`views?path=${path}&secret=${process.env.VIEW_TOKEN}`).then(res => { if (res.views) { setViews(res.views.filter(view => view.slug.includes(slug))[0].views) } else { setViews([]) } }) }, [])
  React.useEffect(() => {
    let liveViewsTimeout = setInterval(() => { getData(`views?path=${path}&secret=${process.env.VIEW_TOKEN}`).then(res => { if (res.views) { setViews(res.views.filter(view => view.slug.includes(slug))[0].views) } else { setViews([]) } }) }, 20000);
    return () => { clearTimeout(liveViewsTimeout); };
  }, [])

  const [viewsData, setViewsData] = React.useState([]);
  React.useEffect(() => {
        if (views) {
            var viewsList = []
            views.forEach(view => {
              viewsList.push(view.visitedAt)
            })
            setViewsData(viewsList)
        }
    }, [views]);

  const getViews = (date) => {
    return viewsData.filter(view => moment(view).format("DD MMM YYYY") == date).length
  }
  const lastDays = () => {
    var dateList = []
    for (let i = 0; i < 30; i++) {
      const newDate = new Date()
      newDate.setDate(newDate.getDate() - i);
      dateList.push(newDate)
    }
    var newDateList = []
    dateList.sort(function (a, b) { return new Date(b.date) - new Date(a.date); }).reverse().forEach(date => {
      newDateList.push(moment(date).format("DD MMM YYYY"))
    });
    return newDateList
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };
  const data = {
    labels: lastDays(),
    datasets: [
      {
        label: 'Views ',
        data: lastDays().map(day => getViews(day)),
        borderColor: theme.palette.error.main,
        backgroundColor: alpha(theme.palette.error.main, 0.5),
        tension: 0.3,
      },
    ],
  };


  return (
    <>
      <Paper sx={{ p: { xs: 1.5, md: 2.5 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            Last 7 Days
            <Line options={options} data={data} />
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

export default Blog