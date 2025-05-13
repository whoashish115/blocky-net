import * as React from "react";
import { DataContext } from '../../store/GlobalState'

// Material UI Components 
import Alert from "@mui/material/Alert"
import Slide from "@mui/material/Slide"
import Snackbar from "@mui/material/Snackbar"

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

const Toast = ({ message, type }) => {
  const [open, setOpen] = React.useState(true);
  const { dispatch } = React.useContext(DataContext);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      dispatch({ type: "NOTIFY", payload: {} });
    }, 500);
  };

  return (
    <Snackbar TransitionComponent={SlideTransition} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} autoHideDuration={3000} open={open} onClose={handleClose}>
      <Alert variant="filled" severity={type} sx={{ textTransform: "capitalize" }}>{message}</Alert>
    </Snackbar>
  );
};

export default Toast;
