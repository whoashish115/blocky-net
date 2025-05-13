import React from 'react'

import { DataContext } from "../../../store/GlobalState"
import { deleteData, getData, putData } from "../../../utils/fetchData";
import { useConfirm } from 'material-ui-confirm';
import { useRouter } from "next/router"


// Material UI 
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"

import MoreVert from "@mui/icons-material/MoreVert"
import Delete from "@mui/icons-material/DeleteOutline"
import Block from "@mui/icons-material/Block"
import SupervisorAccount from "@mui/icons-material/SupervisorAccountOutlined"


const UserActions = ({ params }) => {
  const { state, dispatch } = React.useContext(DataContext)
  const { auth } = state
  const confirm = useConfirm()

  // For Menu 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteUser = async () => {
    if (auth.user.root)
    
    confirm({ description: `Are you sure you want to delete ${params.row.name} (user) ?`, confirmationText: "Yes" }).then(async () => {
      dispatch({ type: "NOTIFY", payload: { loading: true } });
      
      if (auth.user._id == params.id || params.row.root) { return dispatch({ type: 'NOTIFY', payload: { error: "You Cannot Delete Root User" } })}

        await deleteData(`admin/user/${params.id}`, auth.token).then(res => {
          if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
          dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
        })


        await getData('admin/user', auth.token).then(res => {
          if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
          dispatch({ type: 'ADD_USERS', payload: res.users })
        })

      })
  }
  const makeAdminUser = async () => {
    if (auth.user.root)

      confirm({ description: `Are you sure you want to ${params.row.role == "user" ? "admin" : "unadmin"} this user (${params.row.name}) ? `, confirmationText: "Yes" }).then(async () => {
        dispatch({ type: "NOTIFY", payload: { loading: true } });

        if (auth.user._id == params.id || params.row.root) { return dispatch({ type: 'NOTIFY', payload: { error: "You Cannot Unadmin Root User" } })}

        const res = await putData(`admin/user/${params.id}`, { role: params.row.role =="user" ? "admin" : "user", isBan: params.row.isBan }, auth.token)
        if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
        dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
        
        await getData('admin/user', auth.token).then(res => {
          if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
          dispatch({ type: 'ADD_USERS', payload: res.users })
        })
        
      })
    }
  const makeBanUser = async () => {
    if (auth.user.root)

      confirm({ description: `Are you sure you want to ${params.row.isBan == false ? "ban" : "unban"} this user (${params.row.name}) ?`, confirmationText: "Yes" }).then(async () => {
        dispatch({ type: "NOTIFY", payload: { loading: true } });

        if (auth.user._id == params.id || params.row.root) { return dispatch({ type: 'NOTIFY', payload: { error: "You Cannot Ban Root User" } })}

        const res = await putData(`admin/user/${params.id}`, { role: params.row.role, isBan: !params.row.isBan }, auth.token)
        if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
        dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
        
        await getData('admin/user', auth.token).then(res => {
          if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
          dispatch({ type: 'ADD_USERS', payload: res.users })
        })

      })
  }

  return (
    <>
    
      <IconButton onClick={handleClick} disabled={!auth.user.root} color="inherit">
        <MoreVert fontSize='small' />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose} PaperProps={{ elevation: 0 }} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>

        <MenuItem sx={{ color: "info.main" }} onClick={makeAdminUser}>
          <ListItemIcon>
            <SupervisorAccount fontSize="small" color="info" />
          </ListItemIcon>
          {params.row.role == "admin" ? "Remove Admin" : "Make Admin"}
        </MenuItem>

        <MenuItem sx={{ color: "warning.main" }} onClick={deleteUser}>
          <ListItemIcon>
            <Delete fontSize="small" color="warning" />
          </ListItemIcon>
          Delete
        </MenuItem>

        <MenuItem sx={{ color: "error.main" }} onClick={makeBanUser}>
          <ListItemIcon>
            <Block fontSize="small" color="error" />
          </ListItemIcon>
          {params.row.isBan ? "Unban" : "Ban"}
        </MenuItem>
        
      </Menu>
    </>
  )
}

export default UserActions