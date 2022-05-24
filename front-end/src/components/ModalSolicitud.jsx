import React, { useContext } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  useMediaQuery,
} from "@material-ui/core";
import { Stack } from "@mui/material";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import { closeModalSolicitud } from "../actions/modalActions";
import { SocketContext } from "../context/SocketProvider";

const validationSchema = yup.object({
  tipo_vehiculo: yup.string().required(),
  valor_pedido: yup.number().required(),
  valor_domicilio: yup.number().required(),
  asegurar: yup.boolean(),
  valor_seguro: yup.number().required(),
  evidencia: yup.boolean().required(),
  forma_pago: yup.string().required(),
  celular: yup.string().required(),
  nombre: yup.string().required(),
  descripcion: yup.string().required("La descripción es obligatoria"),
  entregar: yup
    .string()
    .required("Donde se entrega es obligatoria es obligatoria"),
  recoger: yup.string().required("Donde ese recoge es obligatoria"),
  lat_entregar: yup.string().required("Debe seleccioonar donde se entrega"),
  lon_entregar: yup.string().required("Debe seleccioonar donde se entrega"),
  lat_recoger: yup.string().required("Debe seleccioonar donde se recoge"),
  lon_recoger: yup.string().required("Debe seleccioonar donde se recoge"),
});

const useStyles = makeStyles(
  (theme) => ({
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
    btnStyle: {
      margin: "8px 0",
    },
    input: {
      display: "none",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      justifyItems: "center",
      alignContent: "center",
      overflow: "scroll",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      [theme.breakpoints.down("md")]: {
        margin: 0,
      },
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    label: {
      fontSize: 10
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
    containerSweet: {
      zIndex: 2000,
    },
  }),
  { index: 1 }
);
const ModalSolicitud = () => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();

  const { socket } = useContext(SocketContext);
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const { solicitudModalOpen, solicitudModal } = useSelector(
    (state) => state.modalSolicitud
  );
  const {
    userInfo: { usuario },
  } = useSelector((state) => state.userLogin);
  const handleClose = () => dispatch(closeModalSolicitud());

  const handleSelectEntregar = async (value, props) => {
    const result = await geocodeByAddress(value);
    const { lat, lng } = await getLatLng(result[0]);
    props.setFieldValue("entregar", value, true);
    props.setFieldValue("lon_entregar", lat, true);
    props.setFieldValue("lat_entregar", lng, true);
  };
  const handleSelectRecoger = async (value, props) => {
    const result = await geocodeByAddress(value);
    const { lat, lng } = await getLatLng(result[0]);
    props.setFieldValue("recoger", value, true);
    props.setFieldValue("lon_recoger", lat, true);
    props.setFieldValue("lat_recoger", lng, true);
  };
  
  return (
    <Modal
      closeAfterTransition
      open={solicitudModalOpen}
      BackdropProps={{
        timeout: 500,
      }}
      className={classes.modal}
      onClose={handleClose}
      disableScrollLock={false}
    >
      <Paper elevation={5} className={classes.paperStyle}>
        <Formik
          validationSchema={validationSchema}
          className={classes.rootForm}
          initialValues={{
            entregar: solicitudModal.entregar ?? "",
            lat_entregar: solicitudModal.lat_entregar ?? "",
            lon_entregar: solicitudModal.lon_entregar ?? "",
            lat_recoger: solicitudModal.lat_recoger ?? usuario.latitud,
            lon_recoger: solicitudModal.lon_recoger ?? usuario.longitud,
            recoger: solicitudModal.recoger ?? usuario.direccion,
            tipo_vehiculo: solicitudModal.tipo_vehiculo  ?? "MOTO" ,
            valor_domicilio: solicitudModal.valor_domicilio ?? 0,
            valor_pedido: solicitudModal.valor_pedido ?? 0,
            asegurar: solicitudModal.asegurar || false,
            valor_seguro: solicitudModal.valor_seguro ?? 0,
            evidencia: solicitudModal.evidencia || false,
            forma_pago: solicitudModal.forma_pago ?? "PAGO_TOTAL",
            celular: solicitudModal.celular ?? "",
            nombre: solicitudModal.nombre ?? "",
            descripcion: solicitudModal.descripcion ?? null,
            id_pedido: solicitudModal.id_pedido,
            tipousuario: solicitudModal.tipousuario
          }}
          onSubmit={async (props) => {
            socket.emit("emitir-mensaje", props);
            dispatch(closeModalSolicitud());
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <div className={classes.textInputContainer}>
                
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="tipo_vehiculo">Tipo Vehiculo</InputLabel>
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
                <TextField
                  type="number"
                  name="valor_pedido"
                  label="Ingersar el Valor Transportado"
                  value={props.values.valor_pedido}
                  onChange={props.handleChange}
                  error={
                    props.touched.valor_pedido &&
                    Boolean(props.errors.valor_pedido)
                  }
                />
                <TextField
                  type="number"
                  name="valor_seguro"
                  label="Ingersar el Valor Seguro"
                  value={props.values.valor_seguro}
                  onChange={props.handleChange}
                  error={
                    props.touched.valor_seguro &&
                    Boolean(props.errors.valor_seguro)
                  }
                />
                <TextField
                  type="number"
                  name="valor_domicilio"
                  label="Valor Domicilio"
                  value={props.values.valor_domicilio}
                  onChange={props.handleChange}
                  error={
                    props.touched.valor_domicilio &&
                    Boolean(props.errors.valor_domicilio)
                  }
                />

                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="forma_pago">Forma de Pago</InputLabel>
                  <Select
                    name="forma_pago"
                    value={props.values.forma_pago}
                    onChange={props.handleChange}
                    defaultValue="PAGO_TOTAL"
                  >
                    <MenuItem value="PAGO_TOTAL">PAGO_TOTAL</MenuItem>
                    <MenuItem value="PAGA_ENVIA">PAGA_ENVIA</MenuItem>
                    <MenuItem value="PAGA_RECIBE">PAGA_RECIBE</MenuItem>
                  </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                  <InputLabel className={classes.label} htmlFor="tipousuario">TIPO DOMICILIARIO</InputLabel>
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
                  name="nombre"
                  label="nombre"
                  value={props.values.nombre}
                  onChange={props.handleChange}
                  error={props.touched.nombre && Boolean(props.errors.nombre)}
                />

                <TextField
                  type="text"
                  name="celular"
                  label="celular"
                  value={props.values.celular}
                  onChange={props.handleChange}
                  error={props.touched.celular && Boolean(props.errors.celular)}
                />
                <FormControlLabel
                  size="small"
                  control={<Checkbox checked={props.values.asegurar} color="primary" />}
                  name="asegurar"
                  label="Asegurar"
                  value={props.values.asegurar}
                  onChange={props.handleChange}
                  error={
                    props.touched.asegurar && Boolean(props.errors.asegurar)
                  }
                />

                <FormControlLabel
                  size="small"
                  control={<Checkbox checked={props.values.evidencia} color="primary" />}
                  name="evidencia"
                  label="evidencia"
                  value={props.values.evidencia}
                  onChange={props.handleChange}
                  error={
                    props.touched.evidencia && Boolean(props.errors.evidencia)
                  }
                />
              </div>
              <Stack direction={matches ? "column" : "row"} spacing={1}>
                <PlacesAutocomplete
                  value={props.values.entregar}
                  onSelect={async (val) =>
                    await handleSelectEntregar(val, props)
                  }
                  onChange={(val) => props.setFieldValue("entregar", val, true)}
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
                        name="entregar"
                        fullWidth
                        {...getInputProps({
                          placeholder: "Ingrese lugar entrega",
                        })}
                        error={
                          (props.touched.entregar &&
                            Boolean(props.errors.entregar)) ||
                          (props.touched.lat_entregar &&
                            Boolean(props.errors.lat_entregar)) ||
                          (props.touched.lon_entregar &&
                            Boolean(props.errors.lon_entregar))
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

                <PlacesAutocomplete
                  value={props.values.recoger}
                  onSelect={async (val) =>
                    await handleSelectRecoger(val, props)
                  }
                  onChange={(val) => props.setFieldValue("recoger", val, true)}
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
                        name="recoger"
                        fullWidth
                        {...getInputProps({
                          placeholder: "Ingrese lugar para recoger",
                        })}
                        error={
                          (props.touched.recoger &&
                            Boolean(props.errors.recoger)) ||
                          (props.touched.lat_recoger &&
                            Boolean(props.errors.lat_recoger)) ||
                          (props.touched.lon_recoger &&
                            Boolean(props.errors.lon_recoger))
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
              </Stack>
              <TextField
                fullWidth
                label="Observación"
                placeholder="Ingrese una observación"
                name="descripcion"
                value={props.values.descripcion}
                onChange={props.handleChange}
                error={
                  props.touched.descripcion && Boolean(props.errors.descripcion)
                }
                helperText={
                  props.touched.descripcion && props.errors.descripcion
                }
              />
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

export default ModalSolicitud;
