import React from "react";

import moment from "moment"
import { DataContext } from "../../../store/GlobalState"
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box"
import NavigationCategoryActions from "./NavigationCategoryActions";
import AdminNoData from "../../smallComponents/AdminNoData";

import Zoom from '@mui/material/Zoom';
import Fab from "@mui/material/Fab"
import AddOutlined from "@mui/icons-material/AddOutlined"
import Link from 'next/link'


const NavigationCategories = () => {
    const { state } = React.useContext(DataContext)
    const { navigationCategories  } = state

    const columns = [
        { field: "id", headerName: "ID", width: 220 ,hide:true},
        { field: "index", headerName: "Index", width: 150 },
        { field: "name", headerName: "Name", flex: 1, minWidth: 200},
        { field: "createdAt", headerName: "Created At", width: 150,hide:true, renderCell: (params) => <>{moment(params.value).fromNow()}</> },
        { field: "actions", headerName: "Actions", sortable: false, width: 150, renderCell: (params) => <NavigationCategoryActions params={params} /> },
    ];

    var rows = []
    navigationCategories.sort().forEach((element) => {
        rows.push({ ...element, id: element._id })
    });

    return (
        <Box sx={{ height: "auto", width: '100%', maxWidth: "95vw" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                autoHeight
                disableSelectionOnClick
                rowsPerPageOptions={[5, 10, 25, 50,100]}
                components={{
                    Toolbar: GridToolbar,
                    NoRowsOverlay:AdminNoData
                }}
            />
              <Link href="/admin/create/navigationCategory">
                <Zoom in>
                    <Fab sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 8000 }} size="small" color="primary" aria-label="add">
                        <AddOutlined />
                    </Fab>
                </Zoom>
            </Link>
        </Box>
    );
};

export default NavigationCategories;
