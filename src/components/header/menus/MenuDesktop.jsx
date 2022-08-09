import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { LocalizeContext } from "../../../service/providers/LocalizeProvider";

import "./MenuDesktop.css";

const MenuDesktop = () => {
    const { getKeyValue, } = useContext(LocalizeContext);
    const items = [
        {
            value: "header.product.button",
            link: "/products"
        },
        {
            value: "header.delivery.button",
            link: "/delivery"
        },
        {
            value: "header.contact-us.button",
            link: "/contact-us"
        },
        {
            value: "header.login.button",
            link: "/login"
        }
        ,
    ]

    return (
        <>
        {items.map((item) => (
            <Grid item className="button-container">
                <Button component={Link} to={item.link} className="button">{getKeyValue(item.value)}</Button>
            </Grid>
        ))}
        </>
    )
}

export default MenuDesktop;