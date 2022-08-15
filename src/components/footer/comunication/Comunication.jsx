import React, { createElement } from "react";
import Grid from "@mui/material/Grid";
import "./Comunication.css";

const Comunication = ({ icon, title, subtitle }) => {
  return (
    <Grid container className="comunication-item" direction="column">
      <Grid item className="icon-container">
        {createElement(icon, { fontSize: "large" })}
      </Grid>
      <Grid item className="text">
        <div>{title}</div>
        <div>{subtitle}</div>
      </Grid>
    </Grid>
  );
};

export default Comunication;
