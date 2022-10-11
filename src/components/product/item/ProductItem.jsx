import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import ProductService from "../../../service/api/ProductService";
import { OK } from "../../../constants";
import ProductImage from "../image/ProductImage";

import "./ProductItem.css";

const ProductItem = (props) => {
  const { id, name, price, currency } = props.product;
  const [image, setImage] = useState(undefined);

  useEffect(() => {
    const getImage = async () => {
      const response = await ProductService.getImage(id);
      if ((response.status = OK)) {
        setImage(response.data);
      }
    };

    getImage();
  });

  return (
    <Grid
      container
      direction="row"
      alignContent="center"
      alignItem="center"
      data-testid={id}
      id="product-item"
    >
      <Grid item>
        {!image && <CircularProgress />}
        {image && <ProductImage src={image} />}
      </Grid>
      <Grid item>{name}</Grid>
      <Grid item>{price}</Grid>
      <Grid item>{currency}</Grid>
    </Grid>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
};

export default ProductItem;
