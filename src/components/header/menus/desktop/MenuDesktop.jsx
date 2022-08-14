import React, { useContext, createElement } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import { LocalizeContext } from "../../../../service/providers/LocalizeProvider"
import IconButton from "@mui/material/IconButton"

import "./MenuDesktop.css"

const MenuDesktop = ({ items, login, cartItems, isShowLogin }) => {
  const { getKeyValue } = useContext(LocalizeContext)

  return (
        <>
        {items.map((it) => (
            <Grid item key={it.value} className="button-container">
                <Button component={Link} to={it.link} className="button">{getKeyValue(it.value)}</Button>
            </Grid>
        ))}
        <Grid item id="card-and-search">
             <Grid container direction="row" alignContent="center" justifyContent="center" alignItems="center">
                {isShowLogin && <Grid key={login.value} item className="icon">
                    <IconButton component={Link} to={login.link} className="icon-desktop">
                        {createElement(login.icon, { className: "icon-desktop" })}
                    </IconButton>
                </Grid>}
                {cartItems.map((it) => (
                <Grid key={it.value} item className="icon">
                    <IconButton component={Link} to={it.link} className="icon-desktop">
                        {createElement(it.icon, { className: "icon-desktop" })}
                    </IconButton>
                </Grid>
                ))}
            </Grid>
        </Grid>
        </>
  )
}

MenuDesktop.propTypes = {
  items: PropTypes.array.isRequired,
  login: PropTypes.object.isRequired,
  cartItems: PropTypes.array.isRequired,
  isShowLogin: PropTypes.bool.isRequired
}

export default MenuDesktop
