import React from "react";
import Grid from "@mui/material/Grid";
import PaymentItem from "./PaymentItem";

const payments = [
  "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg",
];

const Payments = () => (
  <Grid container direction="row" justifyItems="center" alignItems="center">
    {payments.map((url, index) => (
      <PaymentItem key={index} src={url} />
    ))}
  </Grid>
);

export default Payments;
