import React, { useEffect, useRef } from "react";
import MaterialTable from "@material-table/core";
import { CircularProgress, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import {
  uploadImage,
  updateUser,
  users as usersFetch,
} from "../../actions/userActions";
import { Image } from "@mui/icons-material";
import ModalMessengers from "../../components/ModalMessenger";
import { openModalMessenger, openModalMessengerData } from "../../actions/modalActions";

const baseUrl = process.env.REACT_APP_API_URL_BASE;

const UserPageHome = () => {
  const dispatch = useDispatch();

  const { users, loading } = useSelector((state) => state.userCrud);
  const chosenImage = useRef(null);

  useEffect(() => {
    dispatch(usersFetch("DOMICILIARIOS"));
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

  return (
    <div style={{ maxWidth: "100%", height: "90%", overflow: "auto" }}>
      <MaterialTable
        editable={{
          onRowUpdate: (newRow) =>
            new Promise((resolve, reject) => {
              dispatch(updateUser(newRow));
              chosenImage.current !== null &&
                dispatch(uploadImage(chosenImage, newRow));
              chosenImage.current = null;
              resolve();
            }),
        }}
        columns={[
          {
            title: "imagen",
            field: "imagen",
            editable: "always",
            editComponent: ({ rowData }) => (
              <div value="photo">
                <input
                  ref={chosenImage}
                  accept="image/*"
                  style={{ display: "none" }}
                  id="raised-button-file"
                  multiple
                  type="file"
                  disabled={!rowData.uuid}
                />
                <label htmlFor="raised-button-file">
                  <Button
                    variant="raised"
                    component="span"
                    disabled={!rowData.uuid}
                  >
                    Upload
                  </Button>
                </label>
              </div>
            ),
            render: (rowData) =>
              !rowData.imagen ? (
                <Image
                  alt="image-default"
                  src="http://lorempixels.com/1600/900/nature/"
                ></Image>
              ) : (
                <img
                  src={`${baseUrl}${rowData.imagen}`}
                  style={{ width: 40, borderRadius: "50%" }}
                  alt={rowData.nombre}
                />
              ),
          },

          {
            title: "Nombre",
            field: "nombre",
            validate: (rowData) =>
              rowData.nombre === "" ? "nombre no puede ser vacio" : "",
            emptyValue: () => <em>Vacio</em>,
          },
          {
            title: "Celular",
            field: "celular",
            validate: (rowData) =>
              rowData.celular === "" ? "celular no puede ser vacio" : "",
            emptyValue: () => <em>Vacio</em>,
          },
          {
            title: "Email",
            field: "email",
            validate: (rowData) =>
              rowData.email === "" ? "email no puede ser vacio" : "",
            emptyValue: () => <em>Vacio</em>,
          },
          {
            title: "Direccion",
            field: "direccion",
            validate: (rowData) =>
              rowData.direccion === "" ? "direccion no puede ser vacio" : "",
            emptyValue: () => <em>Vacio</em>,
          },
          {
            title: "Clave",
            field: "clave",
          },
          {
            title: "tipo_vehiculo",
            field: "tipo_vehiculo",
            lookup: {
              MOTO: "MOTO",
              PARTICULAR: "PARTICULAR",
              CAMION: "CAMION",
            },
            validate: (rowData) =>
              rowData.tipo_vehiculo === ""
                ? "tipo_vehiculo no puede ser vacio"
                : "",
          },
          {
            title: "tipo cobro",
            field: "tipocobro",
            lookup: {
              FIJO: "FIJO",
              PORCENTAJE: "PORCENTAJE",
            },
            validate: (rowData) =>
              rowData.tipocobro === "" ? "tipocobro no puede ser vacio" : "",
          },
          {
            title: "tipo usuario",
            field: "tipousuario",
            lookup: {
              GENERAL: "GENERAL",
              ESPECIAL: "ESPECIAL",
            },
            validate: (rowData) =>
              rowData.tipousuario === ""
                ? "tipousuario no puede ser vacio"
                : "",
          },
          {
            title: "placa",
            field: "placa",
            validate: (rowData) => rowData.placa === "" ? "placa no puede ser vacio": "",
          },
          {
            title: "fecha_tecnomecanica",
            field: "fecha_tecnomecanica",
            type: "date",
            dateSetting: { format: "yyyy/MM/dd" },
            validate: (rowData) => rowData.fecha_tecnomecanica === "" ? "fecha_tecnomecanica no puede ser vacio": "",
          },
          {
            title: "fecha_obligatorio",
            field: "fecha_obligatorio",
            type: "date",
            dateSetting: { format: "yyyy/MM/dd" },
            validate: (rowData) => rowData.fecha_obligatorio === "" ? "fecha_obligatorio no puede ser vacio": "",
          },
          {
            title: "cobro",
            field: "cobro",
            type: "numeric",
            validate: (rowData) =>
              rowData.cobro === "" ? "Cobro no puede ser vacio" : "",
          },
          {
            title: "Action",
            render: (rowData) => (
              <div>
                <Button
                  onClick={() => dispatch(openModalMessengerData(rowData))}
                >
                  Edit
                </Button>
              </div>
            ),
          },
        ]}
        data={users}
        title="DOMICILIARIOS"
        actions={[
          {
            icon: 'add',
            tooltip: "Add User",
            isFreeAction: true,
            onClick: (event) => dispatch(openModalMessenger()),
          }
        ]}
        options={{
          actionsColumnIndex: -1,
          addRowPosition: "first",
        }}
      />
      <ModalMessengers />
    </div>
  );
};

export default UserPageHome;
