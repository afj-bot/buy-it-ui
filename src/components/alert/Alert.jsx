import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { AlertContext } from "../../service/providers/AlertProvider";
import "./Alert.css";

const CustomAlert = () => {
  const { alert, closeAlert } = React.useContext(AlertContext);

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={alert.duration}
      onClose={closeAlert}
      className="alert-root"
    >
      <Alert
        data-testid={`alert-${alert.severity}`}
        variant="filled"
        severity={alert.severity}
        onClose={closeAlert}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;
