import React from "react";
import { Box, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  logo: {
    height: "5em",
    objectFit: "cover",
    [theme.breakpoints.down("md")]: {
      height: "4em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "2em",
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer>
      <Box
        px={{ xs: 3, sm: 5 }}
        py={{ xs: 1, sm: 1 }}
        bgcolor="#8a8a81"
        color="white"
      >
        <Grid
          container
          spacing={5}
          sx={{ justifyItems: "center", justifyContent: "center", alignItems: 'center' }}
        >
          <Grid item >
            <img
              alt="Flexi"
              src="/images/footer.png"
              className={classes.logo}
            />
          </Grid>
        </Grid>
      </Box>
    </footer>
  );
};

export default Footer;
