import React from "react";
import axios from "axios";
import * as yup from "yup";
import { Formik } from "formik";
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
import { PhotoCamera } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";

import types from "../types/userTypes";
import { addUser, updateUser } from "../actions/userActions";
import { closeModalMessenger } from "../actions/modalActions";

const baseUrl = process.env.REACT_APP_API_URL;

const validateSchema = yup.object({
  imagen: yup.string(),
  nombre: yup.string().required("Nombre obligatorio"),
  celular: yup.string().required("Celular obligatorio"),
  email: yup.string().email("Correo obligatorio"),
  direccion: yup.string().required("La descripción es obligatoria"),
  clave: yup.string(),
  tipo_vehiculo: yup.string().required("Tipo vehiculo es obligatorio"),
  tipocobro: yup.string().required("Tipo cobro es obligatorio"),
  tipousuario: yup.string().required("Tipo usuario es obligatorio"),
  placa: yup.string().required("Placa es obligatorio"),
  cobro: yup.number().required(),
  fecha_tecnomecanica: yup.string().required("Fecha tecnomecanica obligatoria"),
  fecha_obligatorio: yup.string().required("Fecha obligatorio obligatoria"),
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

const ModalMessengers = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { messengerModalOpen, messengerModal } = useSelector(
    (state) => state.modalMessenger
  );
  const { loadingUpdate } = useSelector((state) => state.userCrud);
  const { userInfo } = useSelector((state) => state.userLogin);
  const handleClose = () => dispatch(closeModalMessenger());

  const uploadFileHanlder = async (e, props) => {
    try {
      dispatch({
        type: types.userUpdateRequest,
      });
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      const { data } =
        messengerModal.uuid &&
        (await axios.post(
          `${baseUrl}/uploads/users/${messengerModal.uuid}`,
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
      open={messengerModalOpen}
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
            uuid: messengerModal.uuid,
            imagen: messengerModal.imagen ?? "",
            nombre: messengerModal.nombre ?? "",
            celular: messengerModal.celular ?? "",
            email: messengerModal.email ?? "",
            direccion: messengerModal.direccion ?? "",
            clave: "",
            tipo_vehiculo: messengerModal.tipo_vehiculo ?? "MOTO",
            tipocobro: messengerModal.tipocobro ?? "FIJO",
            tipousuario: messengerModal.tipousuario ?? "GENERAL",
            placa: messengerModal.placa ?? "",
            cobro: messengerModal.cobro ?? 0,
            fecha_tecnomecanica:
              moment(messengerModal.fecha_tecnomecanica).format("MM-DD-YYYY") ??
              "",
            fecha_obligatorio:
              moment(messengerModal.fecha_obligatorio).format("MM-DD-YYYY") ??
              "",
          }}
          onSubmit={async (props) => {
            const type = "DOMICILIARIOS";
            if (!messengerModal.uuid) {
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
              dispatch(updateUser({ ...messengerModal, ...props }));
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
                <TextField
                  type="text"
                  name="direccion"
                  label="Ingersar la direccion"
                  value={props.values.direccion}
                  onChange={props.handleChange}
                  error={props.touched.direccion && Boolean(props.errors.direccion)}
                />
                <TextField
                  type="text"
                  name="clave"
                  label="Ingersar el clave"
                  value={props.values.clave}
                  onChange={props.handleChange}
                  error={props.touched.clave && Boolean(props.errors.clave)}
                />
                <FormControl className={classes.formControl}>
                  <InputLabel className={classes.label} htmlFor="tipo_vehiculo">
                    TIPO VEHICULO
                  </InputLabel>
                  <Select
                    name="tipo_vehiculo"
                    value={props.values.tipo_vehiculo}
                    onChange={props.handleChange}
                    defaultValue="MOTO"
                  >
                    <MenuItem value="MOTO">MOTO</MenuItem>
                    <MenuItem value="PARTICULAR">PARTICULAR</MenuItem>
                    <MenuItem value="CAMION">CAMION</MenuItem>
                  </Select>
                </FormControl>
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
                <FormControl className={classes.formControl}>
                  <InputLabel className={classes.label} htmlFor="tipousuario">
                    TIPO USUARIO
                  </InputLabel>
                  <Select
                    name="tipousuario"
                    value={props.values.tipousuario}
                    onChange={props.handleChange}
                    defaultValue="GENERAL"
                  >
                    <MenuItem value="GENERAL">GENERAL</MenuItem>
                    <MenuItem value="ESPECIAL">ESPECIAL</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  type="text"
                  name="placa"
                  label="Ingersar el placa"
                  value={props.values.placa}
                  onChange={props.handleChange}
                  error={props.touched.placa && Boolean(props.errors.placa)}
                />
                <TextField
                  type="number"
                  name="cobro"
                  label="Ingersar el cobro"
                  value={props.values.cobro}
                  onChange={props.handleChange}
                  error={props.touched.cobro && Boolean(props.errors.cobro)}
                />
                <TextField
                  id="tecnomecanica"
                  type="text"
                  name="fecha_tecnomecanica"
                  placeholder="Mes-Dia-Año"
                  label="fecha tecnomecanica"
                  value={props.values.fecha_tecnomecanica}
                  onChange={props.handleChange}
                  error={
                    props.touched.fecha_tecnomecanica &&
                    Boolean(props.errors.fecha_tecnomecanica)
                  }
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="datetime-local"
                  type="text"
                  name="fecha_obligatorio"
                  placeholder="Mes-Dia-Año"
                  label="fecha obligatorio"
                  value={props.values.fecha_obligatorio}
                  onChange={props.handleChange}
                  error={
                    props.touched.fecha_obligatorio &&
                    Boolean(props.errors.fecha_obligatorio)
                  }
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
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

export default ModalMessengers;
