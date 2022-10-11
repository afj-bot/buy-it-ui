import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import ProductItem from "../item/ProductItem";
import ProductService from "../../../service/api/ProductService";
import { OK } from "../../../constants";
import Loading from "../../loader/Loading";
import { LocalizeContext } from "../../../service/providers/LocalizeProvider";

const ProductTable = () => {
  const { getKeyValue } = useContext(LocalizeContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      const response = await ProductService.getProducts();
      if ((response.status = OK && response.data.content)) {
        setProducts(response.data.content);
        setLoading(false);
      }
      setLoading(false);
    };

    getProducts();
  }, []);

  return (
    <>
      <Loading open={isLoading} text={getKeyValue("products.loader")} />
      {!isLoading && (
        <Grid
          container
          direction="row"
          alignItems="flex-end"
          alignContent="flex-end"
          className="products-table-root"
        >
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </Grid>
      )}
    </>
  );
};

export default ProductTable;
