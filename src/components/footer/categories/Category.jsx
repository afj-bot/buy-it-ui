import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import "./Category.css";

const Category = ({ category }) => (
  <Grid item className="category-item-footer">
    <Button
      component={Link}
      to={`/products?category=${category.link}`}
      className="button-footer"
    >
      {category.title}
    </Button>
  </Grid>
);

Category.propTypes = {
  category: PropTypes.object.isRequired,
};

export default Category;
