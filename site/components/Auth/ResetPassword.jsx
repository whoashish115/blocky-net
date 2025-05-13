import * as React from "react";

import { DataContext } from "../../store/GlobalState";
import { postData } from "../../utils/fetchData";
import { useRouter } from "next/router";

import Link from "next/link";
import AuthPageCover from "./AuthPageCover"

// Material UI Components 
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import InputAdornment from "@mui/material/InputAdornment"
import IconButton from "@mui/material/IconButton"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import { useTheme } from "@emotion/react";

// Material Icons 
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import VpnKeyOutlined from "@mui/icons-material/VpnKeyOutlined";

const ResetPassword = () => {
    const initialState = { password: '',cf_password:'', err: '', success: '' };
    const [data, setData] = React.useState(initialState)
    const { password,cf_password, err, success } = data

    const { state, dispatch } = React.useContext(DataContext);
    const { auth } = state;
    const router = useRouter();
    const theme = useTheme()
    const {token } = router.query

    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);


    const handleChangeInput = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value, err: '', success: '' })
        dispatch({ type: "NOTIFY", payload: {} });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch({ type: "NOTIFY", payload: { loading: true } });

        const res = await postData("auth/resetPassword", {password},token);
        if (res.err) return setData({ ...initialState,err:res.err })

        dispatch({ type: "NOTIFY", payload: { loading: false } });
        return setData({ ...initialState,success:res.msg })
    };
    
    React.useEffect(() => {
        if (Object.keys(auth).length !== 0) router.push("/");
    }, [auth]);

    return (
        <AuthPageCover title="Password Reset" subtitle="Reset your account password">
           <Box >
                <Grid container spacing={2}>
                    {err && <Grid item xs={12}>
                        <Alert variant="filled" severity="error" sx={{textTransform:"capitalize"}}>{err}</Alert>
                    </Grid>}

                    {success && <>
                        <Grid item xs={12}>
                            <Alert variant="filled" severity="success" sx={{textTransform:"capitalize"}}>{success}</Alert>
                        </Grid>
                        <Grid item xs={12}>
                                <Button onClick={()=>router.push("/auth/signin")} fullWidth variant="contained" sx={{cursor:"pointer",display:"inline"}}>Go To Login Page</Button>
                        </Grid>
                    </>}
                </Grid>
            </Box>

            {!success && <Box>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField variant="filled" fullWidth label="New Password" autoFocus name="password" value={password} onChange={handleChangeInput} type={showPassword ? "text" : "password"} InputProps={{ sx: { fontWeight: `500 !important` }, startAdornment: (<InputAdornment position="start"><VpnKeyOutlined fontSize="small" sx={{ color: password ? theme.palette.text.primary : theme.palette.text.secondary }} /></InputAdornment>), endAdornment: (<InputAdornment position="end"> <IconButton onClick={() => { setShowPassword(!showPassword); }}  > {showPassword ? <Visibility fontSize="small" sx={{ color: password ? theme.palette.text.primary : theme.palette.text.secondary }} /> : <VisibilityOff fontSize="small" sx={{ color: password ? theme.palette.text.primary : theme.palette.text.secondary }} />} </IconButton> </InputAdornment>) }}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField variant="filled" fullWidth label="Confirm Password" name="cf_password" value={cf_password} onChange={handleChangeInput} type={showConfirmPassword ? "text" : "password"} InputProps={{ sx: { fontWeight: `500 !important` }, startAdornment: (<InputAdornment position="start"> <VpnKeyOutlined fontSize="small" sx={{ color: cf_password ? theme.palette.text.primary : theme.palette.text.secondary }} /> </InputAdornment>), endAdornment: (<InputAdornment position="end"> <IconButton onClick={() => { setShowConfirmPassword(!showConfirmPassword); }} > {showConfirmPassword ? <Visibility fontSize="small" sx={{ color: cf_password ? theme.palette.text.primary : theme.palette.text.secondary }} /> : <VisibilityOff fontSize="small" sx={{ color: cf_password ? theme.palette.text.primary : theme.palette.text.secondary }} />} </IconButton> </InputAdornment>) }}/>
                        </Grid>
                        <Grid item xs={12} sx={{paddingTop:"20px !important"}}>
                            <Button disabled={!password || !cf_password} fullWidth variant="contained" disableElevation type="submit">Reset Password</Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
            }

        </AuthPageCover>
    );
};

export default ResetPassword;
