import React from 'react'
import { IconButton, Tooltip, Box, MenuItem, Menu as MUIMenu, ListItemIcon } from '@mui/material'
import { DeleteOutline, EditOutlined, FlagOutlined, MoreVertOutlined } from '@mui/icons-material'
import { DataContext } from '../../../../store/GlobalState';
import { deleteData } from '../../../../utils/fetchData';

const CommentMenu = ({ blog,setBlog, comment, setOnEdit ,setOnReply}) => {

    const { state,dispatch } = React.useContext(DataContext);
    const { auth } = state;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event) => { setAnchorEl(event.currentTarget) }
    const handleMenuClose = () => { setAnchorEl(null) }

    const handleRemove = () => {
        if (comment.user._id === auth.user._id) {
            const deleteArr = [...blog.comments.filter(cm => cm.reply === comment._id), comment]
            const newBlog = {...blog,comments: blog.comments.filter(cm => !deleteArr.find(da => cm._id === da._id))}
            setBlog(newBlog)
            deleteArr.forEach(item => {deleteData(`comment/actions/${item._id}/delete`, auth.token)})
        }
    }
    const handleReportComment = async () => {
        await dispatch({type:"REPORT_COMMENT",payload:comment})
    }

    const Menu = (
        <MUIMenu anchorEl={anchorEl} open={open} onClose={handleMenuClose} onClick={handleMenuClose} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
            <MenuItem onClick={() => {setOnReply(false);setOnEdit(true)}}>
                <ListItemIcon >
                    <EditOutlined fontSize="small" />
                </ListItemIcon>
                Edit
            </MenuItem>
            <MenuItem onClick={handleRemove}>
                <ListItemIcon>
                    <DeleteOutline fontSize="small" />
                </ListItemIcon>
                Delete
            </MenuItem>
        </MUIMenu>
    )

    return (
        <Box>
            <Tooltip title="Menu">
                <IconButton onClick={handleMenuClick}>
                    <MoreVertOutlined fontSize="small" />
                </IconButton>
            </Tooltip>
            {auth.user && comment.user._id === auth.user._id ? Menu :
                <MUIMenu anchorEl={anchorEl} open={open} onClose={handleMenuClose} onClick={handleMenuClose} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} >
                    <MenuItem onClick={handleReportComment}>
                        <ListItemIcon>
                            <FlagOutlined fontSize="small" />
                        </ListItemIcon>
                        Report
                    </MenuItem>
                </MUIMenu>
                }
        </Box>
    )
}

export default CommentMenu
