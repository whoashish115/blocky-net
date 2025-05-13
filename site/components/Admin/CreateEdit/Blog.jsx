import * as React from 'react'
import { DataContext } from '../../../store/GlobalState';
import { imageUpload } from "../../../utils/imageUpload"
import { getData, postData, putData } from '../../../utils/fetchData';


import { useTheme } from '@emotion/react';
import { useRouter } from 'next/router'

// Markdown Editor Components And Slug
import InnerHTML from 'dangerously-set-html-content'
import MarkdownIt from 'markdown-it';

import MdEditor from "react-markdown-editor-lite"
import slugify from "react-slugify"
import 'react-markdown-editor-lite/lib/index.css';

// Material UI Components 
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import Avatar from "@mui/material/Avatar"
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from "@mui/material/FormControl"
import Grid from "@mui/material/Grid"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import OutlinedInput from "@mui/material/OutlinedInput"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Select from "@mui/material/Select"

// Material UI Icons 
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const Blog = () => {
    const initialState = { title: "", description: "", slug: "", htmlContent: "<h1>hello world</h1>", markdownContent: "# hello world", tags: [], status: "draft", authors: [], categories: [] };
    const [blogData, setBlogData] = React.useState(initialState);
    const { title, description, authors, tags, categories, slug, htmlContent, markdownContent, status } = blogData;
    const [slugHelperText, setSlugHelperText] = React.useState("")
    const [thumbnail, setThumbnail] = React.useState("")

    const { state, dispatch } = React.useContext(DataContext);
    const { auth, users } = state;
    const theme = useTheme()
    const [onEdit, setOnEdit] = React.useState(false)
    const router = useRouter()
    const { id } = router.query

    React.useEffect(() => {
        if (id) {
            getData(`admin/blog/${id}`, auth.token).then(res => {
                setBlogData(res?.blog)
                setThumbnail(res.blog ? res.blog.thumbnail :"")
            })
            setOnEdit(true)
        } else {
            setBlogData(initialState)
            setOnEdit(false)
        }
    }, [id])

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        if (name == "title") {
            setBlogData({ ...blogData, [name]: value, slug: slugify(value) });
        } else if (name == "slug") {
            setBlogData({ ...blogData, [name]: value });
            setSlugHelperText(slugify(value))
        } else if (name == "authors") {
            setBlogData({ ...blogData, authors: typeof value === 'string' ? value.split(',') : value });
        } else if (name == "categories") {
            setBlogData({ ...blogData, categories: typeof value === 'string' ? value.split(',') : value });
        } else {
            setBlogData({ ...blogData, [name]: value });
        }
    };
    const handleUploadThumbnail = e => {
        const file = e.target.files[0]
        if (!file)
            return dispatch({ type: 'NOTIFY', payload: { error: 'File does not exist.' } })

        if (file.size > 1024 * 1024 * 5)
            return dispatch({ type: 'NOTIFY', payload: { error: 'The largest image size is 1mb.' } })

        if (file.type !== "image/jpeg" && file.type !== "image/png") //1mb
            return dispatch({ type: 'NOTIFY', payload: { error: 'Image format is incorrect.' } })

        setThumbnail(file);
    }
    const handleSubmit = async (updateStatus) => {
        if (auth.user.role !== 'admin')
            return dispatch({ type: 'NOTIFY', payload: { error: 'Authentication is not valid.' } })

        if (!title || !description || !slug || !htmlContent || !markdownContent || authors.length == 0 || categories.length == 0)
            return dispatch({ type: 'NOTIFY', payload: { error: 'Please add all the fields.' } })

        if (slugify(slug) !== slug)
            return dispatch({ type: 'NOTIFY', payload: { error: 'Please Enter a valid slug' } })

        dispatch({ type: 'NOTIFY', payload: { loading: true } })

        let thumbnailUrl;
        if (typeof (thumbnail) !== 'string') {
            const photo = await imageUpload([thumbnail])
            thumbnailUrl = photo[0].url
        } else {
            thumbnailUrl = thumbnail
        }

        let res;
        if (onEdit) {
            res = await putData(`admin/blog/${id}`, { ...blogData, thumbnail: thumbnailUrl, status: updateStatus }, auth.token)
            if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

        } else {
            res = await postData('admin/blog', { ...blogData, thumbnail: thumbnailUrl, status: updateStatus }, auth.token)
            if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
        }
        setBlogData(initialState)
        await getData("admin/blog", auth.token).then((res) => {
            if (res.err) return dispatch({ type: "NOTIFY", payload: { error: res.err } });
            dispatch({ type: "ADD_BLOGS", payload: res.blogs });
        });
        dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
        return router.push("/admin/data/blogs")
    }

    const mdParser = new MarkdownIt({ html: true })
    function handleEditorChange({text}) {
        setBlogData({ ...blogData, htmlContent:  mdParser.render(text), markdownContent: text });
    }

    const adminList = users.filter(user => user.role == "admin");
    const buttonDisabled = Boolean(!title || !description || !slug || !htmlContent || !markdownContent || authors.length == 0 || categories.length == 0)

    return (
        <Box component="form" noValidate>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Title" name="title" value={title} onChange={handleChangeInput} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Slug" name="slug" value={slug} onChange={handleChangeInput} helperText={slugify(title) !== slug && slugify(slug) !== slug ? slugHelperText : ""} FormHelperTextProps={{ sx: { cursor: "pointer" }, onClick: () => { setBlogData({ ...blogData, slug: slugHelperText }); setSlugHelperText("") } }} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Description" name="description" value={description} onChange={handleChangeInput} multiline minRows={6} maxRows={6} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl sx={{ width: "100%" }}>

                                <InputLabel id="authors-select-label">Authors</InputLabel>
                                <Select
                                    labelId="authors-select-label"
                                    multiple
                                    fullWidth
                                    MenuProps={{ sx: { zIndex: 7005 } }}
                                    name="authors"
                                    value={authors}
                                    onChange={handleChangeInput}
                                    input={<OutlinedInput label="Authors" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} avatar={<Avatar alt={adminList.length !== 0 && adminList.filter(admin => admin._id == value)[0].name} src={adminList.length !== 0 ? adminList.filter(admin => admin._id == value)[0].avatar : ""} />} label={adminList.length !== 0 && adminList.filter(admin => admin._id == value)[0].name} />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {adminList.map((admin) => (
                                        <MenuItem
                                            key={admin._id}
                                            value={admin._id}
                                            sx={{ p: (0.75, 1.25), m: (0.75) }}
                                        >
                                            <Avatar alt={admin.name} sx={{ mr: 1, width: 30, height: 30 }} src={admin.avatar}></Avatar>
                                            {admin.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                        </Grid>
                        <Grid item xs={12}>
                            <FormControl sx={{ width: "100%" }}>

                                <InputLabel id="categories-select-label">Categories</InputLabel>
                                <Select
                                    multiple
                                    labelId="categories-select-label"
                                    fullWidth
                                    name="categories"
                                    MenuProps={{ sx: { zIndex: 7005 }, PaperProps: { sx: { ["&::before"]: { display: "none !Important" } } } }}
                                    value={categories}
                                    onChange={handleChangeInput}
                                    input={<OutlinedInput label="Categories" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={state.categories.length !== 0 && state.categories.filter(category => category._id === value)[0].name} />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {state.categories.map((category) => (
                                        <MenuItem
                                            key={category._id}
                                            value={category._id}
                                            sx={{ p: (0.75, 1.25), m: (0.75) }}
                                        >
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>

                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete multiple value={tags} onChange={(e, value) => setBlogData({ ...blogData, tags: value })} options={[]} freeSolo renderTags={(value, getTagProps) => value.map((option, index) => (<Chip key={index} sx={{ margin: 1 }} variant="outlined" label={option} {...getTagProps({ index })} />))} renderInput={(params) => (<TextField         {...params} variant="outlined" label="Tags" />)} />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Grid container spacing={{ xs: 1, md: 1.5 }}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" sx={{ p: 1 }}>Thumbnail</Typography>
                            <Box sx={{ width: "100%", height: "280px", background: theme.palette.background.paper, borderRadius: `${theme.shape.borderRadius}px`, overflow: "hidden", position: "relative", [theme.breakpoints.down("sm")]: { height: "200px", } }}>
                                <input type="file" name="file" hidden accept="image/*" id="icon-button-input-image-file-1" onChange={handleUploadThumbnail} />
                                <label style={{ cursor: "pointer", width: "100%", height: "100%" }} htmlFor="icon-button-input-image-file-1">
                                    {thumbnail ? <img style={{ width: "100%", height: "100%" }} src={typeof (thumbnail) === 'string' ? thumbnail : (URL.createObjectURL(thumbnail))} alt="thumbnail" />
                                        : <Box sx={{ opacity: 0.5, zIndex: 1, width: "100%", height: "100%", p: 1, display: 'flex', justifyContent: "center", alignItems: "center" }}>
                                            <Box sx={{ justifyContent: "center", alignItems: "center", display: 'flex', flexDirection: "column" }}>
                                                <CloudUploadIcon sx={{ width: 60, height: 60 }} />
                                                <Typography variant="body2" color="text.secondary">Width Height Ratio - 2:1</Typography>
                                            </Box>
                                        </Box>}
                                </label>
                            </Box>
                        </Grid>
                        {onEdit && <Grid item xs={12}>
                            <Box display="flex" justifyContent="flex-start" alignItems="center">
                                <Typography variant="subtitle2" sx={{ p: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>Status</Typography>
                                {status == "draft" ? <Chip size="small" sx={{ borderRadius: "4px", color: "warning.main", fontWeight: 700, boxShadow: `inset -31px 11px 300px -200px ${theme.palette.warning.main}` }} label="Draft" clickable /> : <Chip size="small" sx={{ borderRadius: "4px", color: "success.main", fontWeight: 700, boxShadow: `inset -31px 11px 300px -200px ${theme.palette.success.main}` }} label="Published" clickable />}
                            </Box>
                        </Grid>}
                    </Grid>
                </Grid>

                <Grid item xs={12} md={12} sx={{ color: theme.palette.text.primary }}>
                    <MdEditor config={{ htmlClass: "md-editor-html-class" }} style={{ height: '500px', zIndex: 7000 }} 
                    value={markdownContent} 
                    renderHTML={(text)=>mdParser.render(text)}
                     onChange={handleEditorChange} />
                </Grid>

                <Grid item xs={12} md={12}>
                    <Box textAlign="right">
                        {onEdit ?
                            <>
                                {status == "draft" ?
                                    // publish 
                                    <Button disabled={buttonDisabled} onClick={() => { handleSubmit("published") }} variant="outlined">Publish</Button> :
                                    // draft 
                                    <Button disabled={buttonDisabled} onClick={() => { handleSubmit("draft") }} variant="outlined">Revert To Draft</Button>}
                                {/* normal update  */}
                                <Button disabled={buttonDisabled} sx={{ marginLeft: { xs: 1, md: 1.5 } }} variant="contained" onClick={() => { handleSubmit(status) }} >{status == "draft" ? "Save" : "Update"}</Button>
                            </>
                            :
                            <>
                                {/* draft  */}
                                <Button disabled={buttonDisabled} onClick={() => { handleSubmit("draft") }} variant="outlined">Save As Draft</Button>
                                {/* publish  */}
                                <Button sx={{ marginLeft: { xs: 1, md: 1.5 } }} disabled={buttonDisabled} onClick={() => { handleSubmit("published") }} variant="contained">Publish</Button>
                            </>
                        }
                    </Box>
                </Grid>

            </Grid>
        </Box >
    )
}

export default Blog