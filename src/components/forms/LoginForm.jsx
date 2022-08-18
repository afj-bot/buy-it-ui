import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../inputs/Input";
import Loading from "../loader/Loading";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import LoginIcon from "@mui/icons-material/Login";
import LoginService from "../../service/api/LoginService";
import {
  ANONYMOUS_ATTRIBUTE,
  AUTH_ROUTES,
  AUTH_TOKEN_ATTRIBUTE,
  PUBLIC_ROUTES,
  OK,
} from "../../constants";
import { LocalizeContext } from "../../service/providers/LocalizeProvider";
import "./LoginForm.css";

const LoginForm = () => {
  const { getKeyValue } = useContext(LocalizeContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    setLoading(true);
    const response = await LoginService.login(username, password);
    if (response.status === OK) {
      localStorage.setItem(AUTH_TOKEN_ATTRIBUTE, response.data.token);
      localStorage.removeItem(ANONYMOUS_ATTRIBUTE);
      setLoading(false);
      navigate(AUTH_ROUTES.MY_PROFILE);
    } else {
      setLoading(false);
      setError(true);
    }
  };

  const handleUsername = (value) => {
    setError(false);
    setUsername(value);
  };

  const handlePassword = (value) => {
    setError(false);
    setPassword(value);
  };

  const disabled = () => username === "" || password === "";

  const elementsMap = [
    {
      row: (
        <Input
          placeholder={getKeyValue("login.form.username.input")}
          id="username"
          type="text"
          value={username}
          error={isError}
          changeFunction={handleUsername}
        />
      ),
    },
    {
      row: (
        <Input
          placeholder={getKeyValue("login.form.password.input")}
          id="pass"
          type="password"
          value={password}
          isPasswordField={true}
          error={isError}
          changeFunction={handlePassword}
        />
      ),
    },
    {
      row: (
        <>
          <Tooltip
            title={getKeyValue("login.form.button.tooltip")}
            arrow
            placement="left"
            disableHoverListener={!disabled()}
            disableFocusListener={!disabled()}
          >
            <span>
              <Button
                data-testid="login"
                fullWidth
                disabled={disabled()}
                onClick={login}
                className="button"
              >
                {getKeyValue("login.form.button")}
              </Button>
            </span>
          </Tooltip>
          <Tooltip
            title={getKeyValue("login.form.forgot.password.tooltip")}
            arrow
          >
            <Button
              data-testid="forgot-password"
              className="forgot-password button"
              component={Link}
              to={PUBLIC_ROUTES.FORGOT_PASSWORD}
            >
              {getKeyValue("login.form.forgot.password.button")}
            </Button>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <Grid container direction="column" className="form">
      {<Loading open={isLoading} />}
      <Grid item className="title">
        <div className="center">
          <LoginIcon fontSize="large" />
          <h2 style={{ paddingLeft: "2%" }}>
            {getKeyValue("login.form.title")}
          </h2>
        </div>
      </Grid>
      <Grid item>
        <Grid container direction="column" className="inputs-box">
          {elementsMap.map((ele, index) => (
            <Grid key={index} item className="row">
              {ele.row}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
