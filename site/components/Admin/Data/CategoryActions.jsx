import React from 'react'

import { DataContext } from "../../../store/GlobalState"
import { deleteData, getData } from "../../../utils/fetchData";
import { useConfirm } from 'material-ui-confirm';
import { useRouter } from "next/router"


// Material UI 
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"

// Material Ui Icons
import MoreVert from "@mui/icons-material/MoreVert"
import Delete from "@mui/icons-material/DeleteOutline"
import EditOutlined from "@mui/icons-material/EditOutlined"


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

    const deleteCategory = async () => {
        confirm({ description: `Are you sure you want to delete ${params.row.name} (category) ?`, confirmationText: "Yes" })
            .then(async () => {
                dispatch({ type: "NOTIFY", payload: { loading: true } });

                const res = await deleteData(`admin/category/${params.id}`, auth.token).then(res => {
                    if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
                    dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
                })

                await getData('category', auth.token).then(res => {
                    if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
                    dispatch({ type: 'ADD_CATEGORIES', payload: res.categories })
                })

                return 
            })
    }

    return (
        <>
            <IconButton onClick={handleClick} color="inherit">
                <MoreVert fontSize='small' />
            </IconButton>

            <Menu anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose} PaperProps={{ elevation: 0 }} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>

                <MenuItem sx={{ color: "success.main" }} onClick={() => {router.push(`/admin/edit/category/${params.id}`) }}>
                    <ListItemIcon>
                        <EditOutlined fontSize="small" color="success" />
                    </ListItemIcon>
                    Edit
                </MenuItem>

                <MenuItem sx={{ color: "error.main" }} onClick={deleteCategory}>
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