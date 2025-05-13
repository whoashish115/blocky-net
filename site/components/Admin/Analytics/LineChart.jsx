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

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArchiveIcon from '@mui/icons-material/Archive';

import { useTheme } from '@emotion/react'

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment'
import { styled, alpha } from '@mui/material/styles';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StyledMenu = styled((props) => (<Menu elevation={0} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right', }}{...props} />))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow: "none !important",
        '& .MuiMenu-list': { padding: '4px 0' },
        '&::before': { display: 'none !important' },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

const LineChart = (props) => {
    const theme = useTheme()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => { setAnchorEl(event.currentTarget); };
    const handleClose = () => { setAnchorEl(null); };

    const [days, setDays] = React.useState(7);
    const [views, setViews] = React.useState([]);

    React.useEffect(() => {
        if (props.views.length > 0) {
            var views = []
            props.views.forEach(view => {
                views.push(view.visitedAt)
            })
            setViews(views)
        }
    }, [props.views]);

    const getViews = (date) => {
        return views.filter(view => moment(view).format("DD MMM YYYY") == date).length
    }
    const lastDays = (d) => {
        var dateList = []
        for (let i = 0; i < d; i++) {
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
        labels: lastDays(days),
        datasets: [
            {
                label: 'Views ',
                data: lastDays(days).map(day => getViews(day)),
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
                        <Box display="flex" justifyContent={"space-between"} alignItems="center">
                            <Typography variant="h6" gutterBottom textAlign="center" sx={{textTransform:"capitalize"}}>View On Overall Site</Typography>
                            <Button color="error" sx={{ color: "white" }} aria-controls={open ? 'menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} variant="contained" disableElevation onClick={handleClick} endIcon={<KeyboardArrowDownIcon />} >
                                Last {days} Days
                            </Button>
                            <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose} >
                                <MenuItem onClick={() => { setDays(7); handleClose() }} disableRipple>
                                    Last 7 Days
                                </MenuItem>
                                <MenuItem onClick={() => { setDays(30); handleClose() }} disableRipple>
                                    Last 30 Days
                                </MenuItem>
                            </StyledMenu>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Line options={options} data={data} />
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default LineChart