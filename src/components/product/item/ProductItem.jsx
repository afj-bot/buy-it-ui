import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Rating from "@mui/material/Rating";
import useLocalStorage from "../../../service/useLocalStorage";
import ProductService from "../../../service/api/ProductService";
import { ANONYMOUS_ATTRIBUTE, OK, PUBLIC_ROUTES } from "../../../constants";
import ProductImage from "../image/ProductImage";

import "./ProductItem.css";
import { useContext } from "react";

const Header = ({id, name}) => (
  <Grid item>
    <Link to={`${PUBLIC_ROUTES.PRODUCT}/${id}`} style={{textDecoration: "none", color: "black"}}>
      <h3>{name}</h3>
    </Link>
  </Grid>
)

const Image = ({id, image}) => (
  <Grid item>
  {!image && <CircularProgress />}
  {image && 
    <Link to={`${PUBLIC_ROUTES.PRODUCT}/${id}`} style={{textDecoration: "none", color: "black"}}>
      <ProductImage src={image} />
    </Link>}
</Grid> 
)

const Price = ({ id, price }) => (
  <Grid item className="price-container">
    <Link to={`${PUBLIC_ROUTES.PRODUCT}/${id}`} style={{textDecoration: "none", color: "black"}}>
      <span id="price">{price}</span>
    </Link>
  </Grid>
)

const CustomRating = ({ star, id }) => {
  const [anonymous] = useLocalStorage(ANONYMOUS_ATTRIBUTE, "");
  // const {showAlert} = useContext(AlertContext)
  const [stars, setStars] = useState(star);

  const addRating = async (event, newValue) => {
      const response = await ProductService.addRating(id, newValue);
      if(response.status === OK) {

      }
  }

  return (
    <Grid item className="raiting-container">
    <Rating
      name="product-rating"
      value={stars}
      precision={0.1}
      disabled={anonymous === "true"}
      onChange={(event, newValue)  => addRating(event, newValue)}
    />
</Grid>
  )
}

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

      <Header id={id} name={name} />
      <Image id={id} image={image} />
      <Price id={id} price={price} />
      <Grid item>
        <div id="description">{description}</div>
      </Grid>
      <CustomRating star={star} id={id}/>
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
