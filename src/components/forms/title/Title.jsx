import React, { createElement } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";

import "./Title.css";

const Title = ({ text, icon }) => (
  <Grid item className="title">
    <div className="center">
      {createElement(icon, { fontSize: "large", "data-testid": "title-icon" })}
      <h2 style={{ paddingLeft: "2%" }} data-testid="title-text">
        {text}
      </h2>
    </div>
  </Grid>
);

Title.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
};

export default Title;
