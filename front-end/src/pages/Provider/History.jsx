import React, { useEffect } from "react";
import { Grid, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";

import CardDomicilio from "../../components/CardDomicilio";
import { listHistories } from "../../actions/historyActions";

const useStyles = makeStyles(
  {
    container: {
      padding: "2em",
      marginBottom: "5em",
    },
  },
  { index: 1 }
);

function History() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { histories, loading, error } = useSelector(
    (state) => state.historyList
  );
  useEffect(() => {
    dispatch(listHistories());
  }, [dispatch]);

  if (loading)
    return (
      <CircularProgress
        style={{
          width: "100px",
          height: "100px",
          margin: "auto",
          display: "block",
          marginTop: "50px",
        }}
        color="primary"
      />
    );

  if (error) return;
  return (
    <div className={classes.container}>
      <Grid spacing={3} container>
        {histories.length > 0 &&
          histories.map((pedido) => (
            <CardDomicilio
              history={true}
              key={pedido.id_pedido}
              pedido={pedido}
            />
          ))}
      </Grid>
    </div>
  );
}

export default History;
