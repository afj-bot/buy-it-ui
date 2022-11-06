import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Filter from "../../components/filter/Filter";
import ProductTable from "../../components/product/table/ProductTable";
import "./Products.css"

const Products = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Grid item className="page">
      <Grid container direction="row">
        <Grid item style={{ width: "20%", minHeight: "100vh" }}>
          <Filter />
        </Grid>
        <Grid item className="products-table-root">
          <ProductTable />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Products;
