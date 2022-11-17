import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import "./AddToCart.css";
import Input from "../../inputs/Input";


const AddToCart = ({price}) => {

    return (
        <Grid item id="add-to-cart">
            <Grid container direction="row" alignItems="center" alignContent="center">
                <Grid item id="price">{price}</Grid>
                <Grid item className="small-input">
                    <Input type="text" placeholder="Quantity" value={1}/>
                </Grid>
                <Grid item>
                    <Button variant="contained" className="button large">
                        Add to Cart
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default AddToCart;