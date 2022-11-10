import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useLocalStorage from "./service/utils/useLocalStorage";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { ANONYMOUS_ATTRIBUTE, AUTH_TOKEN_ATTRIBUTE, OK } from "./constants";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Loading from "./components/loader/Loading";
import CustomAlert from "./components/alert/Alert";
import apiInstance from "./service/api/axios";
import AuthService from "./service/api/AuthService";
import { AlertContext } from "./service/providers/AlertProvider";
import "./App.css";


const App = ({ children }) => {
  const { showAlert } = useContext(AlertContext);
  const [isDisplayLogin, setDisplayLogin] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [isAnonymous, setAnonymous] = useLocalStorage(
    ANONYMOUS_ATTRIBUTE,
    false
  );
  const [token, setToken] = useLocalStorage(AUTH_TOKEN_ATTRIBUTE, "");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const getAnonymous = async () => {
      if (token === "") {
        const cookieResponse = await AuthService.getCookie();
        if (cookieResponse.status === OK) {
          const tokenResponse = await AuthService.authorize();
          setToken(tokenResponse.data.token);
          setAnonymous(true);
        }
      }
    };

    getAnonymous();
    handleQueryParams("success");
    handleQueryParams("error");
    handleQueryParams("info");
    handleQueryParams("warning");

    if (token) {
      apiInstance.defaults.headers.Authorization = `Bearer ${token}`;
    }
    setDisplayLogin(isAnonymous);
    setLoading(false);
  }, [isAnonymous, searchParams]);

  const handleQueryParams = (param) => {
    if (searchParams.has(param)) {
      const value = searchParams.get(param);
      searchParams.delete(param);
      setSearchParams(searchParams);
      showAlert(value, param);
    }
  };

  return (
    <>
      <Loading open={isLoading} text="...." />
      <Header isDisplayLogin={isDisplayLogin} />
      <Grid container className="content">
        {children}
      </Grid>
      <Footer />
      <CustomAlert />
    </>
  );
};

App.propTypes = {
  children: PropTypes.node,
};

export default App;
