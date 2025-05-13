import * as React from 'react'

import { DataContext } from '../../../store/GlobalState';
import { getData, postData } from '../../../utils/fetchData';

import { useTheme } from '@emotion/react';
import { imageUpload } from '../../../utils/imageUpload';
import valid from '../../../utils/validate';
import { useRouter } from "next/router"


// Material UI Components 
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import TextField from "@mui/material/TextField"

// Material UI Icons 
import AddPhotoAlternate from "@mui/icons-material/AddPhotoAlternate"

const User = () => {
    const initialState = { firstname: "", lastname: "", email: "", password: "", cf_password: "", avatar: "" };
    const [userData, setUserData] = React.useState(initialState);
    const { firstname, lastname, email, avatar, password, cf_password } = userData;
    const name = `${firstname} ${lastname}`

    const { state, dispatch } = React.useContext(DataContext);
    const { auth } = state;
    const theme = useTheme()
    const router = useRouter()

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };
    const handleUploadAvatar = e => {
        const file = e.target.files[0]
        if (!file)
            return dispatch({ type: 'NOTIFY', payload: { error: 'File does not exist.' } })

        if (file.size > 1024 * 1024 * 5)
            return dispatch({ type: 'NOTIFY', payload: { error: 'The largest image size is 1mb.' } })

        if (file.type !== "image/jpeg" && file.type !== "image/png") //1mb
            return dispatch({ type: 'NOTIFY', payload: { error: 'Image format is incorrect.' } })

        setUserData({ ...userData, avatar: file });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (auth.user.role !== 'admin')
            return dispatch({ type: 'NOTIFY', payload: { error: 'Authentication is not valid.' } })

        if (!name || !email || !password || !cf_password)
            return dispatch({ type: 'NOTIFY', payload: { error: 'Please add all the fields.' } })

        const errMsg = valid(name, email, password, cf_password)
        if (errMsg) return dispatch({ type: 'NOTIFY', payload: { error: errMsg } })

        dispatch({ type: 'NOTIFY', payload: { loading: true } })

        let avatarUrl;
        if (typeof (avatar) !== 'string') {
            const photo = await imageUpload([avatar])
            avatarUrl = photo[0].url
        } else {
            avatarUrl = avatar
        }

        const res = await postData('admin/user', { ...userData, avatar: avatarUrl, name }, auth.token)
        if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

        setUserData(initialState)
        getData('admin/user', auth.token).then(res => {
            if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
            dispatch({ type: 'ADD_USERS', payload: res.users })
        })
        dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
        return router.push("/admin/data/users")
    }


    return (
        <Box component="form" onSubmit={handleSubmit} noValidate>
            <div>Here you can make register user without email verification (only for admin)</div>
            <br />
            <Grid container spacing={2}>
                <Grid item>
                    <Box sx={{ margin: "auto", textAlign: "center" }}>
                        <Box sx={{ width: 230, height: 230, background: theme.palette.background.paper, borderRadius: theme.shape.borderRadius / 2, overflow: "hidden", position: "relative", [theme.breakpoints.down("sm")]: { height: "200px", } }}>
                            {avatar && <img style={{ width: "100%", height: "100%" }} src={typeof (avatar) === 'string' ? avatar : (URL.createObjectURL(avatar))} alt="avatar" />}
                            <input type="file" name="file" hidden accept="image/*" id="icon-button-input-avatar-file-1" onChange={handleUploadAvatar} />
                            <label htmlFor="icon-button-input-avatar-file-1">
                                <IconButton sx={{ position: "absolute", top: 10, left: 10 }} component="span" >
                                    <AddPhotoAlternate />
                                </IconButton>
                            </label>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="First Name" name="firstname" value={firstname} onChange={handleChangeInput} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Last Name" name="lastname" value={lastname} onChange={handleChangeInput} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Email" name="email" value={email} onChange={handleChangeInput} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth type="password" label="Password" name="password" value={password} onChange={handleChangeInput} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth type="password" label="Confirm Password" name="cf_password" value={cf_password} onChange={handleChangeInput} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button disabled={!name || !email || !password || !cf_password} type="submit" variant="contained">Create</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default User