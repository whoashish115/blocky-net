import React from "react";

import moment from "moment"
import { DataContext } from "../../../store/GlobalState"
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import Box from "@mui/material/Box"
import Switch from '@mui/material/Switch';

import Zoom from '@mui/material/Zoom';
import Fab from "@mui/material/Fab"
import AddOutlined from "@mui/icons-material/AddOutlined"
import Link from 'next/link'

import NavigationActions from "./NavigationActions";
import AdminNoData from "../../smallComponents/AdminNoData";
import CircleIcon from '@mui/icons-material/Circle';


const Navigations = () => {
    const { state } = React.useContext(DataContext)
    const { navigations } = state
    const [childrenFilter, setChildrenFilter] = React.useState(false);

    const columns = [
        { field: "id", headerName: "ID", width: 220,hide:true },
        { field: "icon",sortable: false, headerName: "Icon", renderCell: (params) => <i style={{ fontSize: "16px",marginLeft:"8px" }} className={params.value} /> },
        { field: "name", headerName: "Name", flex: 1, minWidth: 200, },
        { field: "url", headerName: "Url", width: 150 },
        { field: "isChildren", headerName: "Is Children", minWidth: 100, renderCell: (params) => <>{params.value ? <CircleIcon color="info" /> : <CircleIcon color="inherit" />}</> },
        { field: "category", headerName: "Category", width: 150, renderCell: (params) => <>{params.value.name}</> },
        { field: "createdAt", headerName: "Created At", width: 150, hide: true, renderCell: (params) => <>{moment(params.value).fromNow()}</> },
        { field: "actions", headerName: "Actions",sortable: false, renderCell: (params) => <NavigationActions params={params} /> },
    ];

    var rows = []
    navigations.forEach((element) => {
        rows.push({ ...element, id: element._id })
    });

    return (
        <Box sx={{ height: "auto", width: '100%', maxWidth: "95vw" }}>
            <DataGrid
                rows={childrenFilter ? rows.filter(navigation => navigation.isChildren == false) : rows}
                columns={columns}
                autoHeight
                disableSelectionOnClick
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                components={{
                    Toolbar: () => {
                        return (
                            <>
                            <Box display="flex" alignItems="center">
                                {<GridToolbar sx={{ flexGrow:1 }} />}
                                <Switch size="small" checked={childrenFilter} onChange={(e) => setChildrenFilter(e.target.checked)} />
                            </Box>
                            </>
                        );
                    },
                    NoRowsOverlay: AdminNoData
                }}
            />
            <Link href="/admin/create/navigation">
                <Zoom in>
                    <Fab sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 8000 }} size="small" color="primary" aria-label="add">
                        <AddOutlined />
                    </Fab>
                </Zoom>
            </Link>
        </Box>
    );
};

export default Navigations;
