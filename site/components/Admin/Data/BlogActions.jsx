import React from 'react'

import { DataContext } from "../../../store/GlobalState"
import { deleteData, getData, patchData, putData } from "../../../utils/fetchData";
import { useConfirm } from 'material-ui-confirm';
import { useRouter } from "next/router"


// Material UI 
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"

// Material Ui Icons
import MoreVert from "@mui/icons-material/MoreVert"
import SendIcon from '@mui/icons-material/Send';
import SendAndArchiveIcon from '@mui/icons-material/SendAndArchive';
import Delete from "@mui/icons-material/DeleteOutline"
import EditOutlined from "@mui/icons-material/EditOutlined"
import VisibilityIcon from '@mui/icons-material/Visibility';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';


const BlogActions = ({ params }) => {
    const { state, dispatch } = React.useContext(DataContext)
    const { auth } = state
    const confirm = useConfirm()
    const router = useRouter()

    // For Menu 
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteBlogPost = async () => {
        confirm({ description: `Are you sure you want to delete "${params.row.title}"  this blog post?`, confirmationText: "Yes" })
            .then(async () => {
                dispatch({ type: "NOTIFY", payload: { loading: true } });
                await deleteData(`admin/blog/${params.id}`, auth.token).then(res => {
                    if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
                    dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
                })
                await getData("admin/blog", auth.token).then((res) => {
                    if (res.err) return dispatch({ type: "NOTIFY", payload: { error: res.err } });
                    dispatch({ type: "ADD_BLOGS", payload: res.blogs });
                });
                return
            })
    }
    const changeBlogPostStatus = async (status) => {
        confirm({ description: `Are you sure you want to ${status == "published" ? "publish" : "draft"} this blog post?`, confirmationText: "Yes" })
            .then(async () => {
                dispatch({ type: "NOTIFY", payload: { loading: true } });
                await patchData(`admin/blog/${params.id}/changeStatus`, { status }, auth.token).then(res => {
                    if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
                    dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
                })
                await getData("admin/blog", auth.token).then((res) => {
                    if (res.err) return dispatch({ type: "NOTIFY", payload: { error: res.err } });
                    dispatch({ type: "ADD_BLOGS", payload: res.blogs });
                });
                return
            })
    }

    return (
        <>


            <IconButton onClick={handleClick} color="inherit">
                <MoreVert fontSize='small' />
            </IconButton>

            <Menu anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose} PaperProps={{ elevation: 0 }} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>

                <MenuItem sx={{ color: "#51fcee" }} onClick={() => { router.push(`/admin/analytics/${params.row.slug}`) }}>
                    <ListItemIcon>
                        <AssessmentOutlinedIcon fontSize="small" sx={{color:"#51fcee"}} />
                    </ListItemIcon>
                    View Analytics
                </MenuItem>

                <MenuItem sx={{ color: "info.main" }} onClick={() => { router.push(`/admin/data/comments/${params.row.slug}`) }}>
                    <ListItemIcon>
                        <VisibilityIcon fontSize="small" color="info" />
                    </ListItemIcon>
                    View Comments
                </MenuItem>

                {params.row.status == "published" ?
                    <MenuItem sx={{ color: "warning.main" }} onClick={() => { changeBlogPostStatus("draft") }}>
                        <ListItemIcon>
                            <SendAndArchiveIcon fontSize="small" color="warning" />
                        </ListItemIcon>
                        Revert To Draft
                    </MenuItem>
                    : <MenuItem sx={{ color: "warning.main" }} onClick={() => { changeBlogPostStatus("published") }}>
                        <ListItemIcon>
                            <SendIcon fontSize="small" color="warning" />
                        </ListItemIcon>
                        Publish
                    </MenuItem>
                }


                <MenuItem sx={{ color: "success.main" }} onClick={() => { router.push(`/admin/edit/blog/${params.id}`) }}>
                    <ListItemIcon>
                        <EditOutlined fontSize="small" color="success" />
                    </ListItemIcon>
                    Edit
                </MenuItem>

                <MenuItem sx={{ color: "error.main" }} onClick={deleteBlogPost}>
                    <ListItemIcon>
                        <Delete fontSize="small" color="error" />
                    </ListItemIcon>
                    Delete
                </MenuItem>

            </Menu>
        </>
    )
}

export default BlogActions