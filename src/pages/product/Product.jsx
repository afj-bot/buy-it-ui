import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";

const Product = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <Grid item className="product-page"></Grid>;
};

export default Product;
