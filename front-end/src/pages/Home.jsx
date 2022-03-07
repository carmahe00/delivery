import React from "react";
import { Typography } from "@mui/material";

import { Container } from "@material-ui/core";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  text: { textShadow: `0 0 10px #fff, 0 0 10px #fff` },
  active: {
    textShadow: `0 0 10px #17fc03, 0 0 10px #17fc03, 0 0 10px #17fc03`,
    marginLeft: "20px",
  },
  inactive: {
    textShadow: `0 0 10px #fc0303, 0 0 10px #fc0303, 0 0 10px #fc0303`,
    marginLeft: "20px",
  },
}, {index: 1});

const Home = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const { connect } = useSelector((state) => state.userConnect);
  const classes = useStyles();
  return (
    <Container
      style={{
        height: "100%",
        width: "100%",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          backgroundImage: "url(/images/fondodomiya.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          flexDirection: "column",
          width: "100%",
          height: "90%",
          borderRadius: 5,
          position: "relative",
          paddingLeft: "20px",
          paddingTop: "20px",
        }}
      >
        {userInfo.usuario && (
          <>
            <Typography
              variant="h4"
              classes={{ root: classes.text }}
              color="primary"
              gutterBottom
              component="div"
            >
              Usuario: {userInfo.usuario.nombre}
            </Typography>
            <Typography
              variant="h4"
              classes={{ root: classes.text }}
              color="primary"
              gutterBottom
              component="div"
            >
              Rol: {userInfo.usuario.rol}
            </Typography>
            <Typography
              variant="h4"
              classes={{ root: classes.text }}
              color="primary"
              gutterBottom
              component="div"
            >
              Dirección: {userInfo.usuario.direccion}
            </Typography>
            <Typography
              variant="h4"
              classes={{ root: classes.text }}
              color="primary"
              gutterBottom
              component="div"
            >
              Correo: {userInfo.usuario.email}
            </Typography>
            <Typography
              variant="h4"
              classes={{ root: classes.text }}
              color="primary"
              gutterBottom
              component="div"
            >
              Ciudad: {userInfo.usuario["ciudad.nombre"]}
            </Typography>
            <Typography
              variant="h4"
              classes={{ root: classes.text }}
              color="primary"
              gutterBottom
              component="div"
            >
              Celular: {userInfo.usuario.celular}
            </Typography>
            {userInfo.usuario.rol === "PROVEEDORES" && (
              <Typography
                variant="h4"
                classes={{ root: classes.text }}
                color="primary"
                gutterBottom
                component="div"
                sx={{ display: "flex", flexDirection: "row" }}
              >
                Conectado:{" "}
                <Typography
                  variant="h4"
                  classes={{ root: connect ? classes.active : classes.inactive }}
                  color="primary"
                  gutterBottom
                  component="div"
                >
                  ◉
                </Typography>
              </Typography>
            )}
          </>
        )}
      </div>
    </Container>
  );
};

export default Home;
