import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  (theme) => ({
    logo: {
      height: "5em",
      objectFit: "cover",
      [theme.breakpoints.down("md")]: {
        height: "4em",
      },
      [theme.breakpoints.down("xs")]: {
        height: "4em",
      },
    },
    footerContainer: {
      bottom: "0px",
      display: "flex",
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      width: "100% !important",
      height: "5em !important",
      backgroundColor: "#7204c2",
      [theme.breakpoints.down("md")]: {
        height: "4em",
      },
      [theme.breakpoints.down("xs")]: {
        height: "2em",
      },
      
    },
  }),
  { index: 1 }
);

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footerContainer}>
      <img alt="Flexi" src="/images/footer.png" className={classes.logo} />
    </footer>
  );
};

export default Footer;
