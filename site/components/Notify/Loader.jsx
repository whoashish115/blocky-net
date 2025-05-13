import React from "react";
import Box from "@mui/material/Box";
import LoaderComponent from "../smallComponents/Loader"
import { useTheme } from "@emotion/react";

const Loader = () => {
  const theme = useTheme()
  return (
    <Box sx={{ position: "fixed", width: "100%", height: "100%", top: 0, left: 0, bottom: 0, right: 0, background: theme.palette.background.paper, zIndex: 10001, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <LoaderComponent />
    </Box>
  );
};

export default Loader;
