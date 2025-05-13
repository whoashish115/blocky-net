import React from 'react'
import { useRouter } from 'next/router';

// Material UI Components 
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import Dialog from "@mui/material/Dialog"
import Button from "@mui/material/Button"
import DialogTitle from "@mui/material/DialogTitle"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"

// Material UI Icons 
import Close from '@mui/icons-material/Close'
import { DataContext } from '../../../../store/GlobalState';


const ReportComment = () => {
    const { state, dispatch } = React.useContext(DataContext)
    const { reportcomment } = state
    const handleClose = () => dispatch({type:"REPORT_COMMENT",payload:""})
    const handleReport = () => dispatch({type:"REPORT_COMMENT",payload:""})

    return (
            <Dialog maxWidth="xs" open={reportcomment.comment && reportcomment.comment._id ? true : false} onClose={handleClose} scroll="body" fullWidth>

                {/* CloseIcon  */}
                <Tooltip title="Close" arrow>
                    <IconButton sx={{ position: "absolute !important", right: 8, top: 8, strokeWidth: 1, stroke: (theme) => { return theme.palette.text.primary } }} onClick={handleClose} >
                        <Close color="inherit" fontSize="small" />
                    </IconButton>
                </Tooltip>

                {/* Title  */}
                <DialogTitle>Report</DialogTitle>

                {/* Content  */}
                <DialogContent sx={{ paddingBottom: 0 ,lineHeight:"1 !important"}}>
                    <Typography variant="caption" color="text.secondary">Report Comment</Typography>
                </DialogContent>

                {/* Actions  */}
                <DialogActions >
                    <Button onClick={handleClose}>
                    Cancel
                    </Button>
                    <Button variant="contained" onClick={handleReport}>
                        Report
                    </Button>
                </DialogActions>

            </Dialog>
    )
}

export default ReportComment
