import React, { useState, useEffect, useContext } from 'react';
import Grid from '@mui/material/Grid';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import Localization from '../dropdown/localization/Localization';
import LocalizeService from '../../service/api/LocalizeService';
import { LocalizeContext } from '../../service/providers/LocalizeProvider';
import "./Header.css";

import { LANGUAGE_ATTRIBUTE } from '../../constants';
import apiInstance from "../../service/api/axios";
import Logo from '../logo/Logo';
import MenuDesktop from './menus/MenuDesktop';
import { IconButton } from '@mui/material';

const Header = () => {
    const { updateResource } = useContext(LocalizeContext);
    const [language, setLanguage] = useState(localStorage.getItem(LANGUAGE_ATTRIBUTE) !== null ? localStorage.getItem(LANGUAGE_ATTRIBUTE) : "gb");
  
    useEffect(() => {
      async function getContent () { 
        const response = await LocalizeService.localize(language);
        updateResource(response.data);
      };
  
      getContent();
    }, [language]);
  
    const handleLanguage = (country) => {
      localStorage.setItem(LANGUAGE_ATTRIBUTE, country)
      setLanguage(country);
      apiInstance.defaults.headers["Accept-Language"] = country;
    }

    return (
        <Grid className="header" container direction="row">
            <Logo />
            <Grid item className="main-menu">
                <Grid container direction="row" className="menu-desktop">
                    <MenuDesktop />
                    <Grid item id="card-and-search">
                        <Grid container direction="row" alignContent="center" justifyContent="center" alignItems="center">
                            <IconButton className="cart-icon">
                                <SearchIcon/>
                             </IconButton>
                            <IconButton className="cart-icon">
                                <ShoppingCartIcon fontSize="48px"/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container direction="row" className="menu-mobile">
                </Grid>
            </Grid>
            <Grid item className="main-localization" alignItems="center" alignContent="center">
                <Grid container>
                    <Localization country={language} setCountry={handleLanguage}/>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Header;
