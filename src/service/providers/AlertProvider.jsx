import React from "react";
import PropTypes from "prop-types";
import { CUSTOM_DURATION_MILLS } from "../../constants";

export const AlertContext = React.createContext({
  alert: {
    message: "",
    open: false,
    severity: "",
    duration: CUSTOM_DURATION_MILLS,
  },
  showAlert: () => {},
  closeAlert: () => {},
});

export default function AlertProvider({ children }) {
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("");
  const [duration, setDuration] = React.useState(CUSTOM_DURATION_MILLS);

  const closeAlert = () => {
    console.log("Close");
    setOpen(false);
  };

  const showAlert = (message, severity = "error", duration) => {
    setOpen(true);
    setMessage(message);
    setSeverity(severity);
    setDuration(duration);
  };

  const contextValue = {
    alert: {
      message,
      open,
      severity,
      duration,
    },
    showAlert: React.useCallback(
      (message, severity) => showAlert(message, severity),
      []
    ),
    closeAlert: React.useCallback(() => closeAlert(), []),
  };

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
    </AlertContext.Provider>
  );
}

AlertProvider.propTypes = {
  children: PropTypes.node,
};
