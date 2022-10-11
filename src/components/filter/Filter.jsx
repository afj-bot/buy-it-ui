import React from "react";
import Grid from "@mui/material/Grid";

import "./Filter.css";

const Filter = () => {
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      alignContent="center"
      className="filter-root"
    >
      <Grid item>First Filter</Grid>
      <Grid>Second filter</Grid>
    </Grid>
  );
};

export default Filter;
