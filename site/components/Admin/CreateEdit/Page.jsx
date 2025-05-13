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
import FormControl from "@mui/material/FormControl"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import OutlinedInput from "@mui/material/OutlinedInput"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

import Select from "@mui/material/Select"

// Material UI Icons 
import AddPhotoAlternate from "@mui/icons-material/AddPhotoAlternate"


const Page = () => {
  const initialState = { title: "", slug: "", htmlContent: "", markdownContent: "" };
  const [pageData, setPageData] = React.useState(initialState);
  const { title, slug, htmlContent, markdownContent } = pageData;
  const [slugHelperText,setSlugHelperText] = React.useState("")

  const router = useRouter()
  const theme = useTheme()
  const { state, dispatch } = React.useContext(DataContext);
  const { auth } = state;

  const { id } = router.query
  const [onEdit, setOnEdit] = React.useState(false)


  React.useEffect(() => {
    if (id) {
      setOnEdit(true)
      getData(`admin/page/${id}`, auth.token).then(res => {
        setPageData(res.page)
      })
    } else {
      setOnEdit(false)
      setPageData(initialState)
    }
  }, [id])

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    if (name == "title") {
      setPageData({ ...pageData, [name]: value, slug: slugify(value) });
    } else if (name == "slug") {
      setPageData({ ...pageData, [name]: value });
      setSlugHelperText(slugify(value))
    } else {
      setPageData({ ...pageData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (auth.user.role !== 'admin')
      return dispatch({ type: 'NOTIFY', payload: { error: 'Authentication is not valid.' } })

    if (!title || !slug || !htmlContent || !markdownContent)
      return dispatch({ type: 'NOTIFY', payload: { error: 'Please add all the fields.' } })

    if (auth.user.role !== 'admin')
      return dispatch({ type: 'NOTIFY', payload: { error: 'Authentication is not valid.' } })

    dispatch({ type: 'NOTIFY', payload: { loading: true } })

    let res;
    if (onEdit) {
      res = await putData(`admin/page/${id}`, { ...pageData }, auth.token)
      if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

    } else {
      res = await postData('admin/page', { ...pageData }, auth.token)
      if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
    }
    setPageData(initialState)
    await getData("admin/page", auth.token).then((res) => {
      if (res.err) return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      dispatch({ type: "ADD_PAGES", payload: res.pages });
    });
    dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
    return router.push("/admin/data/pages")
  }

  const mdParser = new MarkdownIt()
  function handleEditorChange({ html, text }) {
    setPageData({ ...pageData, htmlContent: html, markdownContent: text });
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Grid container spacing={2}>

        <Grid item xs={12} md={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Title" name="title" value={title} onChange={handleChangeInput} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Slug" name="slug" value={slug} onChange={handleChangeInput} helperText={slugify(title) !== slug && slugify(slug) !== slug ? slugHelperText : ""}  FormHelperTextProps={{sx:{cursor:"pointer"},onClick: () => {setPageData({...pageData,slug:slugHelperText});setSlugHelperText("")}}}/>
            </Grid>
            <Grid item xs={12}>
              <MdEditor config={{ htmlClass: "md-editor-html-class" }} style={{ height: '500px', zIndex: 7000 }} value={markdownContent} renderHTML={text => <InnerHTML html={markdownContent ? mdParser.render(text) : ""} />} onChange={handleEditorChange} />
            </Grid>
            <Grid item xs={12} md={12}>
              <Box textAlign="right">
                <Button disabled={!title || !slug || !htmlContent || !markdownContent} type="submit" variant="contained">{onEdit ? "Update" : "Create"}</Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </Box>
  )
}

export default Page