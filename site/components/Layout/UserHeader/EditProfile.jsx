import React from "react";

import moment from "moment"
import { useRouter } from "next/router";
import { useTheme } from "@emotion/react";

import { DataContext } from "../../../store/GlobalState";
import { checkImage, imageUpload } from "../../../utils/imageUpload";
import { patchData } from "../../../utils/fetchData";

import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import useMediaQuery from "@mui/material/useMediaQuery";
import { alpha } from "@mui/material/styles";

import Close from '@mui/icons-material/Close'
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import CameraOutlined from '@mui/icons-material/CameraOutlined'


const EditProfile = ({ editOpen, setEditOpen }) => {
    const theme = useTheme();
    const router = useRouter();
    const { state, dispatch } = React.useContext(DataContext);
    const { auth } = state;

    const initialState = { name: "", email: "", createdAt: "" };
    const [userData, setUserData] = React.useState(initialState);
    const { name, email, createdAt } = userData;

    React.useEffect(() => { setUserData(auth.user) }, [auth.user]);
    const handleChangeInput = (e) => { const { name, value } = e.target; setUserData({ ...userData, [name]: value }); };

    const [avatar, setAvatar] = React.useState("");
    const handleChangeAvatar = (e) => { const file = e.target.files[0]; if (!file) return; const err = checkImage(file); if (err) return dispatch({ type: "NOTIFY", payload: { error: err } }); setAvatar(file); };

    const handleSubmit = async (e) => {
        if (!name) { dispatch({ type: "NOTIFY", payload: { error: "Please Add Your Name" } }) }
        let avatarImage; if (avatar) avatarImage = await imageUpload([avatar])

        const res = await patchData("user/profile/update", { ...userData, avatar: avatar ? avatarImage[0].url : auth.user.avatar }, auth.token)
        if (res.err) { dispatch({ type: "NOTIFY", payload: { error: res.err } }) }

        dispatch({ type: "AUTH", payload: { ...auth, user: { ...auth.user, ...userData, avatar: avatar ? avatarImage[0].url : auth.user.avatar } } })
        dispatch({ type: "NOTIFY", payload: { success: res.msg } })
        setEditOpen(false)
    };

    const isFullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const handleEditClose = () => {
        setUserData(auth.user);
        setAvatar("");
        setEditOpen(false)
    }

    return (
        <Dialog maxWidth="sm" fullWidth fullScreen={isFullScreen} open={editOpen} scroll="body">

            {/* CloseIcon  */}
            <Tooltip title="Close" arrow>
                <IconButton sx={{ position: "absolute !important", right: 8, top: 8, strokeWidth: 1, stroke: (theme) => { return theme.palette.text.primary } }} onClick={handleEditClose} >
                    <Close color="inherit" fontSize="small" />
                </IconButton>
            </Tooltip>

            {/* Title  */}
            <DialogTitle>Edit Your Profile</DialogTitle>

            {/* Content  */}
            <DialogContent sx={{ paddingBottom: 0 }}>
                <Grid container spacing={{ xs: 1, md: 2 }}>
                    <Grid item xs={12}>
                        <Box textAlign="center">
                            <Box sx={{ position: "relative", width: 140, height: 140, margin: "auto", ["&:hover #avatar-input-box"]: { opacity: 1 } }}>
                                <Avatar sx={{ width: 140, height: 140 }} src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} alt="Profile Photo" />
                                <Box id="avatar-input-box" sx={{ position: "absolute", width: "100%", borderRadius: "50%", display: 'flex', justifyContent: "center", alignItems: "center", height: "100%", top: 0, left: 0, bottom: 0, right: 0, background: "rgba(0,0,0,0.8)", opacity: 0, transition: "0.5s" }}>
                                    <input style={{ position: "absolute", width: "100%", borderRadius: "50%", display: 'flex', justifyContent: "center", alignItems: "center", height: "100%", top: 0, left: 0, bottom: 0, right: 0, opacity: 0, cursor: "pointer" }} type="file" name="file" hidden id="icon-button-file" accept="image/*" onChange={handleChangeAvatar} />
                                    <label htmlFor="icon-button-file">
                                        <IconButton color="primary" component="span" >
                                            <CameraOutlined fontSize="small" />
                                        </IconButton>
                                    </label>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box textAlign='center' mb={1.5}>
                        <Typography variant="caption" component="h6">
                            {"Joined " + moment(createdAt).fromNow()}
                        </Typography>
                        </Box>
                        <Box textAlign='center'>
                            <Typography sx={{ display: "inline", background: alpha(theme.palette.primary.main, 0.8), borderRadius: `${theme.shape.borderRadius}px`, p: 1 }}>
                                {email}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth variant="filled" margin="dense" label="Name" name="name" onChange={handleChangeInput} value={name} InputProps={{ sx: { fontWeight: `500 !important` }, startAdornment: (<InputAdornment position="start"><EmailOutlined fontSize="small" sx={{ color: name ? theme.palette.text.primary : theme.palette.text.secondary }} /></InputAdornment>) }} autoFocus />
                    </Grid>
                </Grid>

            </DialogContent>

            {/* Actions  */}
            <DialogActions sx={{marginTop:2}}>
                <Button disableElevation variant="outlined" onClick={handleEditClose}>
                    Cancel
                </Button>
                <Button disabled={name == auth.user.name && !Boolean(avatar)} disableElevation variant="contained" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </DialogActions>

        </Dialog>
    )
}

export default EditProfile