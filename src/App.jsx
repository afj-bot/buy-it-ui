import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { ANONYMOUS_ATTRIBUTE, AUTH_TOKEN_ATTRIBUTE, OK } from "./constants";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import apiInstance from "./service/api/axios";
import AuthService from "./service/api/AuthService";
import "./App.css";

const App = ({ children }) => {
  const [isShowRegistrationAndLogin, setShowRegistrationAndLogin] =
    useState(true);

  useEffect(() => {
    async function getAnonymous() {
      if (localStorage.getItem(AUTH_TOKEN_ATTRIBUTE) === null) {
        const cookieResponse = await AuthService.getCookie();
        if (cookieResponse.status === OK) {
          const tokenResponse = await AuthService.authorize();
          localStorage.setItem(AUTH_TOKEN_ATTRIBUTE, tokenResponse.data.token);
          localStorage.setItem(ANONYMOUS_ATTRIBUTE, "true");
        }
      }
    }

    getAnonymous();
    if (localStorage.getItem(AUTH_TOKEN_ATTRIBUTE) !== null) {
      const token = localStorage.getItem(AUTH_TOKEN_ATTRIBUTE);
      apiInstance.defaults.headers.Authorization = `Bearer ${token}`;
    }
    setShowRegistrationAndLogin(
      new Boolean().valueOf(localStorage.getItem(ANONYMOUS_ATTRIBUTE))
    );
  }, []);

  return (
    <>
      <Header displayLoginAndRegisration={isShowRegistrationAndLogin} />
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
