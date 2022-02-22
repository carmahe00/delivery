import React from "react";
import { Box, Container, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  logo: {
    height: "6.5em",
    objectFit: "cover",
    [theme.breakpoints.down("md")]: {
      height: "3.5em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "1.5em",
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer>
      <Box
        px={{ xs: 3, sm: 5 }}
        py={{ xs: 5, sm: 5 }}
        bgcolor="#8a8a81"
        color="white"
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box>
                <img
                  alt="Flexi"
                  src="/images/footer.jpeg"
                  className={classes.logo}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
