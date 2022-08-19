import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import Localization from "../dropdown/localization/Localization";
import LocalizeService from "../../service/api/LocalizeService";
import { LocalizeContext } from "../../service/providers/LocalizeProvider";
import "./Header.css";

import { LANGUAGE_ATTRIBUTE, PUBLIC_ROUTES } from "../../constants";
import apiInstance from "../../service/api/axios";
import Logo from "../logo/Logo";
import MenuDesktop from "./menus/desktop/MenuDesktop";
import MenuMobile from "./menus/mobile/MenuMobile";
import StoreIcon from "@mui/icons-material/Store";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LoginIcon from "@mui/icons-material/Login";

const Header = ({ displayLoginAndRegisration }) => {
  const { updateResource } = useContext(LocalizeContext);
  const [language, setLanguage] = useState(
    localStorage.getItem(LANGUAGE_ATTRIBUTE) !== null
      ? localStorage.getItem(LANGUAGE_ATTRIBUTE)
      : "gb"
  );

  useEffect(() => {
    async function getContent() {
      const response = await LocalizeService.localize(language);
      updateResource(response.data);
    }

    getContent();
  }, [language]);

  const handleLanguage = (country) => {
    localStorage.setItem(LANGUAGE_ATTRIBUTE, country);
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
      link: "/my/cart",
      icon: ShoppingCartIcon,
    },
    {
      value: "header.search.button",
      link: "/search",
      icon: SearchIcon,
    },
  ];

  const location = useLocation();

  const isShowLogin =
    !location.pathname.match("login") && displayLoginAndRegisration;

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

export default Header;
