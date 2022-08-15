import React from "react";
import Grid from "@mui/material/Grid";
import Category from "./Category";

const categories = [
  {
    title: "Car",
    link: "car",
  },
  {
    title: "Flower",
    link: "flower",
  },
  {
    title: "Одяг",
    link: "clothing",
  },
  {
    title: "Одяг",
    link: "clothing",
  },
  {
    title: "Одяг",
    link: "clothing",
  },
  {
    title: "Одяг",
    link: "clothing",
  },
  {
    title: "Одяг",
    link: "clothing",
  },
  {
    title: "Одяг",
    link: "clothing",
  },
  {
    title: "Одяг",
    link: "clothing",
  },
  {
    title: "Одяг",
    link: "clothing",
  },
  {
    title: "Одяг",
    link: "clothing",
  },
  {
    title: "Одяг",
    link: "clothing",
  },
  {
    title: "Одяг",
    link: "clothing",
  },
  {
    title: "Одяг",
    link: "clothing",
  },
  {
    title: "Одяг",
    link: "clothing",
  },
  {
    title: "Одяг",
    link: "clothing",
  },
  {
    title: "Одяг",
    link: "clothing",
  },
  {
    title: "Одяг",
    link: "clothing",
  },
  {
    title: "Одяг",
    link: "clothing",
  },
  {
    title: "Одяг",
    link: "clothing",
  },
  {
    title: "Одяг",
    link: "clothing",
  },
  {
    title: "Одяг",
    link: "clothing",
  },
  {
    title: "Одяг",
    link: "clothing",
  },
  {
    title: "Одяг",
    link: "clothing",
  },
  {
    title: "Одяг",
    link: "clothing",
  },
  {
    title: "Одяг",
    link: "clothing",
  },
  {
    title: "Одяг",
    link: "clothing",
  },
  {
    title: "Одяг",
    link: "clothing",
  },
  {
    title: "Одяг",
    link: "clothing",
  },
  {
    title: "Одяг",
    link: "clothing",
  },
  {
    title: "Одяг",
    link: "clothing",
  },
  {
    title: "Одяг",
    link: "clothing",
  },
];
const Categories = () => (
  <Grid container direction="row" justifyItems="center" alignItems="center">
    {categories.map((category, index) => (
      <Category key={index} category={category} />
    ))}
  </Grid>
);

export default Categories;
