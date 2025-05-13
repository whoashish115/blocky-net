import React from "react";

import Link from 'next/link'
import styled from "@emotion/styled";

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Collapse from "@mui/material/Collapse"
import List from "@mui/material/List"
import ListSubheader from "@mui/material/ListSubheader"

import ChevronLeft from "@mui/icons-material/ChevronLeft"
import Close from "@mui/icons-material/Close"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import { Typography } from "@mui/material";


const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
  top: 0,
}));

class DrawerInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleClick(item) {
    this.setState((prevState) => ({ [item]: !prevState[item] }));
  }
  handle(children) {
    const { state } = this;
    return children.map((subOption) => {
      if (subOption.children.length == 0) {
        return (
          <div key={subOption.name}>
            <Link href={subOption.url}>
              <Button fullWidth onClick={this.props.handleDrawerClose} color={this.props.path == subOption.url ? "primary" : "inherit"} sx={{ color: this.props.path == subOption.url ? `${this.props.theme.palette.primary.main} !important` : `${this.props.theme.palette.text.secondary} !important`, backgroundColor: this.props.path == subOption.url && (this.props.theme.palette.mode == "dark" ? 'rgba(255,255,255, 0.08)' : 'rgba(0,0,0,0.06)'), marginBottom: 0.5 }}  startIcon={<i style={{ fontSize: "15px" }} className={subOption.icon} />}>
                <Box sx={{ flexGrow: 1 }}>{subOption.name}</Box>
              </Button>
            </Link>
          </div>
        );
      }
      return (
        <div key={subOption.name}>
          <Button onClick={() => this.handleClick(subOption.name)} fullWidth color={state[subOption.name] ? "primary" : "inherit"} sx={{ color: state[subOption.name] ? `${this.props.theme.palette.primary.main} !important` : `${this.props.theme.palette.text.secondary} !important`, backgroundColor: state[subOption.name] && (this.props.theme.palette.mode == "dark" ? 'rgba(255,255,255, 0.08)' : 'rgba(0,0,0,0.06)'), marginBottom: 1 }} startIcon={<i style={{ fontSize: "15px" }} className={subOption.icon} />} endIcon={state[subOption.name] ? <ExpandLess /> : <ExpandMore />}>
            <Box sx={{ flexGrow: 1 }}>{subOption.name}</Box>
          </Button>
          <Collapse in={state[subOption.name]} timeout="auto" unmountOnExit style={{ paddingLeft: 20 }}>
            {this.handle(subOption.children)}
          </Collapse>
        </div>
      );
    });
  }

  render() {
    return (
       <>
        <Box>
          <DrawerHeader>
            <Typography sx={{width:"100%", justifyContent:"start", display:"flex", cursor: "pointer", display: "inline", px:1 }} variant="h6">BLOCKY NET</Typography>
            <IconButton color="inherit" onClick={this.props.handleDrawerClose}>
              {this.props.isMobileDrawer ? (
                <Close fontSize="small" sx={{color:this.props.theme.palette.text.primary }} />
              ) : (
                <ChevronLeft fontSize="small" sx={{color:this.props.theme.palette.text.primary }} />
              )}
            </IconButton>
          </DrawerHeader>
        </Box>
        {this.props?.navigations && 
          <>
        <Box sx={{ padding: 1.5, overflow: "auto" }} p={1.5}>
          {this.props.navigations.length !== 0 && Object.values(this.props.navigationCategories).map((value) => (
            <List key={value.name} subheader={<ListSubheader disableSticky color="inherit" sx={{ color: this.props.theme.palette.text.secondary }}>{value.name}</ListSubheader>}>
              {this.handle(this.props.navigations.filter((navigation) => navigation.category._id == value._id && navigation.isChildren !== true))}
            </List>
          ))}
        </Box>
        </>
        
        }
      </>
    );
  }
}

export default DrawerInner;
