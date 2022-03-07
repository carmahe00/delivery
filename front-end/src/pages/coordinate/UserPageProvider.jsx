import React, { useEffect, useRef } from "react";
import MaterialTable from "material-table";
import { Button, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import {
  addUser,
  deleteUser,
  updateUser,
  uploadImage,
  users as usersFetch,
} from "../../actions/userActions";
import { Image } from "@mui/icons-material";

const baseUrl = process.env.REACT_APP_API_URL_BASE;

const UserPage = () => {
  const dispatch = useDispatch();

  const { users, loading } = useSelector((state) => state.userCrud);
  const { userInfo } = useSelector((state) => state.userLogin);
  const chosenImage = useRef(null);

  useEffect(() => {
    dispatch(usersFetch("PROVEEDORES"));
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
              const type = "PROVEEDORES";
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
              chosenImage.current !== null &&
                dispatch(uploadImage(chosenImage, newRow));
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
            editComponent: ({rowData}) => (
              <div value="photo">
                <input
                  ref={chosenImage}
                  accept="image/*"
                  style={{ display: "none" }}
                  id="raised-button-file"
                  multiple
                  type="file"
                  disabled={!Object.keys(rowData).length}
                />
                <label htmlFor="raised-button-file">
                  <Button
                    variant="raised"
                    component="span"
                    disabled={!Object.keys(rowData).length}
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
                />
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
        ]}
        data={users}
        title="PROVEEDORES"
        options={{
          actionsColumnIndex: -1,
          addRowPosition: "first",
        }}
      />
    </div>
  );
};

export default UserPage;
