import React, { useEffect, useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from "@mui/material/CircularProgress";
import CategoryService from "../../service/api/CategoryService";
import { LocalizeContext } from "../../service/providers/LocalizeProvider";
import { OK } from "../../constants";

import "./Filter.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const FilterItem = ({name, disabled, values, loadMore, item, setItem}) => {

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setItem(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div id="filter">
      <FormControl sx={{ m: 1, width: 300 }} disabled={disabled}>
        <InputLabel id="filter-label" data-testid={`${name}-label`} >{name}</InputLabel>
        <Select
          labelId={`${name}-label`}
          id={`${name}-checkbox`}
          multiple={values.length > 0}
          value={item}
          onChange={handleChange}
          onClose={loadMore}
          input={<OutlinedInput label={name} />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          className="filter-text"
        >
          {values.length === 0 &&
            (<MenuItem>
              <CircularProgress />
              <ListItemText primary="Loading" />
            </MenuItem>)}
          {values.length > 0 && values.map((name) => (
            <MenuItem key={name} value={name} className="filter-text" data-testid={name}>
              <Checkbox checked={item.indexOf(name) > -1} />
              <ListItemText primary={name} id="filter-text"/>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
    
}

const Filter = () => {
  const [content, setContent] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryItem, setCategoryItem] = React.useState([]);
  const [subCategories, setSubcategories] = useState([]);
  const [subcategoryItem, setSubcategoryItem] = React.useState([]);
  const { getKeyValue } = useContext(LocalizeContext);

  useEffect(() => {
    const loadCategories = async () => {
      const response = await CategoryService.getCategories();
      if(response.status === OK) {
        setContent(response.data.content);
        const categoriesNames = [];
        response.data.content.map((category) => categoriesNames.push(category.name));
        setCategories(categoriesNames);
      }
    };

    loadCategories();
  }, [subCategories]);

  const getSubCategories = async () => {
      const subCategoriesNames = [];
      content
        .filter((category) => categoryItem.includes(category.name))
        .map((category) => subCategoriesNames.push(`${category.name} : ${category.subCategory.name}`))
      setSubcategories(subCategoriesNames);
  }

  return (
    <Grid
      container
      direction="row"
      alignItems="flex-start"
      alignContent="flex-start"
      className="filter-root"
    >
      <FilterItem name={getKeyValue("product.item.category")} values={categories} disabled={categories.length === 0} item={categoryItem} setItem={setCategoryItem} loadMore={getSubCategories}/>
      <FilterItem name={getKeyValue("product.item.subcategory")} values={subCategories} disabled={categoryItem.length === 0} item={subcategoryItem} setItem={setSubcategoryItem} />
      <Button className="button">{getKeyValue("product.filter.apply.button")}</Button>
    </Grid>
  );
};

export default Filter;
