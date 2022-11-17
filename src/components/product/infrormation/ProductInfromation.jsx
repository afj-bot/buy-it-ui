import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

import "./ProductInfromation.css";

const ProductInformation = ({name, description, categoryName, subCategoryName}) => {
    const [isLoading, setLoading] = useState(name && description && categoryName && subCategoryName);

    useEffect(() => {
        setLoading(name && description && categoryName && subCategoryName);
    }, [name, description, categoryName, subCategoryName]);
    
    return (
        <Grid item className="information">
            {isLoading && (<div id="information">
                <h2 className="name">{name}</h2>
                <h3 className="description">{description}</h3>
                <div className="category">Category: {categoryName}</div>
                <div className="category">SubCategory: {subCategoryName}</div>
            </div>)}
            {!isLoading && <CircularProgress />}
      </Grid>
    )
}

export default ProductInformation;