import * as React from "react";
import moment from "moment"

import { DataGrid, GridToolbar, GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid';
import { DataContext } from "../../../store/GlobalState"
import { useConfirm } from 'material-ui-confirm';

import Box from "@mui/material/Box"
import Zoom from '@mui/material/Zoom';
import Fab from "@mui/material/Fab"
import Stack from "@mui/material/Stack"
import Tooltip from "@mui/material/Tooltip"
import Chip from "@mui/material/Chip"
import IconButton from "@mui/material/IconButton"
import Switch from "@mui/material/Switch"

import AddOutlined from "@mui/icons-material/AddOutlined"
import CommentOutlined from "@mui/icons-material/CommentOutlined"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Delete from "@mui/icons-material/DeleteOutline"


import Link from 'next/link'
import millify from "millify";
import BlogActions from "./BlogActions";
import AdminNoData from "../../smallComponents/AdminNoData";
import { useTheme } from "@emotion/react";
import { deleteData, getData } from "../../../utils/fetchData";

const Blogs = () => {
    const { state, dispatch } = React.useContext(DataContext)
    const { blogs, auth } = state
    const theme = useTheme()
    const confirm = useConfirm()

    const [selectionModel, setSelectionModel] = React.useState([]);
    const [checkBoxSelection, setCheckBoxSelection] = React.useState(false);

    const handleBlogsDelete = () => {
        confirm({ description: `Are you sure you want to delete these blog post?`, confirmationText: "Yes" })
            .then(async () => {
                dispatch({ type: "NOTIFY", payload: { loading: true } });
                selectionModel.forEach(async blog => {
                    await deleteData(`admin/blog/${blog}`, auth.token).then(res => {
                        if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
                        dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
                    })
                })
                await getData("admin/blog", auth.token).then((res) => {
                    if (res.err) return dispatch({ type: "NOTIFY", payload: { error: res.err } });
                    dispatch({ type: "ADD_BLOGS", payload: res.blogs });
                });
            })
    }


    const columns = [
        { field: "id", headerName: "ID", width: 220, hide: true },
        { field: "thumbnail", headerName: "Thumbnail", sortable: false, width: 120, renderCell: (params) => <img style={{ width: 80, height: 40, borderRadius: 4, userSelect: "none" }} src={params.value} alt={params.value} /> },
        { field: "title", headerName: "Title", flex: 1, minWidth: 200 },
        {
            field: "data", headerName: "Data", sortable: false, minWidth: 230, renderCell: (params) =>
                <Stack sx={{ cursor: "default" }} spacing={1.75} flexGrow={1} direction="row">
                    <Tooltip title="Likes" arrow>
                        <Box width={35} display="flex" justifyContent='flex-start' alignItems='center'>
                            <ThumbUpIcon sx={{ width: 18, height: 18, mr: 0.75 }} />{millify(params.row.likes.length)}
                        </Box>
                    </Tooltip>
                    <Tooltip title="Dislikes" arrow>
                        <Box width={35} display="flex" justifyContent='flex-start' alignItems='center'>
                            <ThumbDownIcon sx={{ width: 18, height: 18, mr: 0.75 }} />{millify(params.row.dislikes.length)}
                        </Box>
                    </Tooltip>
                    <Tooltip title="Comments Count" arrow>
                        <Box width={35} display="flex" justifyContent='flex-start' alignItems='center'>
                            <CommentOutlined sx={{ width: 18, height: 18, mr: 0.75 }} />{millify(params.row.comments.filter(cm => !cm.reply).length)}
                        </Box>
                    </Tooltip>
                    <Tooltip title="Views Count" arrow>
                        <Box width={35} display="flex" justifyContent='flex-start' alignItems='center'>
                            <VisibilityIcon sx={{ width: 18, height: 18, mr: 0.75 }} />{millify(params.row.views)}
                        </Box>
                    </Tooltip>
                </Stack>
        },
        { field: "status", headerName: "Status", renderCell: (params) => <>{params.value == "draft" ? <Chip size="small" sx={{ borderRadius: "4px", color: "warning.main", fontWeight: 700, boxShadow: `inset -31px 11px 300px -200px ${theme.palette.warning.main}` }} label="Draft" clickable /> : <Chip size="small" sx={{ borderRadius: "4px", color: "success.main", fontWeight: 700, boxShadow: `inset -31px 11px 300px -200px ${theme.palette.success.main}` }} label="Published" clickable />}</> },
        { field: "description", headerName: "Description", width: 250, hide: true },
        { field: "htmlContent", headerName: "HTML Content", width: 250, hide: true },
        { field: "markdownContent", headerName: "Markdown Content", width: 250, hide: true },
        { field: "createdAt", headerName: "Created On", width: 120, renderCell: (params) => <>{moment(params.value).format("DD MMM YYYY")}</> },
        { field: "actions", headerName: "Actions", sortable: false, width: 100, renderCell: (params) => <BlogActions params={params} /> },
    ];

    const gridColumns = React.useMemo(
        () => [
            { ...GRID_CHECKBOX_SELECTION_COL_DEF, width: 70, headerName: "Checkbox Selection",type:String },
            ...columns,
        ],
        [columns],
    );

    var rows = []
    blogs.forEach((element) => {
        rows.push({ ...element, id: element._id })
    });


    return (
        <>
            <Box sx={{ height: "auto", width: '100%', maxWidth: "95vw" }}>
                <DataGrid
                    rows={rows}
                    columns={gridColumns}
                    autoHeight
                    onSelectionModelChange={(newSelectionModel) => { setSelectionModel(newSelectionModel); }}
                    selectionModel={selectionModel}
                    checkboxSelection={true}
                    disableSelectionOnClick
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    components={{
                        Toolbar: () => {
                            return (
                                <>
                                    <Box display="flex" alignItems="center">
                                        <GridToolbar sx={{ flexGrow: 1 }} />
                                        {selectionModel.length > 0 && <Tooltip arrow title="Checkbox Selection Toggle">
                                            <IconButton sx={{ ml: 0.5 }} color="error" onClick={handleBlogsDelete}>
                                                <Delete fontSize="small" />
                                            </IconButton>
                                        </Tooltip>}
                                    </Box>
                                </>
                            );
                        },
                        NoRowsOverlay: AdminNoData
                    }}
                />

            </Box>
            <Link href="/admin/create/blog">
                <Zoom in>
                    <Fab sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 8000 }} size="small" color="primary" aria-label="add">
                        <AddOutlined />
                    </Fab>
                </Zoom>
            </Link>
        </>
    );
};

export default Blogs;
