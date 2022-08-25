import React from "react";
import PropTypes from "prop-types";
import Loading from "../../loader/Loading";
import Grid from "@mui/material/Grid";
import Title from "../title/Title";

import "./Form.css";

const Form = ({
  title,
  titleIcon,
  elementsMap,
  isLoading,
  className = "form",
}) => {
  return (
    <Grid container direction="column" className={className}>
      <Loading open={isLoading} />
      <Title text={title} icon={titleIcon} />
      <Grid item>
        <Grid container direction="column" className="inputs-box">
          {elementsMap.map((ele, index) => (
            <Grid key={index} item className="row">
              {ele.row}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

Form.propTypes = {
  title: PropTypes.string.isRequired,
  titleIcon: PropTypes.object.isRequired,
  elementsMap: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  className: PropTypes.string,
};
export default Form;
