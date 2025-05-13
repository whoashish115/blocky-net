import React from 'react'

import Typography from "@mui/material/Typography"
import Collapse from "@mui/material/Collapse"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"

import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import DesktopMacOutlinedIcon from '@mui/icons-material/DesktopMacOutlined';
import TabletOutlinedIcon from '@mui/icons-material/TabletOutlined';
import DevicesOtherOutlinedIcon from '@mui/icons-material/DevicesOtherOutlined';

import { useTheme } from '@emotion/react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import millify from "millify";


ChartJS.register(ArcElement, Tooltip, Legend);


const PieChart = ({ views }) => {
    const theme = useTheme()

    const mobileDeviceColor = "#fcc330"
    const desktopDeviceColor = "#6a99f7"
    const tabletDeviceColor = "#68fc79"
    const otherDeviceColor = "#f76159"

    const mobileViewsCount = views.filter(view => view.device == "mobile").length
    const desktopViewsCount = views.filter(view => view.device == "desktop").length
    const tabletViewsCount = views.filter(view => view.device == "tablet").length
    const otherViewsCount = views.filter(view => view.device == "other").length

    const data = {
        labels: ['Mobile', 'Desktop', 'Tablet','Other'],
        datasets: [
            {
                label: 'Traffic ',
                data: [mobileViewsCount, desktopViewsCount, tabletViewsCount,otherViewsCount],
                backgroundColor: [
                    mobileDeviceColor,
                    desktopDeviceColor,
                    tabletDeviceColor,
                    otherDeviceColor,
                ],
                borderColor: [
                    theme.palette.background.paper,
                    theme.palette.background.paper,
                    theme.palette.background.paper,
                    theme.palette.background.paper,
                ],
                borderWidth: 5,
            },
        ],
    };

    return (
        <>
            <Paper sx={{ p: { xs: 1.5, md: 2.5 } }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom textAlign="center" sx={{ textTransform: "capitalize" }}>{`Traffic by Devices ( ${millify(views.length)} ${views.length > 1 ? "views" : "views"} )`} </Typography>
                        <Box display="flex" justifyContent={"flex-end"} alignItems="center">
                            <Box sx={{ position: "relative" }}>
                                <Box sx={{
                                    width: "10px", height: "10px", borderRadius: "50%",
                                    position: "absolute",
                                    top: "-5px",
                                    left: "-15px",
                                    background: theme.palette.error.main,
                                    ["&::after"]: {
                                        content: "''",
                                        width: "10px", height: "10px",
                                        borderRadius: "50%",
                                        position: "absolute",
                                        border: `0.25px solid ${theme.palette.error.dark}`,
                                        opacity: 0,
                                        animation: `pulse 2s infinite linear`,
                                        "@keyframes pulse": {
                                            "0%": {
                                                transform: "scale(1)"
                                            },
                                            "15%": {
                                                opacity: "1"
                                            },
                                            "30%": {
                                                transform: "scale(3.5)",
                                                opacity: "0",
                                            }
                                        },
                                    }
                                }} />
                            </Box>
                            <Typography variant="caption" component={"h6"} gutterBottom textAlign="center" sx={{ textTransform: "capitalize", pt: 0.8, pl: 1 }} color="text.secondary">
                                Updating Realtime
                            </Typography>
                        </Box>

                    </Grid>
                    <Grid item xs={12} sx={{ paddingTop: "4px !important" }}>
                        <Doughnut data={data} />
                    </Grid>
                    <Grid item xs={12}>
                        <Collapse in={views.length !== 0}>
                            <Stack py={1} spacing={1} direction="row" justifyContent="center" alignItems="center">
                                <Stack spacing={1} justifyContent="center" alignItems="center">
                                    <PhoneAndroidOutlinedIcon sx={{ color: theme.palette.text.secondary }} />
                                    <Typography sx={{ color: theme.palette.text.secondary }}>Mobile</Typography>
                                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary, mt: "0px !important" }}>{"( " + millify(mobileViewsCount) + " views )"}</Typography>
                                    <Typography variant="h5" sx={{ color: mobileDeviceColor, fontWeight: 700, mt: "4px !important" }}>{Math.round(mobileViewsCount * 100 / views.length) + "%"}</Typography>
                                </Stack>
                                <Stack spacing={1} justifyContent="center" alignItems="center">
                                    <DesktopMacOutlinedIcon sx={{ color: theme.palette.text.secondary }} />
                                    <Typography sx={{ color: theme.palette.text.secondary }}>Desktop</Typography>
                                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary, mt: "0px !important" }}>{"( " + millify(desktopViewsCount) + " views )"}</Typography>
                                    <Typography variant="h5" sx={{ color: desktopDeviceColor, fontWeight: 700, mt: "4px !important" }}>{Math.round(desktopViewsCount * 100 / views.length) + "%"}</Typography>
                                </Stack>
                                <Stack spacing={1} justifyContent="center" alignItems="center">
                                    <TabletOutlinedIcon sx={{ color: theme.palette.text.secondary }} />
                                    <Typography sx={{ color: theme.palette.text.secondary }}>Tablet</Typography>
                                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary, mt: "0px !important" }}>{"( " + millify(tabletViewsCount) + " views )"}</Typography>
                                    <Typography variant="h5" sx={{ color: tabletDeviceColor, fontWeight: 700, mt: "4px !important" }}>{Math.round(tabletViewsCount * 100 / views.length) + "%"}</Typography>
                                </Stack>
                                <Stack spacing={1} justifyContent="center" alignItems="center">
                                    <DevicesOtherOutlinedIcon sx={{ color: theme.palette.text.secondary }} />
                                    <Typography sx={{ color: theme.palette.text.secondary }}>Other</Typography>
                                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary, mt: "0px !important" }}>{"( " + millify(otherViewsCount) + " views )"}</Typography>
                                    <Typography variant="h5" sx={{ color: otherDeviceColor, fontWeight: 700, mt: "4px !important" }}>{Math.round(otherViewsCount * 100 / views.length) + "%"}</Typography>
                                </Stack>
                            </Stack>
                        </Collapse>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default PieChart