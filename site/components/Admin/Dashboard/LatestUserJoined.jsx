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
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Divider from '@mui/material/Divider';

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import MobileStepper from '@mui/material/MobileStepper';

import Paper from "@mui/material/Paper"

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArchiveIcon from '@mui/icons-material/Archive';
import AddOutlined from "@mui/icons-material/AddOutlined"
import CommentOutlined from "@mui/icons-material/CommentOutlined"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import VisibilityIcon from '@mui/icons-material/Visibility';
import NorthEastIcon from '@mui/icons-material/NorthEast';

import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import millify from "millify";

import { useTheme } from '@emotion/react'
import { DataContext } from "../../../store/GlobalState"
import moment from "moment"
import Image from "next/image"
import Link from "next/link"


const LatestUserJoined = () => {
    const { state, dispatch } = React.useContext(DataContext)
    const { users } = state
    const theme = useTheme()

    const [userList, setUserList] = React.useState([])
    React.useEffect(() => {
        setUserList(users.slice(Math.max(users.length - 4, 0)))
    }, [users]);

    return (
        <Collapse in={userList.length !== 0}>
            {userList.length !== 0 && <Paper sx={{ p: { xs: 1, md: 2 } }}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom sx={{ textTransform: "capitalize" }}>Latest Users Joined</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            {userList.map(user => (
                                    <Card key={user._id} sx={{ p: 0 }}>
                                        <CardActionArea sx={{ p: 1.5, display: "flex", flexDirection: "row", alignItems: "center" }}>
                                            <Avatar src={user.avatar} height={50} width={50} objectFit="cover" priority={true} alt={user.avatar} />
                                            <Box display="flex" flexDirection="column" ml={1} flexGrow={1}>
                                                <Typography variant="subtitle2" color="text.secondary">{user.name}</Typography>
                                                <Typography variant="caption" color="text.secondary">{"Joined At - " + moment(user.createdAt).format("DD MMM YYYY")} </Typography>
                                            </Box>
                                        </CardActionArea>
                                    </Card>
                            ))}
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>}
        </Collapse>
    )
}

export default LatestUserJoined