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
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import OutlinedInput from "@mui/material/OutlinedInput"



const Navigation = () => {
    const initialState = { name: "", url: "", icon: "", category: "", children: [] };
    const [navigationData, setNavigationData] = React.useState(initialState);
    const { name, url, icon, category, children } = navigationData;

    const { state, dispatch } = React.useContext(DataContext);
    const { auth, navigationCategories, navigations } = state;

    const [onEdit, setOnEdit] = React.useState(false)
    const router = useRouter()
    const { id } = router.query

    React.useEffect(() => {
        if (id) {
            setOnEdit(true)
            getData(`admin/navigation/${id}`, auth.token).then(res => {
                setNavigationData(res.navigation)
            })
        } else {
            setOnEdit(false)
            setNavigationData(initialState)
        }
    }, [id])

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        if (name == "children") {
            setNavigationData({ ...navigationData, children: typeof value === 'string' ? value.split(',') : value });
        }
        else { setNavigationData({ ...navigationData, [name]: value }); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (auth.user.role !== 'admin')
            return dispatch({ type: 'NOTIFY', payload: { error: 'Authentication is not valid.' } })

        if (!name || !url || !icon || !category)
            return dispatch({ type: 'NOTIFY', payload: { error: 'Please add all the fields.' } })

        dispatch({ type: 'NOTIFY', payload: { loading: true } })

        let res;
        if (onEdit) {
            res = await putData(`admin/navigation/${id}`, { ...navigationData }, auth.token)
            if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

        } else {
            res = await postData('admin/navigation', { ...navigationData }, auth.token)
            if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
        }
        setNavigationData(initialState)
        await getData("navigation").then((res) => {
            if (res.err) return dispatch({ type: "NOTIFY", payload: { error: res.err } });
            dispatch({ type: "ADD_NAVIGATIONS", payload: res.navigations });
        });
        dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
        return router.push("/admin/data/navigations")
    }

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Name" name="name" value={name} onChange={handleChangeInput} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Url" name="url" value={url} onChange={handleChangeInput} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Icon Classnames" name="icon" value={icon} onChange={handleChangeInput} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl sx={{ width: "100%" }}>
                                <InputLabel id="category-select-label">Category</InputLabel>
                                <Select
                                    labelId="category-select-label"
                                    fullWidth
                                    MenuProps={{ sx: { zIndex: 7005 } }}
                                    name="category"
                                    value={category}
                                    onChange={handleChangeInput}
                                    input={<OutlinedInput label="Category" />}
                                >
                                    {navigationCategories.map((category) => (
                                        <MenuItem
                                            key={category._id}
                                            value={category._id}
                                            sx={{ p: (0.75, 1.5), m: (0.75) }}
                                        >
                                            {category.name}
                                        </MenuItem>
                                    ))}

                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl sx={{ width: "100%" }}>
                                <InputLabel id="children-select-label">Children</InputLabel>
                                <Select
                                    labelId="children-select-label"
                                    fullWidth
                                    multiple
                                    MenuProps={{ sx: { zIndex: 7005 }, PaperProps: { sx: { ["&::before"]: { display: "none !Important", bgColor: "background.paperSecondary !important" } } } }}
                                    name="children"
                                    value={children}
                                    onChange={handleChangeInput}
                                    input={<OutlinedInput label="Children" />}
                                >
                                    <MenuItem
                                        sx={{ p: (0.15, 1), m: (0.5) }}
                                        onClick={() => { setNavigationData({ ...navigationData, children: [] }) }}>
                                        <em>Remove All</em>
                                    </MenuItem>
                                    {navigations.filter(navigation => navigation._id !== id && (navigation.parents.length == 0 || children.includes(navigation._id))).map((navigation) => (
                                        <MenuItem
                                            key={navigation._id}
                                            value={navigation._id}
                                            sx={{ p: (0.75, 1.5), m: (0.75) }}
                                        >
                                            {navigation.name}
                                        </MenuItem>
                                    ))}

                                </Select>
                            </FormControl>

                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Box>
                        <Button disabled={!name || !url || !icon || !category} type="submit" variant="contained">{onEdit ? "Update" : "Create"}</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Navigation