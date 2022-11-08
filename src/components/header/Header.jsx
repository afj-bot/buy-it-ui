import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import StoreIcon from "@mui/icons-material/Store";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LoginIcon from "@mui/icons-material/Login";
import Localization from "../dropdown/localization/Localization";
import LocalizeService from "../../service/api/LocalizeService";
import { LocalizeContext } from "../../service/providers/LocalizeProvider";
import useLocalStorage from "../../service/useLocalStorage";
import { LANGUAGE_ATTRIBUTE, PUBLIC_ROUTES } from "../../constants";
import apiInstance from "../../service/api/axios";
import Logo from "../logo/Logo";
import MenuDesktop from "./menus/desktop/MenuDesktop";
import MenuMobile from "./menus/mobile/MenuMobile";

import "./Header.css";

const Header = ({ isDisplayLogin }) => {
  const { updateResource } = useContext(LocalizeContext);
  const [language, setLanguage] = useLocalStorage(LANGUAGE_ATTRIBUTE, "gb");

  useEffect(() => {
    async function getContent () {
      const response = await LocalizeService.localize(language);
      updateResource(response.data);
    }

    getContent();
  }, [language]);

  const handleLanguage = (country) => {
    setLanguage(country);
    apiInstance.defaults.headers["Accept-Language"] = country;
  };

  const items = [
    {
      value: "header.product.button",
      link: PUBLIC_ROUTES.PRODUCTS,
      icon: <StoreIcon />,
    },
    {
      value: "header.delivery.button",
      link: PUBLIC_ROUTES.DELIVERY,
      icon: <LocalShippingIcon />,
    },
    {
      value: "header.contact-us.button",
      link: PUBLIC_ROUTES.CONTACT_US,
      icon: <PermPhoneMsgIcon />,
    },
  ];

  const login = {
    value: "header.login.button",
    link: PUBLIC_ROUTES.LOGIN,
    icon: LoginIcon,
  };

  const cartItems = [
    {
      value: "header.cart.button",
      link: PUBLIC_ROUTES.MY_CART,
      icon: ShoppingCartIcon,
    },
    {
      value: "header.search.button",
      link: PUBLIC_ROUTES.SEARCH,
      icon: SearchIcon,
    },
  ];

  const location = useLocation();

  const isShowLogin = !location.pathname.match("login") && isDisplayLogin;

  return (
    <Grid className="header" container direction="row">
      <Grid container direction="row" className="menu-mobile">
        <MenuMobile
          items={items}
          login={login}
          cartItems={cartItems}
          isShowLogin={isShowLogin}
        />
      </Grid>
      <Logo />
      <Grid item className="main-menu">
        <Grid container direction="row" className="menu-desktop">
          <MenuDesktop
            items={items}
            login={login}
            cartItems={cartItems}
            isShowLogin={isShowLogin}
          />
        </Grid>
      </Grid>
      <Grid
        item
        className="main-localization"
        alignItems="center"
        alignContent="center"
      >
        <Grid container>
          <Localization country={language} setCountry={handleLanguage} />
        </Grid>
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  isDisplayLogin: PropTypes.bool,
};
export default Header;
