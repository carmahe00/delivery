import React, { useEffect, useRef } from "react";
import MaterialTable from "material-table";
import { CircularProgress, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import {
  addUser,
  deleteUser,
  uploadImage,
  updateUser,
  users as usersFetch,
} from "../../actions/userActions";
import { Image } from "@mui/icons-material";

const baseUrl = process.env.REACT_APP_API_URL_BASE;

const UserPageHome = () => {
  const dispatch = useDispatch();

  const { users, loading } = useSelector((state) => state.userCrud);
  const { userInfo } = useSelector((state) => state.userLogin);
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
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        editable={{
          onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              const type = "DOMICILIARIOS";
              dispatch(
                addUser({
                  ...newRow,
                  type,
                  id_ciudad: userInfo?.usuario.id_ciudad,
                })
              );
              resolve();
            }),
          onRowUpdate: (newRow) =>
            new Promise((resolve, reject) => {
              dispatch(updateUser(newRow));
              chosenImage.current && dispatch(uploadImage(chosenImage, newRow));
              chosenImage.current = null;
              resolve();
            }),
          onRowDelete: (newRow) =>
            new Promise((resolve, reject) => {
              dispatch(deleteUser(newRow));
              resolve();
            }),
        }}
        columns={[
          {
            title: "imagen",
            field: "imagen",
            editable: "always",
            editComponent: () => (
              <div value="photo">
                <input
                  ref={chosenImage}
                  accept="image/*"
                  style={{ display: "none" }}
                  id="raised-button-file"
                  multiple
                  type="file"
                />
                <label htmlFor="raised-button-file">
                  <Button variant="raised" component="span">
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
            emptyValue: () => <em>Vacio</em>,
          },
          {
            title: "Celular",
            field: "celular",
            emptyValue: () => <em>Vacio</em>,
          },
          {
            title: "Email",
            field: "email",
            emptyValue: () => <em>Vacio</em>,
          },
          {
            title: "Direccion",
            field: "direccion",
            emptyValue: () => <em>Vacio</em>,
          },
          { title: "Clave", field: "clave" },
          { title: "Longitud", field: "longitud" },
          { title: "Latitud", field: "latitud" },
          {
            title: "tipo_vehiculo",
            field: "tipo_vehiculo",
            lookup: {
              MOTO: "MOTO",
              PARTICULAR: "PARTICULAR",
              CAMION: "CAMION",
            },
          },
          { title: "placa", field: "placa" },
          {
            title: "fecha_tecnomecanica",
            field: "fecha_tecnomecanica",
            type: "date",
            dateSetting: { format: "yyyy/MM/dd" },
          },
          {
            title: "fecha_obligatorio",
            field: "fecha_obligatorio",
            type: "date",
            dateSetting: { format: "yyyy/MM/dd" },
          },
        ]}
        data={users}
        title="DOMICILIARIOS"
        options={{
          actionsColumnIndex: -1,
          addRowPosition: "first",
        }}
      />
    </div>
  );
};

export default UserPageHome;
