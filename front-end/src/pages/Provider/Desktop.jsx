import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import CardDomicilio from "../../components/CardDomicilio";

const useStyles = makeStyles(
  {
    container: {
      padding: "2em",
      marginBottom: "5em",
    },
  },
  { index: 1 }
);

const Desktop = () => {
  const classes = useStyles();
  const { pedidos } = useSelector((state) => state.pedidosConnect);
  return (
    <div className={classes.container}>
      <Grid spacing={3} container>
        {pedidos.length > 0 &&
          pedidos.map((pedido) => (
            <CardDomicilio key={pedido.id_pedido} pedido={pedido} />
          ))}
      </Grid>
    </div>
  );
};

export default Desktop;
