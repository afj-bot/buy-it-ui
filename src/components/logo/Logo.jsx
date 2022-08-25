import React, { Suspense } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { PUBLIC_ROUTES } from "../../constants";
import LogoIcon from "../../assets/images/app_logo_250.png";
import "./Logo.css";

const Logo = () => {
  return (
    <Grid item data-test-id="logo" className="logo">
      <Link to={PUBLIC_ROUTES.DASHBOARD}>
        <Suspense fallback={<CircularProgress />}>
          <img className="logo-image" src={LogoIcon} alt="" />
        </Suspense>
      </Link>
    </Grid>
  );
};

Logo.propTypes = {
  isHeader: PropTypes.bool,
  dataTestId: PropTypes.string,
};

export default Logo;
