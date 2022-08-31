import React, { useEffect, useState } from "react";
import useLocalStorage from "./service/useLocalStorage";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { ANONYMOUS_ATTRIBUTE, AUTH_TOKEN_ATTRIBUTE, OK } from "./constants";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import apiInstance from "./service/api/axios";
import AuthService from "./service/api/AuthService";
import "./App.css";
import Loading from "./components/loader/Loading";

const App = ({ children }) => {
  const [isDisplayLogin, setDisplayLogin] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [isAnonymous, setAnonymous] = useLocalStorage(
    ANONYMOUS_ATTRIBUTE,
    false
  );
  const [token, setToken] = useLocalStorage(AUTH_TOKEN_ATTRIBUTE, "");

  useEffect(() => {
    async function getAnonymous () {
      if (token === "") {
        const cookieResponse = await AuthService.getCookie();
        if (cookieResponse.status === OK) {
          const tokenResponse = await AuthService.authorize();
          setToken(tokenResponse.data.token);
          setAnonymous(true);
        }
      }
    }

    getAnonymous();
    if (token) {
      apiInstance.defaults.headers.Authorization = `Bearer ${token}`;
    }
    setDisplayLogin(isAnonymous);
    setLoading(false);
  }, [isAnonymous]);

  return (
    <>
      <Loading open={isLoading} text="...." />
      <Header isDisplayLogin={isDisplayLogin} />
      <Grid container className="content">
        {children}
      </Grid>
      <Footer />
    </>
  );
};

App.propTypes = {
  children: PropTypes.node,
};

export default App;
