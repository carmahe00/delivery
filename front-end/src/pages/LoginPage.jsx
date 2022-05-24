import React from "react";
import {
  Box,
  Grid,
  Avatar,
  Typography,
  CssBaseline,
  Paper,
  Link,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { LockClockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import Creatable from 'react-select/creatable';
import FormLogin from "../components/FormLogin";

const useStyles = makeStyles((theme) => ({
  logo: {
    height: "5em",
    objectFit: "cover",
    [theme.breakpoints.down("md")]: {
      height: "4em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "4em",
    },
    alignSelf: "center",
    justifySelf: "center",
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  return (
    <Grid container sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(/images/home-image.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "containt",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          <Box sx={{ mt: 1 }}>
            <FormLogin />
          </Box>
          <Link
            href="https://play.google.com/store/apps/details?id=dev.domiya"
            underline="none"
            target="_blank"
            rel="noopener"
          >
            <img
              alt="Google Play"
              src="/images/google-play-badge.png"
              className={classes.logo}
            />
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
