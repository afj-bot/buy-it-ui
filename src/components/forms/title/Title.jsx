import React, { createElement } from "react";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";

import "./Title.css";

const Title = ({ text, icon }) => (
  <Grid item className="title">
    <div className="center">
      {createElement(icon, { fontSize: "large" })}
      <h2 style={{ paddingLeft: "2%" }}>{text}</h2>
    </div>
  </Grid>
);

Title.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
};

export default Title;
