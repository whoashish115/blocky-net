import React from 'react'

import Box from "@mui/material/Box"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import Chip from "@mui/material/Chip"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import Stack from "@mui/material/Stack"
import OutlinedInput from "@mui/material/OutlinedInput"
import Tooltip from "@mui/material/Tooltip"

import ContentCopy from '@mui/icons-material/ContentCopy'
import Share from '@mui/icons-material/Share'
import Close from '@mui/icons-material/Close'

import {
    FacebookShareButton, FacebookIcon,
    TelegramShareButton, TelegramIcon,
    TwitterShareButton, TwitterIcon,
    WhatsappShareButton, WhatsappIcon,
    LinkedinShareButton, LinkedinIcon,
    EmailShareButton, EmailIcon,
    PinterestShareButton, PinterestIcon,
    RedditShareButton, RedditIcon,
} from 'react-share'
import { useTheme } from '@emotion/react'
import { useMediaQuery } from '@mui/material'


const ShareBlog = ({ url, chipComponent }) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))
    const [shareOpen, setShareOpen] = React.useState(false)
    const handleClose = () => setShareOpen(false)
    const handleOpen = () => setShareOpen(true)

    const shareText = `Hey there ! See This Amazing Blog Post ${url}`
    const handleCopyUrl = () => navigator.clipboard.writeText(url)

    return (
        <>
            {chipComponent ?
                <Chip icon={<Share fontSize="small" />} sx={{cursor:'pointer'}} label="Share" color="primary" variant="outlined" onClick={handleOpen} />
                : <Tooltip title="Share" arrow>
                    <IconButton onClick={handleOpen}>
                        <Share fontSize="small" />
                    </IconButton>
                </Tooltip>}

            <Dialog maxWidth="xs" open={shareOpen} onClose={handleClose} scroll="body" fullWidth>

                {/* CloseIcon  */}
                <Tooltip title="Close" arrow>
                    <IconButton sx={{ position: "absolute !important", right: 8, top: 8, strokeWidth: 1, stroke: (theme) => { return theme.palette.text.primary } }} onClick={handleClose} >
                        <Close color="inherit" fontSize="small" />
                    </IconButton>
                </Tooltip>

                {/* Title  */}
                <DialogTitle>Share</DialogTitle>

                {/* Content  */}
                <DialogContent sx={{ padding: { xs: "10px 12px", md: "20px 24px" } }}>
                    <Stack spacing={1} direction="row" justifyContent="center">

                        <EmailShareButton url={shareText} style={{ display: isMobile ? "none" : "block", marginX: 16 }}>
                            <EmailIcon round={true} size={35} />
                        </EmailShareButton>

                        <FacebookShareButton url={shareText} style={{ marginX: 16 }}>
                            <FacebookIcon round={true} size={35} />
                        </FacebookShareButton>

                        <TwitterShareButton url={shareText} style={{ marginX: 16 }}>
                            <TwitterIcon round={true} size={35} />
                        </TwitterShareButton>

                        <LinkedinShareButton url={shareText} style={{ display: isMobile ? "none" : "block", marginX: 16 }}>
                            <LinkedinIcon round={true} size={35} />
                        </LinkedinShareButton>

                        <PinterestShareButton url={shareText} style={{ marginX: 16 }}>
                            <PinterestIcon round={true} size={35} />
                        </PinterestShareButton>

                        <RedditShareButton url={shareText} style={{ display: isMobile ? "none" : "block", marginX: 16 }}>
                            <RedditIcon round={true} size={35} />
                        </RedditShareButton>

                        <TelegramShareButton url={shareText} style={{ marginX: 16 }}>
                            <TelegramIcon round={true} size={35} />
                        </TelegramShareButton>

                        <WhatsappShareButton url={shareText} style={{ marginX: 16 }}>
                            <WhatsappIcon round={true} size={35} />
                        </WhatsappShareButton>

                    </Stack>

                    <Divider sx={{ paddingY: 1.5 }}>
                        <Chip label="OR" />
                    </Divider>

                    <Box display="flex" pt={2} fullWidth>
                        <OutlinedInput fullWidth value={url}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Tooltip title="copy" arrow>
                                        <IconButton onClick={handleCopyUrl}>
                                            <ContentCopy fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                            } />
                    </Box>

                </DialogContent>
            </Dialog>
        </>
    )
}

export default ShareBlog
