import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ReplayCircleFilledIcon from "@mui/icons-material/ReplayCircleFilled";
import CircularProgress from "@mui/material/CircularProgress";
import ProductItem from "../item/ProductItem";
import ProductService from "../../../service/api/ProductService";
import { OK } from "../../../constants";
import Loading from "../../loader/Loading";
import { LocalizeContext } from "../../../service/providers/LocalizeProvider";

const ProductTable = ({ category, subCategory, productName, rating }) => {
  const { getKeyValue } = useContext(LocalizeContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isLast, setLast] = useState(false);
  const [page, setPage] = useState(1);
  const [loadMoreDisabled, setLoadModeDisabled] = useState(false);
  const [height, setHeight] = useState("90vh");

  useEffect(() => {
    const getProducts = async () => {
      const response = await ProductService.getProducts();
      if (response.status === OK && response.data.content) {
        setProducts(response.data.content);
        setLoading(false);
        setLast(response.data.last);
      }
    };

    getProducts();
  }, []);

  const loadMore = async () => {
    setLoadModeDisabled(true);
    setPage(page + 1);
    setHeight(height + height);
    const response = await ProductService.getProducts(page);
    if (response.status === OK && response.data.content) {
      setProducts(products.concat(response.data.content));
      setLast(response.data.last);
      setLoadModeDisabled(false);
    }
  };

  return (
    <>
      <Loading open={isLoading} text={getKeyValue("product.loader")} />
      {!isLoading && (
        <Grid
          container
          direction="row"
          alignItems="flex-end"
          alignContent="flex-end"
          className="products-table"
        >
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
          {!isLast && (
            <Grid item data-testid="show-more" id="show-more">
              {!loadMoreDisabled && (
                <IconButton
                  style={{ fontSize: "10vh" }}
                  onClick={loadMore}
                  disabled={loadMoreDisabled}
                >
                  <ReplayCircleFilledIcon
                    style={{ fontSize: "10vh" }}
                    className="main"
                  />
                </IconButton>
              )}
              {loadMoreDisabled && (
                <CircularProgress style={{ fontSize: "20vh" }} />
              )}
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
};

ProductTable.propTypes = {
  category: PropTypes.string,
  subCategory: PropTypes.string,
  productName: PropTypes.string,
  rating: PropTypes.number,
};

export default ProductTable;
