import React from "react";
import * as yup from "yup";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Button,
  CircularProgress,
  IconButton,
} from "@material-ui/core";
import types from "../types/userTypes";
import { PhotoCamera } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { closeModalProvider } from "../actions/modalActions";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Swal from "sweetalert2";
import { Formik } from "formik";
import { addUser, updateUser } from "../actions/userActions";

const baseUrl = process.env.REACT_APP_API_URL;

const validateSchema = yup.object({
  imagen: yup.string(),
  nombre: yup.string().required("Nombre obligatorio"),
  celular: yup.string().required("Celular obligatorio"),
  email: yup.string().required("Correo obligatorio"),
  direccion: yup.string().required("La descripción es obligatoria"),
  clave: yup.string(),
  tipocobro: yup.string().required("Tipo cobro es obligatorio"),
  cobro: yup.number().required(),
  longitud: yup.string().required("Debe seleccioonar donde se entrega"),
  latitud: yup.string().required("Debe seleccioonar donde se recoge"),
});

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    justifyItems: "center",
    alignContent: "center",
    overflow: "scroll",
  },
  paperStyle: {
    padding: 20,
    margin: "20px auto",
    maxWidth: 1000,
    overflow: "scroll",
    [theme.breakpoints.down("md")]: {
      maxHeight: 600,
    },
    [theme.breakpoints.down("sm")]: {
      maxHeight: 550,
      padding: 10,
      margin: "auto",
    },
  },
  rootForm: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    overflow: "scroll",
  },
  textInputContainer: {
    marginTop: "10px",
    overflow: "scroll",
    [theme.breakpoints.down("md")]: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    [theme.breakpoints.down("md")]: {
      margin: 0,
    },
  },
  input: {
    display: "none",
  },
}));

const ModalProvider = () => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();

  const { providerModalOpen, providerModal } = useSelector(
    (state) => state.modalProvider
  );
  const { loadingUpdate } = useSelector(
    (state) => state.userCrud
  );
  const { userInfo } = useSelector((state) => state.userLogin);
  const handleClose = () => dispatch(closeModalProvider());
  const handleSelectDireccion = async (value, props) => {
    const result = await geocodeByAddress(value);
    const { lat, lng } = await getLatLng(result[0]);
    props.setFieldValue("direccion", value, true);
    props.setFieldValue("longitud", lat, true);
    props.setFieldValue("latitud", lng, true);
  };

  const uploadFileHanlder = async (e, props) => {
    try {
      dispatch({
        type: types.userUpdateRequest,
      });
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      const { data } =
        providerModal.uuid &&
        (await axios.post(
          `${baseUrl}/uploads/users/${providerModal.uuid}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `${userInfo.token}`,
            },
          }
        ));
      console.log("update Image:", data);
      props.setFieldValue("imagen", data.imagen);
      dispatch({
        type: types.userUpdateSuccess,
        payload: data,
      });
      Swal.fire("Exito!", "Imagen subida con exito!", "success");
    } catch (error) {
      Swal.fire("Error!", "Imagen no se pudo subir!", "error");
      console.log(error.response);
      dispatch({
        type: types.userUpdateFail,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  return (
    <Modal
      closeAfterTransition
      open={providerModalOpen}
      BackdropProps={{
        timeout: 500,
      }}
      className={classes.modal}
      onClose={handleClose}
      disableScrollLock={false}
    >
      <Paper elevation={5} className={classes.paperStyle}>
        <Formik
          validationSchema={validateSchema}
          className={classes.rootForm}
          initialValues={{
            uuid: providerModal.uuid,
            imagen: providerModal.imagen ?? "",
            nombre: providerModal.nombre ?? "",
            celular: providerModal.celular ?? "",
            email: providerModal.email ?? "",
            direccion: providerModal.direccion ?? "",
            clave: "",
            tipocobro: providerModal.tipocobro ?? "FIJO",
            cobro: providerModal.cobro ?? 0,
            longitud: providerModal.longitud ?? "",
            latitud: providerModal.latitud ?? "",
          }}
          onSubmit={async (props) => {
            const type = "PROVEEDORES";
            if (!providerModal.uuid) {
              console.log("Crear");
              dispatch(
                addUser({
                  ...props,
                  type,
                  id_ciudad: userInfo?.usuario.id_ciudad,
                })
              );
            } else {
              console.log("Update");
              dispatch(updateUser({ ...providerModal, ...props }));
            }
            handleClose();
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <div className={classes.textInputContainer}>
                <TextField
                  type="text"
                  name="nombre"
                  label="Ingersar el nombre"
                  value={props.values.nombre}
                  onChange={props.handleChange}
                  error={props.touched.nombre && Boolean(props.errors.nombre)}
                />
                <TextField
                  type="text"
                  name="celular"
                  label="Ingersar el celular"
                  value={props.values.celular}
                  onChange={props.handleChange}
                  error={props.touched.celular && Boolean(props.errors.celular)}
                />
                <TextField
                  type="email"
                  name="email"
                  label="Ingersar el email"
                  value={props.values.email}
                  onChange={props.handleChange}
                  error={props.touched.email && Boolean(props.errors.email)}
                />

                <PlacesAutocomplete
                  value={props.values.direccion}
                  onSelect={async (val) =>
                    await handleSelectDireccion(val, props)
                  }
                  onChange={(val) =>
                    props.setFieldValue("direccion", val, true)
                  }
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                  }) => (
                    <div
                      style={{
                        overflow: "auto",
                      }}
                    >
                      <TextField
                        type="text"
                        name="direccion"
                        fullWidth
                        {...getInputProps({
                          placeholder: "Ingrese la dirección",
                        })}
                        error={
                          (props.touched.direccion &&
                            Boolean(props.errors.direccion)) ||
                          (props.touched.latitud &&
                            Boolean(props.errors.latitud)) ||
                          (props.touched.longitud &&
                            Boolean(props.errors.longitud))
                        }
                      />
                      <div>
                        {loading && <div>cargando...</div>}
                        {suggestions.map((suggestion) => {
                          const style = suggestion.active
                            ? {
                                backgroundColor: theme.palette.common.yellow,
                                color: "#fff",
                                cursor: "pointer",
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

                <TextField
                  type="text"
                  name="clave"
                  label="Ingersar el clave"
                  value={props.values.clave}
                  onChange={props.handleChange}
                  error={props.touched.clave && Boolean(props.errors.clave)}
                />
                <FormControl className={classes.formControl}>
                  <InputLabel className={classes.label} htmlFor="tipocobro">
                    TIPO COBRO
                  </InputLabel>
                  <Select
                    name="tipocobro"
                    value={props.values.tipocobro}
                    onChange={props.handleChange}
                    defaultValue="FIJO"
                  >
                    <MenuItem value="FIJO">FIJO</MenuItem>
                    <MenuItem value="PORCENTAJE">PORCENTAJE</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  type="number"
                  name="cobro"
                  label="Ingersar el cobro"
                  value={props.values.cobro}
                  onChange={props.handleChange}
                  error={props.touched.cobro && Boolean(props.errors.cobro)}
                />
              </div>
              {props.values.uuid && (
                <>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="icon-button-file"
                    type="file"
                    onChange={(e) => uploadFileHanlder(e, props)}
                  />
                  <label htmlFor="icon-button-file">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera />
                    </IconButton>
                    {loadingUpdate && (
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
                    )}
                  </label>
                </>
              )}
              <Button
                type="submit"
                color="primary"
                variant="contained"
                className={classes.btnStyle}
              >
                Enviar
              </Button>
              <Button onClick={handleClose} className={classes.btnStyle}>
                cancelar
              </Button>
            </form>
          )}
        </Formik>
      </Paper>
    </Modal>
  );
};

export default ModalProvider;
