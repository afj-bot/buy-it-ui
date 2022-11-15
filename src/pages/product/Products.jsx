import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Filter from "../../components/filter/products/Filter";
import ProductTable from "../../components/product/table/ProductTable";

import "./Products.css";

const Products = () => {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Grid item className="page">
      <Grid container direction="row">
        <Grid item style={{ width: "20%", minHeight: "100vh" }}>
          <Filter
            category={category}
            setCategory={setCategory}
            subCategory={subCategory}
            setSubCategory={setSubCategory}
            productName={productName}
            setProductName={setProductName}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item className="products-table-root">
          <ProductTable />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Products;
