import * as React from 'react'

import { DataContext } from '../../store/GlobalState'
import { useRouter } from 'next/router'
import { postData } from '../../utils/fetchData'
import valid from '../../utils/validate'
import Link from 'next/link'
import AuthPageCover from "./AuthPageCover"
import { useTheme } from '@emotion/react'

// Material UI Components 
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Grid from "@mui/material/Grid"

// Material Icons
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import VpnKeyOutlined from "@mui/icons-material/VpnKeyOutlined";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';


const SignUp = () => {
  const initialState = { firstname: '', lastname: '', email: '', password: '', cf_password: '' }
  const [userData, setUserData] = React.useState(initialState)
  const { firstname, lastname, email, password, cf_password } = userData
  const name = `${firstname} ${lastname}`

  const { state, dispatch } = React.useContext(DataContext)
  const { auth } = state
  const router = useRouter()
  const theme = useTheme()

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleChangeInput = e => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
    dispatch({ type: 'NOTIFY', payload: {} })
  }
  const handleSubmit = async e => {
    e.preventDefault()
    const errMsg = valid(name, email, password, cf_password)
    if (errMsg) return dispatch({ type: 'NOTIFY', payload: { error: errMsg } })
    dispatch({ type: 'NOTIFY', payload: { loading: true } })

    const res = await postData('auth/signup', userData)
    if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

    return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
  }
  React.useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push("/")
  }, [auth])

  return (
    <AuthPageCover title="SignUp" subtitle="SignUp Using Email">
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField variant="filled" fullWidth name="firstname" label="First Name" autoComplete="given-name" value={firstname} onChange={handleChangeInput} autoFocus InputProps={{ sx: { fontWeight: `500 !important` }, startAdornment: (<InputAdornment position="start"><PersonOutlineIcon fontSize="small" sx={{ color: firstname ? theme.palette.text.primary : theme.palette.text.secondary }} /></InputAdornment>) }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField variant="filled" fullWidth name="lastname" label="Last Name (optional)" autoComplete="family-name" value={lastname} onChange={handleChangeInput} InputProps={{ sx: { fontWeight: `500 !important` }, startAdornment: (<InputAdornment position="start"><PersonOutlineIcon fontSize="small" sx={{ color: lastname ? theme.palette.text.primary : theme.palette.text.secondary }} /></InputAdornment>) }} />
          </Grid>
          <Grid item xs={12}>
            <TextField variant="filled" fullWidth name="email" label="Email Address" autoComplete="email" value={email} onChange={handleChangeInput} InputProps={{ sx: { fontWeight: `500 !important` }, startAdornment: (<InputAdornment position="start"><EmailOutlined fontSize="small" sx={{ color: email ? theme.palette.text.primary : theme.palette.text.secondary }} /></InputAdornment>) }} />
          </Grid>
          <Grid item xs={12}>
            <TextField variant="filled" fullWidth name="password" label="Password" autoComplete="current-password" value={password} onChange={handleChangeInput} type={showPassword ? "text" : "password"} InputProps={{ sx: { fontWeight: `500 !important` }, startAdornment: (<InputAdornment position="start"><VpnKeyOutlined fontSize="small" sx={{ color: password ? theme.palette.text.primary : theme.palette.text.secondary }} /></InputAdornment>), endAdornment: (<InputAdornment position="end"> <IconButton onClick={() => { setShowPassword(!showPassword); }}  > {showPassword ? <Visibility fontSize="small" sx={{ color: password ? theme.palette.text.primary : theme.palette.text.secondary }} /> : <VisibilityOff fontSize="small" sx={{ color: password ? theme.palette.text.primary : theme.palette.text.secondary }} />} </IconButton> </InputAdornment>) }} />
          </Grid>
          <Grid item xs={12}>
            <TextField variant="filled" fullWidth name="cf_password" label="Confirm Password" autoComplete="current-password" value={cf_password} onChange={handleChangeInput} type={showConfirmPassword ? "text" : "password"} InputProps={{ sx: { fontWeight: `500 !important` }, startAdornment: (<InputAdornment position="start"> <VpnKeyOutlined fontSize="small" sx={{ color: cf_password ? theme.palette.text.primary : theme.palette.text.secondary }} /> </InputAdornment>), endAdornment: (<InputAdornment position="end"> <IconButton onClick={() => { setShowConfirmPassword(!showConfirmPassword); }} > {showConfirmPassword ? <Visibility fontSize="small" sx={{ color: cf_password ? theme.palette.text.primary : theme.palette.text.secondary }} /> : <VisibilityOff fontSize="small" sx={{ color: cf_password ? theme.palette.text.primary : theme.palette.text.secondary }} />} </IconButton> </InputAdornment>) }} />
          </Grid>
          <Grid item xs={12} sx={{paddingTop:"8px !important"}}>
            <Stack spacing={1}>

              <Stack spacing={0.5} direction="row" alignItems="center">
                <Checkbox size="small" value="remember" sx={{ color: theme.palette.text.secondary }} />
                <Typography color="text.secondary" variant="body2" sx={{ textTransform: "capitalize" }}>
                  Subscribe to our newsletter
                </Typography>
              </Stack>

              <Button disabled={!firstname || !email || !password || !cf_password} type="submit" fullWidth variant="contained" > Sign Up </Button>

              <Grid container justifyContent={"flex-end"}>
                <Grid item>
                  <Typography color="text.secondary" onClick={() => { router.push("/auth/signin") }} variant="caption" sx={{ cursor: "pointer", display: "inline", textTransform: "capitalize" }}>
                    Already Have an Account ?
                  </Typography>
                </Grid>
              </Grid>

            </Stack>
          </Grid>
        </Grid>
      </Box>
    </AuthPageCover >
  )
}

export default SignUp