import React, { useState } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./Input.css";

const Input = ({
  id,
  placeholder,
  type,
  value,
  isPasswordField,
  fullWidth,
  error,
  changeFunction,
  className = "",
  helperText,
  inputProps
}) => {
  const [isSecured, setSecured] = useState(isPasswordField);
  const [stateType, setStateType] = useState(type);

  const handleSecurity = () => {
    setSecured(!isSecured);
    if (stateType === "text") {
      setStateType("password");
    } else {
      setStateType("text");
    }
  };

  const securityInput = () => ({
    endAdornment: (
      <IconButton onClick={handleSecurity}>
        {isSecured && (
          <VisibilityIcon fontSize="small" data-test-id="security-on" />
        )}
        {!isSecured && (
          <VisibilityOffIcon fontSize="small" data-test-id="security-off" />
        )}
      </IconButton>
    ),
  });

  return (
    <TextField
      className={`input ${className}`}
      id={id}
      autoComplete="true"
      data-testid={id}
      placeholder={placeholder}
      type={stateType}
      fullWidth={fullWidth}
      value={value}
      error={error}
      helperText={helperText && error ? helperText : ""}
      inputProps={inputProps}
      InputProps={isPasswordField && securityInput()}
      onChange={(e) => changeFunction(e.target.value)}
    />
  );
};

Input.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  isPasswordField: PropTypes.bool,
  fullWidth: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  changeFunction: PropTypes.func.isRequired,
  className: PropTypes.string,
  inputProps: PropTypes.object
};

export default Input;
