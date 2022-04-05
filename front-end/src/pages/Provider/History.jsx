import React, { useEffect } from "react";
import MaterialTable from "material-table";
import moment from "moment";
import { CardContent, Typography, IconButton } from "@material-ui/core";
import { CircularProgress } from "@mui/material";
import {
  AppBlocking as AppBlockingIcon,
  Image as ImageIcon,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import Swal from 'sweetalert2';

import { listHistories } from "../../actions/historyActions";

const baseUrl = process.env.REACT_APP_API_URL_BASE;
function History() {
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

  const openImage = (pedido) => {
    Swal.fire({
      title: "Evidencia!",
      text: "Revise detalladamente la imagen",
      imageUrl: `${baseUrl}${pedido.imagen}`,

      imageAlt: "Custom image",
    });
  };

  if (error) return;
  console.log(histories);
  return (
    <div style={{ maxWidth: "100%", overflow: "auto", height: "90%" }}>
      <MaterialTable
        columns={[
          { title: "numero", field: "id_pedido" },
          {
            title: "fecha",
            field: "fecha_hora",
            render: (rowData) => moment(rowData).format("DD MM YYYY"),
          },
          { title: "nombre", field: "nombre" },
          { title: "entregar", field: "entregar" },
          { title: "recoger", field: "recoger", type: "date" },
        ]}
        data={histories}
        title="Historial de pedidos"
        detailPanel={(rowData) => {
          return (
            <CardContent
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gridAutoRows: "1fr",
                justifyItems: "space-between",
                maxWidth: "100%",
              }}
            >
              {rowData.usuario.imagen ? (
                <img
                  src={`${baseUrl}${rowData.usuario?.imagen}`}
                  alt={rowData.usuario?.nombre}
                  style={{ width: 40, borderRadius: "50%" }}
                />
              ) : (
                <AppBlockingIcon />
              )}
              <Typography variant="body2">{rowData.usuario?.nombre}</Typography>
              <Typography variant="body2">
                {rowData.usuario?.celular}
              </Typography>
              <Typography variant="body2">{rowData.usuario?.placa}</Typography>
              {rowData.imagen && (
                <IconButton disabled={!rowData.imagen} onClick={()=>openImage(rowData)} >
                  <ImageIcon />
                </IconButton>
              )}
            </CardContent>
          );
        }}
      />
    </div>
  );
}

export default History;
