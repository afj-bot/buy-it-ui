import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import ProductImage from "../../components/product/image/ProductImage";
import ProductService from "../../service/api/ProductService";
import ProductInformation from "../../components/product/infrormation/ProductInfromation";
import AddToCart from "../../components/product/addToCart/AddToCart";
import Characteristic from "../../components/product/infrormation/Characteristic";
import { OK } from "../../constants";

import "./Product.css";
import ProductUserInformation from "../../components/product/infrormation/ProductUserInformation";

const Product = () => {
  const {id} = useParams();
  const [image, setImage] = useState(undefined);
  const [product, setProduct] = useState(Object.assign({}));
  const [isReviewOpen, setReviewOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const imageResponse = await ProductService.getImage(id);
      if (imageResponse.status === OK) {
        setImage(imageResponse.data);
      }
      const productResponse = await ProductService.getProduct(id);
      if (productResponse.status === OK) {
        setProduct(productResponse.data);
      }
    };

    getData();
  }, []);

  return (
  <Grid 
    container
    direction="row"
    alignItems="flex-start" 
    className="product-page" >
      <div id={id} />
      <Grid item className="product-container">
        <Grid container direction="row" alignItems="center" alignContent="center" className="product-image-container">
          <Grid item>
            {image && <ProductImage src={image} isLarge/>}
            {!image && <CircularProgress />}
          </Grid>
          <Grid item style={{ padding: "2%" }}>
            <Rating 
              style={{ fontSize: "40px"}}         
              value={product.star}
              precision={0.1}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item className="product-container">
        <Grid container direction="row" alignItems="flex-start" className="product-information-container">
          <ProductInformation 
            name={product.name} 
            description={product.description} 
            categoryName={product.category?.name} 
            subCategoryName={product.category?.subCategory?.name}
          />
          <AddToCart price={product.price}/>
          <Characteristic characteristic={product.characteristic} />
          <ProductUserInformation createdBy={product.createdBy} />
        </Grid>
      </Grid>
      <Grid item id="review" className={`${isReviewOpen ? "open" : "closed"} debug`}>
        REVIEW
        <Button onClick={() => setReviewOpen(!isReviewOpen)}>
          Open
        </Button>
      </Grid>
    </Grid>);
};

export default Product;
