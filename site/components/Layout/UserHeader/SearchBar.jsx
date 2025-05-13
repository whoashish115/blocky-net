import React from "react";

import moment from "moment";
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

import { search as searchRequest } from "../../../utils/requestCreator"
import Loader from "../../smallComponents/Loader"

import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import ListItemButton from "@mui/material/ListItemButton"
import Dialog from "@mui/material/Dialog"
import AppBar from "@mui/material/AppBar"
import Typography from "@mui/material/Typography"
import Toolbar from "@mui/material/Toolbar"
import Collapse from "@mui/material/Collapse"
import InputBase from "@mui/material/InputBase"
import Tooltip from "@mui/material/Tooltip"
import Stack from "@mui/material/Stack"
import IconButton from "@mui/material/IconButton"
import Slide from "@mui/material/Slide"

import SearchIcon from "@mui/icons-material/Search";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloseIcon from '@mui/icons-material/Close';


const Search = styled(Paper)(({ theme, open, search }) => ({
  width: '100%',
  transition: theme.transitions.create(['background', "border-radius"]),
  background: open ? theme.palette.background.paperSecondary : "transparent",
  borderBottomLeftRadius: search ? 0 : `${theme.shape.borderRadius}px`,
  borderBottomRightRadius: search ? 0 : `${theme.shape.borderRadius}px`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: open ? 4 : 0,
  paddingRight: open ? 4 : 0,
}));
const StyledInputBase = styled(InputBase)(({ theme, open, mobile }) => ({
  '& .MuiInputBase-input': {
    transition: theme.transitions.create('width'),
    width: mobile == 1 ? "100%" : (open ? "225px" : '0px'),
  },
}));
const SearchCancelIconWrapper = styled(IconButton)(({ theme, open }) => ({
  transition: theme.transitions.create('display'),
  display: open ? "flex" : 'none',
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const SearchBar = () => {
  const theme = useTheme()
  const router = useRouter()

  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false)
  const [blogs, setBlogs] = React.useState([]);
  const handleSearchInputChange = (e) => { setSearch(e.target.value) }

  React.useEffect(async () => {
    if (search) {
      if(!Boolean(search.trim() == "")){
        setLoading(true);
        const blogsData = await searchRequest(`blog/search/${search}`)
        if(blogsData){
          setBlogs(blogsData)
        }
        setLoading(false);
      }
    }
  }, [search]);


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => { setOpen(true) }
  const handleClose = () => { setSearch(""); setTimeout(() => { setOpen(false); }, 250); }

  const [mobileDialogOpen, setMobileDialogOpen] = React.useState(false);
  const handleMobileDialogOpen = () => { setMobileDialogOpen(true); };
  const handleMobileDialogClose = () => { setSearch(""); setMobileDialogOpen(false); };

  React.useEffect(() => {
    const handleCloseSearchBar = () => { setSearch(""); setOpen(false); setMobileDialogOpen(false) };
    router.events.on("routeChangeStart", handleCloseSearchBar)
    return () => {
      router.events.off('routeChangeComplete', handleCloseSearchBar);
    };
  }, []);


  const SearchResult = (
    <Stack>
      <Collapse in={!loading && blogs.length !== 0}>
        <Stack spacing={1} sx={{ maxHeight: "25rem", overflow: "auto" }}>
          {blogs.map((blog, index) => (
            <Link key={index} href="/blog/[category]/[slug]" as={`/blog/${blog.categories[0].slug}/${blog.slug}`}>
              <ListItemButton sx={{ borderRadius: `${theme.shape.borderRadius}px !important`, p: 1, width: '100%' }} onClick={() => { setSearch("") }}>
                <Stack spacing={1} direction="row" flexGrow={1}>
                  <Box sx={{ position: "relative", minHeight: "60px", minWidth: "100px", }}>
                    <Image src={blog.thumbnail} height={"60px"} width={"100px"} style={{ borderRadius: `${theme.shape.borderRadius}px` }} objectFit="cover" priority={true} alt={blog.thumbnail} />
                  </Box>
                  <Stack flexGrow={1}>
                    <Typography variant="subtitle2" sx={{ textTransform: "capitalize" }}>{blog.title}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: "capitalize" }}>{blog.description.length > 35 ? blog.description.slice(0, 35) + "..." : blog.description}</Typography>
                    <Typography variant="caption" textAlign="right" color="text.secondary">
                      <Box display="flex" justifyContent={"flex-end"} alignItems="center">
                        <AccessTimeIcon sx={{ fontSize: "0.8rem", mt: 0.2 }} fontSize="small" />
                        <Typography sx={{ pl: 0.5, pt: 0.25, fontSize: "0.6rem" }} variant="caption">
                          {moment(blog.createdAt).format("DD MMM YYYY")}
                        </Typography>
                      </Box>
                    </Typography>
                  </Stack>
                </Stack>
              </ListItemButton>
            </Link>
          ))}
        </Stack>
      </Collapse>
      <Collapse in={Boolean(search) && loading}>
        <Box display='flex' justifyContent="center" alignItems="center" py={3}>
          <Loader small={true} />
        </Box>
      </Collapse>
      <Collapse in={!loading && blogs.length === 0}>
        <ListItemButton disabled sx={{ borderRadius: `${theme.shape.borderRadius}px !important`, opacity: "1 !important", p: 1, width: '100%' }}>
          <Typography variant="subtitle2" sx={{ textTransform: "capitalize", textAlign: "center", width: '100%' }}>Blog Post Not Found</Typography>
        </ListItemButton>
      </Collapse>
    </Stack>
  )

  return (
    <Box>

      {/* Desktop Search */}
      <Box sx={{ display: { xs: 'none', md: "block" }, position: "relative" }}>
        <Search open={open} search={search}>
          <Tooltip title="Search" arrow>
            <IconButton onClick={handleOpen} sx={{ m: 0.5 }} size={open ? "small" : "medium"}>
              <SearchIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <StyledInputBase value={search} onChange={handleSearchInputChange} mobile={0} open={open} placeholder="Search" />
          <Box>
            <SearchCancelIconWrapper sx={{ m: 0.5 }} open={open} onClick={handleClose} size={open ? "small" : "medium"}>
              <CloseIcon fontSize="small" />
            </SearchCancelIconWrapper>
          </Box>
        </Search>
        <Box sx={{ position: "absolute", width: "100%" }}>
          <Collapse in={Boolean(search)}>
            <Box sx={{ background: theme.palette.background.paperSecondary, borderRadius: `${theme.shape.borderRadius}px`, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
              {SearchResult}
            </Box>
          </Collapse>
        </Box>
      </Box>

      {/* Mobile Search */}
      <Box sx={{ display: { xs: 'block', md: "none" } }}>
        <IconButton onClick={handleMobileDialogOpen} sx={{ margin: 0.5 }}>
          <SearchIcon fontSize="small" />
        </IconButton>
      </Box>
      <Dialog sx={{ ["& .MuiPaper-root"]: { padding: "0px !important" } }} fullScreen open={mobileDialogOpen} onClose={handleMobileDialogClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }} color="inherit">
          <Toolbar sx={{ padding: "8px !important" }}>

            <Search open={true}>
              <IconButton disableRipple sx={{ m: 0.5 }} size="small" >
                <SearchIcon fontSize="small" sx={{ color: search ? theme.palette.text.primary : theme.palette.text.secondary }} />
              </IconButton>
              <StyledInputBase value={search} onChange={handleSearchInputChange} mobile={1} fullWidth autoFocus open={true} placeholder="Search" />
              {search && <Box>
                <SearchCancelIconWrapper sx={{ mr: 0.5, color: theme.palette.mode == "dark" ? "inherit" : theme.palette.text.primary }} onClick={() => { setSearch('') }} open={true} size="small">
                  <CloseIcon fontSize="small" />
                </SearchCancelIconWrapper>
              </Box>}
            </Search>

            <Box>
              <IconButton sx={{ mx: 1, mr: 0.5, strokeWidth: 1, stroke: theme.palette.text.primary, color: theme.palette.mode == "dark" ? "inherit" : theme.palette.text.primary }} onClick={handleMobileDialogClose} open={true} size="small">
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>

          </Toolbar>
        </AppBar>

        <Box px={{ xs: 1, md: 1.5 }}>
          {SearchResult}
        </Box>

      </Dialog>

    </Box>
  );
};

export default SearchBar;
