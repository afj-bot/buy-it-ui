import React, { useState } from 'react';
import Input from '../inputs/Input';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { Link } from "react-router-dom";
import "./LoginForm.css";
import LoginIcon from '@mui/icons-material/Login';

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const login = () => {
  }

  const disabled = () => username === "" || password === "";

  const elementsMap = [
    {
      row: <Input placeholder="Username" id="username" type="text" value={username} error={error} changeFunction={setUsername}/>
    },
    {
      row: <Input placeholder="Password" id="pass" type="password" value={password} isPasswordField={true} error={error} changeFunction={setPassword}/>
    },
    {
      row: <>
          <Tooltip title="login.button.tooltip" arrow placement="left" disableHoverListener={!disabled()} disableFocusListener={!disabled()}>
            <span>
              <Button fullWidth disabled={disabled()} onClick={login}>login.button</Button>
            </span>
            </Tooltip>
            <Tooltip title="login.forgot.password.tooltip" arrow>
              <Button className="change-password" component={Link} to="/forgot-password">login.forgot.password.button</Button>
            </Tooltip>
          </>
    }
  ]

  return (
    <Grid container direction="column" className="form">
      <Grid item className="title">
      <div className="center">
        <LoginIcon fontSize="large"/>
        <h2 style={{paddingLeft: "2%"}}>Login</h2>
      </div>  
      </Grid>
      <Grid item>
        <Grid container direction="column" className="inputs-box">
          {elementsMap.map((ele) => (
          <Grid item className="row">
            {ele.row}
        </Grid>
          ))}
        </Grid>
      </Grid>

    </Grid>
  );
}

export default LoginForm;
