import React from 'react'

// Material UI Components 
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import Button from "@mui/material/Button"
import InputBase from "@mui/material/InputBase"


// Material UI Icons 
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

import { useRouter } from 'next/router'
import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { DataContext } from '../../../store/GlobalState'
import { validateEmail } from "../../../utils/validate"
import { postData } from '../../../utils/fetchData'

const NewsletterComponent = styled(Paper)(({ theme }) => ({
    width: '100%',
    background: theme.palette.background.paperSecondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 4,
}));
const NewsletterInputBase = styled(InputBase)(({ theme }) => ({
    '& .MuiInputBase-input': {
        transition: theme.transitions.create('width'),
        width: "100%",
    },
}));

const Newsletter = () => {
    const router = useRouter()
    const theme = useTheme()
    const { state, dispatch } = React.useContext(DataContext);
    const { auth } = state;

    const [email, setEmail] = React.useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()

        const validation = validateEmail(email)
        if (!validation) {
            return dispatch({ type: "NOTIFY", payload: { error: "Please Enter a valid email address" } });
        }
        const res = await postData("newsletter", { email });
        if (res.err) {
            dispatch({ type: "NOTIFY", payload: { error: res.err } });
        }else{
            dispatch({ type: "NOTIFY", payload: { success: res.msg } });
        }
        setEmail("")
    }

    return (
        <>
            <Grid item xs={12}>
                <Paper sx={{ p: { xs: 1, md: 1.5 }, wordWrap: "break-word" }}>
                    <Typography p={0.5} gutterBottom variant="subtitle1" sx={{ textTransform: "capitalize", borderRadius: `${theme.shape.borderRadius}px`, textAlign: "center", p: 1 }}>Subscribe Our Newsletter</Typography>
                    <Box onSubmit={handleSubmit} component="form" display="flex" sx={{ flexWrap: "wrap" }}>
                        <NewsletterComponent>
                            <IconButton disableRipple sx={{ margin: 0.5,opacity: email ? 1 : 0.5,background:"transparent",cursor:"default",color:theme.palette.mode == "dark" ? "inherit":`${theme.palette.text.secondary}`}} size={"small"}>
                                <EmailOutlinedIcon fontSize="small" />
                            </IconButton>
                            <NewsletterInputBase onChange={(e) => { setEmail(e.target.value) }} value={email} fullWidth placeholder="xyz@email.com" inputProps={{ 'aria-label': 'xyz@email.com' }} />
                            <Button disabled={!email} type="submit" variant="contained" sx={{ margin: 0.75, paddingX: 4 }}>Subscribe</Button>
                        </NewsletterComponent>
                    </Box>
                </Paper>
            </Grid>
        </>
    )
}

export default Newsletter