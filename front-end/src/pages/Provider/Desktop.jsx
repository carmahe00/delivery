import { Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import CardDomicilio from "../../components/CardDomicilio";



const Desktop = () => {
  
  const { pedidos } = useSelector((state) => state.pedidosConnect);
  return (
    <Grid spacing={3} container sx={{ overflow: "scroll", flexGrow: 1, height: "90%" }}>
      {pedidos.length > 0 &&
        pedidos.map((pedido) => (
          <CardDomicilio key={pedido.id_pedido} pedido={pedido} />
        ))}
    </Grid>
  );
};

export default Desktop;
