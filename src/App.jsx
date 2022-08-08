import React, { useContext, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import "./App.css";
import LocalizeService from './service/api/LocalizeService';
import { LocalizeContext } from './service/providers/LocalizeProvider';
import Loading from './components/loader/Loading';
import LocalizationDropDown from './components/dropdown/localization/LocalizationDropDown';
import { LANGUAGE_ATTRIBUTE } from './constants';
import apiInstance from "./service/api/axios";

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

    getContent();
  }, [language]);

  const handleLanguage = (country) => {
    localStorage.setItem(LANGUAGE_ATTRIBUTE, country)
    setLanguage(country);
    apiInstance.defaults.headers["Accept-Language"] = country;
  }

  return (
    <>
    <Loading open={loading} />
      <Grid className="header" container alignItems="flex-start" alignContent="flex-start">
        <Grid item className="main-menu">
        </Grid>
        <Grid item>
          <LocalizationDropDown country={language} setCountry={handleLanguage}/>
        </Grid>
      </Grid>
    {children}
    </>
  );
}

export default App;
