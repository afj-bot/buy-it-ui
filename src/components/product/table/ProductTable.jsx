import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ReplayCircleFilledIcon from "@mui/icons-material/ReplayCircleFilled";
import ProductItem from "../item/ProductItem";
import ProductService from "../../../service/api/ProductService";
import { OK } from "../../../constants";
import Loading from "../../loader/Loading";
import { LocalizeContext } from "../../../service/providers/LocalizeProvider";

const ProductTable = () => {
  const { getKeyValue } = useContext(LocalizeContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isLast, setLast] = useState(false);
  const [page, setPage] = useState(1);
  const [loadMoreDisabled, setLoadModeDisabled] = useState(false);

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
    const response = await ProductService.getProducts(page);
    console.log(response);
    if (response.status === OK && response.data.content) {
      setProducts(...products, response.data.content);
      setLast(response.data.last);
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
              <IconButton
                style={{ fontSize: "20vh" }}
                onClick={loadMore}
                disabled={loadMoreDisabled}
              >
                <ReplayCircleFilledIcon
                  style={{ fontSize: "20vh" }}
                  className="main"
                />
              </IconButton>
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
};

export default ProductTable;
