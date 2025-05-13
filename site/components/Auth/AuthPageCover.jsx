import React from 'react'

// Material UI Components 
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from '@emotion/react'
import { useRouter } from 'next/router'

const AuthPageCover = ({ title, subtitle, children ,backButton}) => {
    const theme = useTheme()
    const router = useRouter()

    return (
        <Box sx={{ minHeight: "calc( 100vh - 24px )", display: "flex", alignItems: 'center', padding: { xs: 2, sm: 2.5, md: 3 }, justifyContent: 'center' }}>

            {backButton == false ? "" : <Box sx={{ position: 'fixed', top: 15, left: 15, zIndex: 5000 }}>
                <Tooltip title="Go Back To Home Page" arrow placement="right">
                    <IconButton size="small" onClick={() => { router.push("/") }} color="inherit">
                        <ArrowBackIcon sx={{ strokeWidth: 1, stroke:  theme.palette.text.primary ,color:theme.palette.mode == "light" ? theme.palette.text.primary : "inherit" }} fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>}

            <Box sx={{ background: theme.palette.background.paper, borderRadius: `${theme.shape.borderRadius * 2}px`, maxWidth: "500px", width: "100%", padding: { xs: 1.5, md: 2.5 } }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 1.5 }}>
                    <Typography component="h6" variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
                        {title}
                    </Typography>
                    {subtitle &&
                        <Typography color="text.secondary" component="h6" variant="caption" >
                            {subtitle}
                        </Typography>}
                </Box>
                {children}
            </Box>

        </Box>
    )
}

export default AuthPageCover