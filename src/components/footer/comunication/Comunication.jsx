import React, { createElement, useContext } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import "./Comunication.css";
import { LocalizeContext } from "../../../service/providers/LocalizeProvider";

const Comunication = ({ icon, title, subtitle }) => {
  const { getKeyValue } = useContext(LocalizeContext);
  return (
    <Grid container className="comunication-item" direction="column">
      <Grid item className="icon-container" data-testid={`icon-${title}`}>
        {createElement(icon, { fontSize: "large" })}
      </Grid>
      <Grid item className="footer-text">
        <div data-testid={title}>{getKeyValue(title)}</div>
        <div data-testid={subtitle}>{getKeyValue(subtitle)}</div>
      </Grid>
    </Grid>
  );
};

Comunication.propTypes = {
  icon: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default Comunication;
