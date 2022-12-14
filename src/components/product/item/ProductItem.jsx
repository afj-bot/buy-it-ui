import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Rating from "@mui/material/Rating";
import useLocalStorage from "../../../service/utils/useLocalStorage";
import ProductService from "../../../service/api/ProductService";
import { AlertContext } from "../../../service/providers/AlertProvider";
import { LocalizeContext } from "../../../service/providers/LocalizeProvider";
import { ANONYMOUS_ATTRIBUTE, OK, PUBLIC_ROUTES } from "../../../constants";
import ProductImage from "../image/ProductImage";

import "./ProductItem.css";

const Header = ({ id, name }) => (
  <Grid item data-testid="header">
    <Link
      to={`${PUBLIC_ROUTES.PRODUCT}/${id}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <h3>{name}</h3>
    </Link>
  </Grid>
);

const Image = ({ id, image }) => (
  <Grid item data-testid="image">
    {!image && <CircularProgress />}
    {image && (
      <Link
        to={`${PUBLIC_ROUTES.PRODUCT}/${id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <ProductImage src={image} />
      </Link>
    )}
  </Grid>
);

const Price = ({ id, price }) => (
  <Grid item className="price-container" data-testid="price">
    <Link
      to={`${PUBLIC_ROUTES.PRODUCT}/${id}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <span id="price">{price}</span>
    </Link>
  </Grid>
);

const CustomRating = ({ star, id }) => {
  const [anonymous] = useLocalStorage(ANONYMOUS_ATTRIBUTE, "");
  const { showAlert } = useContext(AlertContext);
  const { getKeyValue } = useContext(LocalizeContext);
  const [stars, setStars] = useState(star);

  const addRating = async (event, newValue) => {
    const response = await ProductService.addRating(id, newValue);
    if (response.status === OK) {
      showAlert(getKeyValue("product.rating.sucess"), "success");
      const productResponse = await ProductService.getProduct(id);
      if (response.status === OK) {
        setStars(productResponse.data.star);
      }
    } else {
      showAlert(getKeyValue("product.rating.error"));
    }
  };

  return (
    <Grid item className="raiting-container" data-testid="rating">
      <Rating
        name="product-rating"
        value={stars}
        precision={0.1}
        disabled={anonymous === "true"}
        onChange={(event, newValue) => addRating(event, newValue)}
      />
    </Grid>
  );
};

const CategorySubcategoryFooter = ({ type, name }) => {
  const { getKeyValue } = useContext(LocalizeContext);
  return (
    <Grid
      item
      className={`${type.toLowerCase()}-container`}
      data-testid={type.toLowerCase()}
    >
      <span className={type.toLowerCase()}>
        {getKeyValue(`product.item.${type.toLowerCase()}`)}
      </span>
      <span className={type.toLowerCase() === "subcategory" ? "padding" : ""}>
        {name}
      </span>
    </Grid>
  );
};

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
      alignItems="center"
      data-testid={id}
      id="product-item"
    >
      <Header id={id} name={name} />
      <Image id={id} image={image} />
      <Price id={id} price={price} />
      <Grid item data-testid="description">
        <div id="description">{description}</div>
      </Grid>
      <CustomRating star={star} id={id} />
      <CategorySubcategoryFooter type="Category" name={category.name} />
      <CategorySubcategoryFooter
        type="Subcategory"
        name={category.subCategory.name}
      />
    </Grid>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

Header.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

Image.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
};

Price.propTypes = {
  id: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

CustomRating.propTypes = {
  id: PropTypes.string.isRequired,
  star: PropTypes.number.isRequired,
};

CategorySubcategoryFooter.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default ProductItem;
