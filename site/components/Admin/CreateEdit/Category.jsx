import * as React from 'react'

import { DataContext } from '../../../store/GlobalState';
import { getData, postData, putData } from '../../../utils/fetchData';

import { useTheme } from '@emotion/react';
import { useRouter } from "next/router"

import slugify from 'react-slugify';

// Material UI Components 
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"

const Category = () => {
    const initialState = { name: "", slug: "" };
    const [categoryData, setCategoryData] = React.useState(initialState);
    const { name, slug } = categoryData;

    const { state, dispatch } = React.useContext(DataContext);
    const { auth } = state;

    const theme = useTheme()
    const [onEdit, setOnEdit] = React.useState(false)
    const router = useRouter()
    const { id } = router.query

    React.useEffect(() => {
        if (id) {
            setOnEdit(true)
            getData(`category/${id}`, auth.token).then(res => {
                setCategoryData(res.category)
            })
        } else {
            setOnEdit(false)
            setCategoryData(initialState)
        }
    }, [id])


    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        if (name == "name") {
            setCategoryData({ ...categoryData, name: value, slug: slugify(value) });
        } else {
            setCategoryData({ ...categoryData, slug: slugify(value) });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (auth.user.role !== 'admin')
            return dispatch({ type: 'NOTIFY', payload: { error: 'Authentication is not valid.' } })

        if (!name || !slug)
            return dispatch({ type: 'NOTIFY', payload: { error: 'Please add all the fields.' } })

        dispatch({ type: 'NOTIFY', payload: { loading: true } })

        let res;
        if (onEdit) {
            res = await putData(`admin/category/${id}`, { ...categoryData }, auth.token)
            if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

        } else {
            res = await postData('admin/category', { ...categoryData }, auth.token)
            if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
        }
        setCategoryData(initialState)
        getData('category', auth.token).then(res => {
            if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
            dispatch({ type: 'ADD_CATEGORIES', payload: res.categories })
        })
        dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
        return router.push("/admin/data/categories")
    }


    return (
        <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Name" name="name" value={name} onChange={handleChangeInput} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Slug" name="slug" value={slug} onChange={handleChangeInput} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button disabled={!name || !slug} type="submit" variant="contained">{onEdit ? "Update" : "Create"}</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Category