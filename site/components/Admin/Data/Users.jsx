import React from "react";
import moment from "moment"
import { DataContext } from "../../../store/GlobalState"
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

// Material UI Components 
import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"

import Zoom from '@mui/material/Zoom';
import Fab from "@mui/material/Fab"
import AddOutlined from "@mui/icons-material/AddOutlined"
import Link from 'next/link'


// Material UI Icons 
import CloseOutlined from "@mui/icons-material/CloseOutlined"
import DoneOutlined from "@mui/icons-material/DoneOutlined"
import UserActions from "./UserActions";
import AdminNoData from "../../smallComponents/AdminNoData";


const Users = () => {
  const { state } = React.useContext(DataContext)
  const { users, auth } = state

  const columns = [
    { field: "id", headerName: "ID", width: 220 ,hide:true},
    { field: "avatar", headerName: "Avatar", width: 75,sortable: false, renderCell: (params) => <Avatar src={params.value} /> },
    { field: "name", headerName: "Name", width: 130 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 200},
    {
      field: "role", headerName: "Is Admin",width: 200, renderCell: (params) => <>{params.value == "admin" ? <> <DoneOutlined color="success" sx={{ mr: 1 }} />   <Typography sx={{ color: (theme) => { return theme.palette.primary.main } }} >{auth.user.email == params.row.email ? " ( You ) " : ""} {params.row.root ? " ( ROOT ) " : ""} </Typography> </> : <CloseOutlined color="error" />}</>
    },
    {
      field: "isBan", headerName: "Is Ban", renderCell: (params) => <>{params.value == true ? <DoneOutlined color="error" /> : <CloseOutlined color="inherit" />}</>
    },
    {
      field: "createdAt", headerName: "Created At", hide: auth.user.root, renderCell: (params) => <>{moment(params.value).fromNow()}</>
    },
    {
      field: "actions", headerName: "Actions",sortable: false, hide: !auth.user.root, renderCell: (params) => <>{auth.user.root && <UserActions params={params} />} </>
    },
  ];

  var rows = []
  users.forEach((element) => {
    rows.push({ ...element, id: element._id })
  });

  return (
    <Box sx={{ height: "auto", width: '100%', maxWidth: "95vw" }}>
      <DataGrid rows={rows} columns={columns} autoHeight disableSelectionOnClick rowsPerPageOptions={[5, 10, 25, 50,100]} components={{ Toolbar: GridToolbar,NoRowsOverlay:AdminNoData}} />
      <Link href="/admin/create/user">
                <Zoom in>
                    <Fab sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 8000 }} size="small" color="primary" aria-label="add">
                        <AddOutlined />
                    </Fab>
                </Zoom>
            </Link>
    </Box>
  );
};

export default Users;
