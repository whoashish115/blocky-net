import * as React from 'react'
import { DataContext } from '../../../store/GlobalState';
import { getData, postData, putData } from '../../../utils/fetchData';

import { useRouter } from 'next/router'

import 'react-markdown-editor-lite/lib/index.css';

// Material UI Components 
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"



const NavigationCategory = () => {
    const [name, setName] = React.useState("");
    const [index, setIndex] = React.useState("");

    const { state, dispatch } = React.useContext(DataContext);
    const { auth } = state;
    const [onEdit, setOnEdit] = React.useState(false)
    const router = useRouter()
    const { id } = router.query

    React.useEffect(() => {
        if (id) {
            setOnEdit(true)
            getData(`admin/navigationCategory/${id}`, auth.token).then(res => {
                setName(res.navigationCategory.name)
                setIndex(res.navigationCategory.index)
            })
        } else {
            setOnEdit(false)
            setName("")
        }
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (auth.user.role !== 'admin')
            return dispatch({ type: 'NOTIFY', payload: { error: 'Authentication is not valid.' } })

        if (!name || !index) return dispatch({ type: 'NOTIFY', payload: { error: 'Please add all the fields.' } })
        dispatch({ type: 'NOTIFY', payload: { loading: true } })

        let res;
        if (onEdit) {
            res = await putData(`admin/navigationCategory/${id}`, { name, index }, auth.token)
            if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

        } else {
            res = await postData('admin/navigationCategory', { name, index }, auth.token)
            if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
        }
        setName("")
        setIndex("")
        getData("navigation").then((res) => {
            if (res.err)
                return dispatch({ type: "NOTIFY", payload: { error: res.err } });
            dispatch({ type: "ADD_NAVIGATIONS", payload: res.navigations });
        });
        getData("navigationCategory").then((res) => {
            if (res.err)
                return dispatch({ type: "NOTIFY", payload: { error: res.err } });
            dispatch({ type: "ADD_NAVIGATION_CATEGORIES", payload: res.navigationCategories });
        });
        dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
        return router.push("/admin/data/navigationCategories")
    }

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField fullWidth label="Name" name="name" value={name} onChange={(e) => { setName(e.target.value) }} />
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth label="Index" name="index" value={index} onChange={(e) => { setIndex(e.target.value) }} />
                </Grid>
                <Grid item xs={12}>
                    <Box textAlign="right">
                        <Button disabled={!name || !index} type="submit" variant="contained">{onEdit ? "Update" : "Create"}</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default NavigationCategory