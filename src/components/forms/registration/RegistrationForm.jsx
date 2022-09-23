import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import RegistrationIcon from "@mui/icons-material/HowToReg";
import Input from "../../inputs/Input";
import { LocalizeContext } from "../../../service/providers/LocalizeProvider";
import UserService from "../../../service/api/UserService";
import {
  EMAIL_REGEX,
  OK,
  PUBLIC_ROUTES,
  WEAK_PASSWORD_REGEX,
  PASSWORD_LENGTH,
} from "../../../constants";

import Form from "../form/Form";
import { AlertContext } from "../../../service/providers/AlertProvider";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { showAlert } = useContext(AlertContext);
  const { getKeyValue } = useContext(LocalizeContext);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [confirmPasswordHelperText, setConfirmPasswordHelperText] =
    useState("");
  const [emailHelperText, setEmailHelperText] = useState("");
  const [className, setClassName] = useState("form registration");

  const requiredText = getKeyValue("error.required.field");

  /**
   * If the email, password, confirm password has not default error change
   * the class name of the component and scale the height
   */
  useEffect(() => {
    if (
      emailHelperText !== "" &&
      emailHelperText !== requiredText &&
      (passwordHelperText !== requiredText ||
        confirmPasswordHelperText !== requiredText)
    ) {
      setClassName("form registration-large");
    } else if (emailError || passwordError || confirmPasswordError) {
      setClassName("form registration-medium");
    } else {
      setClassName("form registration");
    }
  }, [
    usernameError,
    emailError,
    passwordError,
    confirmPasswordError,
    passwordHelperText,
    confirmPasswordHelperText,
    emailHelperText,
  ]);

  const registration = async () => {
    setLoading(true);
    const response = await UserService.register(
      username,
      email,
      password,
      privacyPolicy
    );
    if (response.status === OK) {
      setLoading(false);
      navigate(PUBLIC_ROUTES.LOGIN);
    } else {
      setLoading(false);
      console.log(response);
      showAlert(response.data.error[0].message);
    }
  };

  const disabled = () =>
    username === "" ||
    password === "" ||
    email === "" ||
    confirmPassword === "" ||
    !privacyPolicy ||
    usernameError ||
    emailError ||
    passwordError ||
    confirmPasswordError;

  const handleUsername = (value) => {
    if (value === "") {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
    setUsername(value);
  };

  const handleEmail = (value) => {
    if (value === "") {
      setEmailError(true);
      setEmailHelperText(requiredText);
    } else if (!value.match(EMAIL_REGEX)) {
      setEmailHelperText(getKeyValue("error.email.field"));
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    setEmail(value);
  };

  const handlePassword = (value) => {
    if (value === "") {
      setPasswordError(true);
      setPasswordHelperText(requiredText);
    } else if (value.length < PASSWORD_LENGTH) {
      setPasswordError(true);
      setPasswordHelperText(getKeyValue("error.password.less"));
    } else if (!value.match(WEAK_PASSWORD_REGEX)) {
      setPasswordError(true);
      setPasswordHelperText(getKeyValue("error.password.weak"));
    } else {
      setPasswordError(false);
    }
    setPassword(value);
  };

  const handleConfirmPassword = (value) => {
    if (value === "") {
      setConfirmPasswordError(true);
      setConfirmPasswordHelperText(requiredText);
    } else if (value.length < PASSWORD_LENGTH) {
      setConfirmPasswordError(true);
      setConfirmPasswordHelperText(getKeyValue("error.password.less"));
    } else if (!value.match(WEAK_PASSWORD_REGEX)) {
      setConfirmPasswordError(true);
      setConfirmPasswordHelperText(getKeyValue("error.password.weak"));
    } else if (value !== password) {
      setConfirmPasswordError(true);
      setPasswordError(true);
      setConfirmPasswordHelperText(getKeyValue("error.password.confirm"));
      setPasswordHelperText(getKeyValue("error.password.confirm"));
    } else {
      setConfirmPasswordError(false);
      setPasswordError(false);
    }
    setConfirmPassword(value);
  };

  const handlePrivacyPolicy = () => {
    setPrivacyPolicy(!privacyPolicy);
  };

  const buttonRow = () => (
    <Grid container direction="column">
      <Tooltip
        title={getKeyValue("registration.form.button.tooltip")}
        arrow
        placement="left"
        disableHoverListener={!disabled()}
        disableFocusListener={!disabled()}
      >
        <span>
          <Button
            data-testid="registration"
            className="button"
            disabled={disabled()}
            onClick={registration}
          >
            {getKeyValue("registration.form.button")}
          </Button>
        </span>
      </Tooltip>
      <FormControlLabel
        className="legacy"
        control={
          <Checkbox
            checked={privacyPolicy}
            name="Privacy Policy"
            onClick={handlePrivacyPolicy}
            data-testid="privacy-policy-checkbox"
          />
        }
        label={
          <span className="text black">
            {getKeyValue("registration.form.privacy.text")}{" "}
            <Link to={"/privacy-policy"}>
              {getKeyValue("registration.form.privacy.link")}
            </Link>
          </span>
        }
      />
      <Divider>
        <span className="text uppercase">
          {getKeyValue("registration.form.or.text")}
        </span>
      </Divider>
      <Button
        data-testid="login"
        fullWidth
        component={Link}
        to={PUBLIC_ROUTES.LOGIN}
        className="button"
      >
        {getKeyValue("registration.form.login.button")}
      </Button>
    </Grid>
  );

  const elementsMap = [
    {
      row: (
        <Input
          placeholder={getKeyValue("registration.form.username.input")}
          id="username"
          type="text"
          value={username}
          error={usernameError}
          helperText={requiredText}
          changeFunction={handleUsername}
          fullWidth
        />
      ),
    },
    {
      row: (
        <Input
          placeholder={getKeyValue("registration.form.email.input")}
          id="email"
          type="text"
          value={email}
          error={emailError}
          helperText={emailHelperText}
          changeFunction={handleEmail}
          fullWidth
        />
      ),
    },
    {
      row: (
        <Input
          placeholder={getKeyValue("registration.form.password.input")}
          id="pass"
          type="password"
          value={password}
          isPasswordField={true}
          error={passwordError}
          helperText={passwordHelperText}
          changeFunction={handlePassword}
          fullWidth
        />
      ),
    },
    {
      row: (
        <Input
          placeholder={getKeyValue("registration.form.confirm-password.input")}
          id="confirm-pass"
          type="password"
          value={confirmPassword}
          isPasswordField={true}
          error={confirmPasswordError}
          helperText={confirmPasswordHelperText}
          changeFunction={handleConfirmPassword}
          fullWidth
        />
      ),
    },
    {
      row: buttonRow(),
    },
  ];

  return (
    <Form
      title={getKeyValue("registration.form.title")}
      titleIcon={RegistrationIcon}
      elementsMap={elementsMap}
      isLoading={isLoading}
      className={className}
    />
  );
};

export default RegistrationForm;
