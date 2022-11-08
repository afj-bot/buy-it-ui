import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Rating from "@mui/material/Rating";
import ProductService from "../../../service/api/ProductService";
import { OK, PUBLIC_ROUTES } from "../../../constants";
import ProductImage from "../image/ProductImage";

import "./ProductItem.css";
import { Link } from "react-router-dom";

const ProductItem = (props) => {
  const { id, name, price, description, category, star } = props.product;
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
      alignContent="center"
      alignItem="center"
      data-testid={id}
      id="product-item"
    >

      <Grid item>
        <Link to={`${PUBLIC_ROUTES.PRODUCT}/${id}`} style={{textDecoration: "none", color: "black"}}>
          <h3>{name}</h3>
        </Link>
      </Grid>
      <Grid item>
        {!image && <CircularProgress />}
        {image && 
          <Link to={`${PUBLIC_ROUTES.PRODUCT}/${id}`} style={{textDecoration: "none", color: "black"}}>
            <ProductImage src={image} />
          </Link>}
      </Grid> 
      <Grid item className="price-container">
        <span id="price">{price}</span>
      </Grid>
      <Grid item>
        <div id="description">{description}</div>
      </Grid>
      <Grid item className="raiting-container">
          <Rating
            name="product-rating"
            value={star}
            precision={0.1}
          />
      </Grid>
      <Grid item className="category-container">
        <span className="category">
          Category: 
        </span>
        <span>
          {category.name}
        </span>
      </Grid>
      <Grid item className="subcategory-container">
      <span className="subcategory">
          Subcategory: 
        </span>
        <span className="padding">
          {category.subCategory.name}
        </span>
      </Grid>
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
