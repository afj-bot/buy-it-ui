import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Input from '../inputs/Input';
import Loading from '../loader/Loading';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { Link } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import LoginService from "../../service/api/LoginService";
import "./LoginForm.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  let navigate = useNavigate();

  const login = async () => {
    setLoading(true);
    const response = await LoginService.login(username, password);
    if(response.status === 200) {
      localStorage.setItem("token", response.data.token);
      setLoading(false);
      navigate("/my/profile");
    } else {
      setLoading(false);
      setError(true);
    }
  }

  const disabled = () => username === "" || password === "";

  const elementsMap = [
    {
      row: <Input placeholder="Username" id="username" type="text" value={username} error={isError} changeFunction={setUsername}/>
    },
    {
      row: <Input placeholder="Password" id="pass" type="password" value={password} isPasswordField={true} error={isError} changeFunction={setPassword}/>
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
    <Grid container direction="column" className="form" wrap="nowrap">
      {<Loading open={isLoading}/>}
      <Grid item className="title">
      <div className="center">
        <LoginIcon fontSize="large"/>
        <h2 style={{paddingLeft: "2%"}}>Login</h2>
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
}

export default LoginForm;
