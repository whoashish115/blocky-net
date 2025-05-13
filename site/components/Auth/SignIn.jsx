import React from "react";

import AuthPageCover from "./AuthPageCover"
import { DataContext } from "../../store/GlobalState";
import { postData } from "../../utils/fetchData";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import Link from "next/link";
import { useTheme } from "@emotion/react";
import { validateEmail } from "../../utils/validate";

// Material UI Components 
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import Grid from "@mui/material/Grid"
import InputAdornment from "@mui/material/InputAdornment"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"

// Material Icons 
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import VpnKeyOutlined from "@mui/icons-material/VpnKeyOutlined";

const SignIn = () => {
  const { state, dispatch } = React.useContext(DataContext);
  const { auth } = state;
  const router = useRouter();
  const theme = useTheme()

  const initialState = { email: "", password: "" };
  const [userData, setUserData] = React.useState(initialState);
  const { email, password } = userData;

  const [showPassword, setShowPassword] = React.useState(false)

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!email || !password) return dispatch({ type: "NOTIFY", payload: { error: "Please Add Email Or Password" } });
    
    const validate = validateEmail(email)
    if(!validate) return dispatch({ type: "NOTIFY", payload: { error: "Email is Invalid" } });

    dispatch({ type: "NOTIFY", payload: { loading: true } });

    const res = await postData("auth/signin", userData);
    if (res.err) return dispatch({ type: "NOTIFY", payload: { error: res.err } });

    Cookie.set("refreshtoken", res.refresh_token, { expires: 7, path: "api/auth/accessToken" });
    localStorage.setItem("firstLogin", true);
    dispatch({ type: "AUTH", payload: { token: res.access_token, user: res.user, }, });

    return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  };

  React.useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push("/");
  }, [auth]);

  return (
    <AuthPageCover title="SignIn" subtitle="SignIn Using Email">
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField variant="filled" autoComplete="email" fullWidth label="Email" name="email" value={email} onChange={handleChangeInput} InputProps={{ sx: { fontWeight: `500 !important` }, startAdornment: (<InputAdornment position="start"><EmailOutlined fontSize="small" sx={{ color: email ? theme.palette.text.primary : theme.palette.text.secondary }} /></InputAdornment>) }} autoFocus />
          </Grid>
          <Grid item xs={12}>
            <TextField variant="filled" autoComplete="current-password" fullWidth label="Password" name="password" value={password} type={showPassword ? "text" : "password"} onChange={handleChangeInput} InputProps={{ sx: { fontWeight: `500 !important` }, startAdornment: (<InputAdornment position="start"> <VpnKeyOutlined fontSize="small" sx={{ color: email ? theme.palette.text.primary : theme.palette.text.secondary }} /></InputAdornment>), endAdornment: (<InputAdornment position="end"><IconButton onClick={() => { setShowPassword(!showPassword) }} >  {showPassword ? <Visibility fontSize="small" sx={{ color: password ? theme.palette.text.primary : theme.palette.text.secondary }} /> : <VisibilityOff fontSize="small" sx={{ color: email ? theme.palette.text.primary : theme.palette.text.secondary }} />}</IconButton></InputAdornment>) }} />
          </Grid>
          <Grid item xs={12} sx={{paddingTop:"8px !important"}}>
            <Stack spacing={1}>
              
              <Stack spacing={0.5} direction="row" alignItems="center">
                <Checkbox size="small" value="remember" sx={{ color: theme.palette.text.secondary }} />
                <Typography color="text.secondary" variant="body2" sx={{ textTransform: "capitalize" }}>
                  Remember me
                </Typography>
              </Stack>


              <Button disabled={!email || !password} type="submit" fullWidth variant="contained"> Sign In </Button>

              <Grid container>
                <Grid item xs>
                  <Typography color="text.secondary" onClick={() => { router.push("/auth/forgotpassword") }} variant="caption" sx={{ cursor: "pointer", display: "inline", textTransform: "capitalize" }}>
                    Forgot Password ?
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography color="text.secondary" onClick={() => { router.push("/auth/signup") }} variant="caption" sx={{ cursor: "pointer", display: "inline", textTransform: "capitalize" }}>
                    Don&apos;t have an account?
                  </Typography>
                </Grid>
              </Grid>

            </Stack>
          </Grid>
        </Grid>
      </Box>
    </AuthPageCover>
  );
};

export default SignIn;
