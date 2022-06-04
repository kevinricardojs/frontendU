import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import { close } from "../../slices/snackSlice";
import MuiAlert from "@mui/material/Alert";

const SnackNotification = () => {
  const { open, mensaje } = useSelector((state) => state.snack);
  const dispatch = useDispatch();

  const closeSnack = () => {
    dispatch(close());
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <>
      <Snackbar open={open} autoHideDuration={3000} onClose={closeSnack}>
        <Alert onClose={closeSnack} severity={mensaje.tipo}>
          {mensaje.texto}
        </Alert>
      </Snackbar>
    </>
  );
};
export default SnackNotification;
