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


const NavigationCategoryActions = ({ params }) => {
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

    const deleteNavigationCategory = async () => {
        confirm({ description: `Are you sure you want to delete "${params.row.name}"  this navigation category?`, confirmationText: "Yes" })
            .then(async () => {
                dispatch({ type: "NOTIFY", payload: { loading: true } });
                await deleteData(`admin/navigationCategory/${params.id}`, auth.token).then(res => {
                    if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
                    dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
                })
                getData("navigation").then((res) => {
                    if (res.err)
                      return dispatch({ type: "NOTIFY", payload: { error: res.err } });
                    dispatch({ type: "ADD_NAVIGATIONS", payload: res.navigations });
                  });
                  getData("navigationCategory").then((res) => {
                    if (res.err)
                      return dispatch({ type: "NOTIFY", payload: { error: res.err } });
                    dispatch({ type: "ADD_NAVIGATION_CATEGORIES", payload: res.navigationCategories });
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

                <MenuItem sx={{ color: "success.main" }} onClick={() => { router.push(`/admin/edit/navigationCategory/${params.id}`) }}>
                    <ListItemIcon>
                        <EditOutlined fontSize="small" color="success" />
                    </ListItemIcon>
                    Edit
                </MenuItem>

                <MenuItem sx={{ color: "error.main" }} onClick={deleteNavigationCategory}>
                    <ListItemIcon>
                        <Delete fontSize="small" color="error" />
                    </ListItemIcon>
                    Delete
                </MenuItem>

            </Menu>
        </>
    )
}

export default NavigationCategoryActions