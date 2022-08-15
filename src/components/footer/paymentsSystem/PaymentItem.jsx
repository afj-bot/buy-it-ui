import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import "./Payments.css";

const PaymentItem = ({ src }) => (
  <Grid item>
    <img
      data-testid="payment"
      loading="lazy"
      className="payment-image"
      src={src}
      srcSet={`${src} 2x`}
      alt=""
    />
  </Grid>
);

PaymentItem.propTypes = {
  src: PropTypes.string.isRequired,
};

export default PaymentItem;
