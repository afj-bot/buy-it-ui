import React, { useContext, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import "./App.css";
import LocalizeService from './service/api/LocalizeService';
import { LocalizeContext } from './service/providers/LocalizeProvider';
import Loading from './components/loader/Loading';
import LocalizationDropDown from './components/dropdown/localization/LocalizationDropDown';
import { ANONYMOUS_ATTRIBUTE, AUTH_TOKEN_ATTRIBUTE, LANGUAGE_ATTRIBUTE } from './constants';
import apiInstance from "./service/api/axios";
import AuthService from './service/api/AuthService';

const App = ({ children }) => {
  const { updateResource } = useContext(LocalizeContext);
  const [language, setLanguage] = useState(localStorage.getItem(LANGUAGE_ATTRIBUTE) !== null ? localStorage.getItem(LANGUAGE_ATTRIBUTE) : "gb");
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function getContent () { 
        const response = await LocalizeService.localize(language);
        updateResource(response.data);
        setLoading(false);
    };

    async function getAnonymous() {
      if (localStorage.getItem(AUTH_TOKEN_ATTRIBUTE) === null) {
        const cookieResponse = await AuthService.getCookie();
        if (cookieResponse.status === 200) {
          const tokenResponse = await AuthService.authorize();
          localStorage.setItem(AUTH_TOKEN_ATTRIBUTE, tokenResponse.data.token);
          localStorage.setItem(ANONYMOUS_ATTRIBUTE, "true");
        }
      }
    }

    getContent();
    getAnonymous();
    if (localStorage.getItem(AUTH_TOKEN_ATTRIBUTE) !== null) {
      const token = localStorage.getItem(AUTH_TOKEN_ATTRIBUTE);
      apiInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
    }
  }, [language]);

  const handleLanguage = (country) => {
    localStorage.setItem(LANGUAGE_ATTRIBUTE, country)
    setLanguage(country);
    apiInstance.defaults.headers["Accept-Language"] = country;
  }

  return (
    <>
    <Header />
    {children}
    </>
  )
}

App.propTypes = {
  children: PropTypes.node
}

export default App
