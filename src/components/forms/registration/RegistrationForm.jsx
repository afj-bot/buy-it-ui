import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Title from "../title/Title";
import Loading from "../../loader/Loading";
import Input from "../../inputs/Input";
import { LocalizeContext } from "../../../service/providers/LocalizeProvider";
import RegistrationIcon from "@mui/icons-material/HowToReg";
import { PUBLIC_ROUTES } from "../../../constants";

const RegistrationForm = () => {
  const { getKeyValue } = useContext(LocalizeContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const registration = async () => {};

  const disabled = () => username === "" || password === "";

  const handleUsername = (value) => {
    setError(false);
    setUsername(value);
  };

  const handlePassword = (value) => {
    setError(false);
    setPassword(value);
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
          error={isError}
          changeFunction={handleUsername}
          fullWidth={false}
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
          error={isError}
          changeFunction={handlePassword}
          fullWidth={false}
        />
      ),
    },
    {
      row: buttonRow(),
    },
  ];

  return (
    <Grid container direction="column" className="form">
      <Loading open={isLoading} />
      <Title
        text={getKeyValue("registration.form.title")}
        icon={RegistrationIcon}
      />
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

export default RegistrationForm;
