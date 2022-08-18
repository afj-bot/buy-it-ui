import React from "react";
import Grid from "@mui/material/Grid";
import PlaceIcon from "@mui/icons-material/Place";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailIcon from "@mui/icons-material/Mail";
import Comunication from "./comunication/Comunication";
import useMediaQuery from "@mui/material/useMediaQuery";
import Payments from "./paymentsSystem/Payments";
import Categories from "./categories/Categories";
import "./Footer.css";

const comunicationItem = [
  {
    title: "footer.address.title",
    subtitle: "footer.address.subtitle",
    icon: PlaceIcon
  },
  {
    title: "footer.telephone.title",
    subtitle: "footer.telephone.subtitle",
    icon: LocalPhoneIcon
  },
  {
    title: "footer.email.title",
    subtitle: "footer.email.subtitle",
    icon: MailIcon
  }
];
const Footer = () => {
  const isMobile = useMediaQuery("(max-width:767px)");
  return (
    <Grid container className="footer" direction="row">
      <Grid item className="main-footer">
        <Grid container direction={isMobile ? "row" : "column"}>
          <Grid item className={`footer-item${isMobile ? "-mobile" : ""}`}>
            <Grid
              container
              direction={isMobile ? "column" : "row"}
              justifyContent="center"
              justifyItems="center"
            >
              {comunicationItem.map((item) => (
                <Comunication
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  subtitle={item.subtitle}
                />
              ))}
            </Grid>
          </Grid>
          <Grid item className={`footer-item${isMobile ? "-mobile" : ""}`}>
            <Grid
              container
              direction={isMobile ? "column" : "row"}
              justifyContent={isMobile ? "center" : "flex-start"}
              justifyItems="center"
            >
              <Grid item className="payment-item">
                <Payments />
              </Grid>
              <Grid item className="categories">
                <Categories />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className="company-legal-footer">
        <span>Power by AFJ Solution &copy; 2022</span>
      </Grid>
    </Grid>
  );
};

export default Footer;
