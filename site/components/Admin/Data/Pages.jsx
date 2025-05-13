import * as React from "react";
import moment from "moment"

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DataContext } from "../../../store/GlobalState"
import Box from "@mui/material/Box"

import Zoom from '@mui/material/Zoom';
import Fab from "@mui/material/Fab"
import AddOutlined from "@mui/icons-material/AddOutlined"
import Link from 'next/link'


import PageActions from "./PageActions";
import AdminNoData from "../../smallComponents/AdminNoData";

const Pages = () => {
    const { state } = React.useContext(DataContext)
    const { pages } = state

    const columns = [
        { field: "id", headerName: "ID", width: 250,hide:true },
        { field: "title", headerName: "Title", flex: 1, minWidth: 200 },
        { field: "slug", headerName: "Slug", width: 150},
        { field: "htmlContent", headerName: "Html Content", width: 150,hide:true},
        { field: "markdownContent", headerName: "Markdown Content", width: 150,hide:true},
        { field: "createdAt", headerName: "Created On", width: 150, renderCell: (params) => <>{moment(params.value).fromNow()}</> },
        { field: "actions", headerName: "Actions",sortable: false, width: 150, renderCell: (params) => <PageActions params={params} /> },

    ];
    var rows = []
    pages.forEach((element) => {
        rows.push({ ...element, id: element._id })
    });


    return (
        <>
            <Box sx={{ height: "auto", width: '100%', maxWidth: "95vw" }}>
                <DataGrid rows={rows} columns={columns} autoHeight disableSelectionOnClick rowsPerPageOptions={[5, 10, 25, 50, 100]} components={{ Toolbar: GridToolbar, NoRowsOverlay: AdminNoData }} />
            </Box>
            <Link href="/admin/create/page">
                <Zoom in>
                    <Fab sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 8000 }} size="small" color="primary" aria-label="add">
                        <AddOutlined />
                    </Fab>
                </Zoom>
            </Link>
        </>
    );
};

export default Pages;
