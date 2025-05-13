import * as React from "react";

import { DataContext } from "../../store/GlobalState";
import { postData } from "../../utils/fetchData";
import { useRouter } from "next/router";
import Link from "next/link";
import AuthPageCover from "./AuthPageCover"

// Material UI Components 
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Alert from "@mui/material/Alert"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import Typography from "@mui/material/Typography"

import EmailOutlined from "@mui/icons-material/EmailOutlined";
import { useTheme } from "@emotion/react";


const ForgotPassword = () => {
    const initialState = { email: '', err: '', success: '' };
    const [data, setData] = React.useState(initialState)
    const { email, err, success } = data

    const { state, dispatch } = React.useContext(DataContext);
    const { auth } = state;
    const router = useRouter();
    const theme = useTheme();


    const handleChangeInput = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value, err: '', success: '' })
        dispatch({ type: "NOTIFY", payload: {} });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "NOTIFY", payload: { loading: true } });

        if (!email) { dispatch({ type: "NOTIFY", payload: { error: "Please Add Your Email" } }) }

        const res = await postData('/auth/forgotPassword', { email })
        setData({ ...data, err: err.msg ? err.msg : "", success: res.msg })
        return dispatch({ type: "NOTIFY", payload: { success: "success" } });
    };
    const resendEmail = async () => {
        try {
            await postData('/auth/forgotPassword', { email })
            setData({ ...data, err: err.msg ? err.msg : "", success: res.msg })
        } catch (err) {
            err.response.data.msg && setData({ ...data, err: err.response.data.msg, success: '' })
        }
    }
    React.useEffect(() => {
        if (Object.keys(auth).length !== 0) router.push("/");
    }, [auth]);

    return (
        <AuthPageCover title="Password Recovery" subtitle="Tell us your email so we can send you a reset link">
            <Grid container spacing={2}>
                {err && <Grid item xs={12}>
                    <Alert variant="filled" severity="error" sx={{textTransform:"capitalize"}}>{err}</Alert>
                </Grid>}

                {success && <>
                    <Grid item xs={12}>
                        <Alert variant="filled" severity="success" sx={{textTransform:"capitalize"}}>{success}</Alert>
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth onClick={resendEmail} variant="contained">Didn&apos;t Recieve the Email ? Resend Email</Button>
                    </Grid>
                </>}
            </Grid>

            {!success &&
                <Box component="form" onSubmit={handleSubmit} noValidate >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField autoComplete="email" variant="filled" fullWidth type="email" margin="normal" label="Email" autoFocus name="email" id="email" value={email} onChange={handleChangeInput} InputProps={{ sx: { fontWeight: `500 !important` }, startAdornment: (<InputAdornment position="start"><EmailOutlined fontSize="small" sx={{ color: email ? theme.palette.text.primary : theme.palette.text.secondary }} /></InputAdornment>) }} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button disabled={!email} fullWidth variant="contained" disableElevation type="submit">Recover Password</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display='flex' justifyContent="flex-end" >
                                <Typography color="text.secondary" onClick={() => { router.push("/auth/signin") }} variant="caption" sx={{ cursor: "pointer", display: "inline", textTransform: "capitalize" }}>
                                    Go Back To Login Page
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            }

        </AuthPageCover>
    );
};

export default ForgotPassword;
