import React, { useEffect, useRef } from "react";
import MaterialTable from "@material-table/core";
import { TextField } from "@material-ui/core";
import { Button, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@material-ui/core/styles";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import {
  users as usersFetch,
} from "../../actions/userActions";
import {
  openModalProvider,
  openModalProviderData,
} from "../../actions/modalActions";
import { Image } from "@mui/icons-material";
import ModalProvider from "../../components/ModalProvider";

const baseUrl = process.env.REACT_APP_API_URL_BASE;

const UserPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { users, loading } = useSelector((state) => state.userCrud);
  const chosenImage = useRef(null);
  const coordinate = useRef(null);

  useEffect(() => {
    dispatch(usersFetch("PROVEEDORES"));
  }, [dispatch]);

  const handleSelectEntregar = async (value, props) => {
    props.onChange(value);
    const result = await geocodeByAddress(value);
    const { lat, lng } = await getLatLng(result[0]);
    coordinate.current = { longitud: lat, latitud: lng };
  };

  const handleChange = async (val, props) => {
    props.onChange(val);
  };

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
        columns={[
          {
            title: "imagen",
            field: "imagen",
            editable: "onUpdate",
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
            validate: (rowData) =>
              rowData.nombre === "" ? "Nombre no puede ser vacio" : "",
            emptyValue: () => <em>Vacio</em>,
          },
          {
            title: "Celular",
            field: "celular",
            validate: (rowData) =>
              rowData.celular === "" ? "Celular no puede ser vacio" : "",
            emptyValue: () => <em>Vacio</em>,
          },
          {
            title: "Email",
            field: "email",
            validate: (rowData) =>
              rowData.email === "" ? "Email no puede ser vacio" : "",
            emptyValue: () => <em>Vacio</em>,
          },
          {
            title: "Direccion",
            field: "direccion",
            validate: (rowData) =>
              rowData.direccion === "" ? "Direaccion no puede ser vacio" : "",
            editComponent: (props) => (
              <PlacesAutocomplete
                value={props.value}
                onChange={(val) => handleChange(val, props)}
                onSelect={(val) => handleSelectEntregar(val, props)}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div>
                    <TextField
                      type="text"
                      name="entregar"
                      fullWidth
                      {...getInputProps({
                        placeholder: "Ingrese la dirección",
                      })}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100px",
                        overflow: "auto",
                      }}
                    >
                      {loading && <div>cargando...</div>}
                      {suggestions.map((suggestion) => {
                        const style = suggestion.active
                          ? {
                              backgroundColor: theme.palette.common.yellow,
                              cursor: "pointer",
                              color: "#fff",
                            }
                          : { backgroundColor: "#ffffff", cursor: "pointer" };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, { style })}
                          >
                            {suggestion.description}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
            ),
            emptyValue: () => <em>Vacio</em>,
          },
          { title: "Clave", field: "clave" },
          {
            title: "tipo cobro",
            field: "tipocobro",
            lookup: {
              FIJO: "FIJO",
              PORCENTAJE: "PORCENTAJE",
            },
            validate: (rowData) =>
              rowData.tipocobro === "" ? "Tipo Cobro no puede ser vacio" : "",
          },
          {
            title: "cobro",
            field: "cobro",
            type: "numeric",
            validate: (rowData) =>
              rowData.cobro === "" ? "Cobro no puede ser vacio" : "",
          },
          { title: "Clave", field: "clave" },
          {
            title: "Action",
            render: (rowData) => (
              <div>
                <Button
                  onClick={() => dispatch(openModalProviderData(rowData))}
                >
                  Edit
                </Button>
              </div>
            ),
          },
        ]}
        data={users}
        title="PROVEEDORES"
        actions={[
          {
            icon: "add",
            tooltip: "Add User",
            isFreeAction: true,
            onClick: (event) => dispatch(openModalProvider()),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
          addRowPosition: "first",
        }}
      />
      <ModalProvider />
    </div>
  );
};

export default UserPage;
