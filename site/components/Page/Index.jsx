import React from 'react'

import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import InnerHTML from 'dangerously-set-html-content'
import { useRouter } from "next/router"
import { useTheme } from '@emotion/react'
import ContactUs from './ContactUs'

const Index = ({ page }) => {
    const theme = useTheme()
    const router = useRouter()
    const { slug } = router.query
    if(slug == "contact-us") return <ContactUs/>
    else{

    }
    return (
        <>
            <Stack spacing={1.5}>
                <Box sx={{ background: theme.palette.background.paper, p: 1.5 }}>
                    <Typography sx={{ textTransform: "capitalize" }} variant="h5" textAlign="center">{page.title}</Typography>
                </Box>
                <Box sx={{ background: theme.palette.background.paper, p: 1.5 }}>
                    <Box className='md-editor-html-class' sx={{ wordWrap: "break-word" }}>
                        <InnerHTML html={page.htmlContent} />
                    </Box>
                </Box>
            </Stack>
        </>
    )
}

export default Index