import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import ProductImage from "../../components/product/image/ProductImage";
import ProductService from "../../service/api/ProductService";
import { OK } from "../../constants";

import "./Product.css";

const Product = () => {
  const {id} = useParams();
  const [image, setImage] = useState(undefined);

  useEffect(() => {
    const getImage = async () => {
      const response = await ProductService.getImage(id);
      if (response.status === OK) {
        setImage(response.data);
      }
    };

    getImage();
  }, []);

  return (
  <Grid 
    container
    direction="row"
    alignItems="flex-start" 
    className="product-page debug" >
      <div id={id} />
      <Grid item className="product-container debug">
        <Grid container direction="row" alignItems="center" alignContent="center" className="product-image">
          {image && <ProductImage src={image} />}
          {!image && <CircularProgress />}
        </Grid>
      </Grid>
      <Grid item className="product-container debug"></Grid>
    </Grid>);
};

export default Product;
