import React, { createElement, useContext } from "react";
import Grid from "@mui/material/Grid";
import "./Comunication.css";
import { LocalizeContext } from "../../../service/providers/LocalizeProvider";

const Comunication = ({ icon, title, subtitle }) => {
  const { getKeyValue } = useContext(LocalizeContext);
  return (
    <Grid container className="comunication-item" direction="column">
      <Grid item className="icon-container">
        {createElement(icon, { fontSize: "large" })}
      </Grid>
      <Grid item className="text">
        <div>{getKeyValue(title)}</div>
        <div>{getKeyValue(subtitle)}</div>
      </Grid>
    </Grid>
  );
};

export default Comunication;
