import React from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Button, CircularProgress, TextField } from "@mui/material";
import { changePassword } from "../actions/userActions";

const validationSchema = yup.object({
  oldPassword: yup
    .string("Ingrese su usuario")
    .required("Contraseña es obligatorio"),

  password: yup
    .string("Enter your password")
    .min(4, "La contraseña es minima de 4 caracteres")
    .required("Password es obligatorio"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Contraseña debe coincidir"),
});

function FormPassword() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.userLogin);

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
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        oldPassword: "",
        password: "",
        passwordConfirmation: "",
      }}
      onSubmit={({ passwordConfirmation, ...props }) => {
        dispatch(changePassword(props));
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          
          <TextField
            fullWidth
            label="Contraseña Antigua"
            margin="normal"
            placeholder="Ingrese su antigua contraseña"
            name="oldPassword"
            value={props.values.oldPassword}
            onChange={props.handleChange}
            error={
              props.touched.oldPassword && Boolean(props.errors.oldPassword)
            }
            helperText={props.touched.oldPassword && props.errors.oldPassword}
          />
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            margin="normal"
            placeholder="Ingrese su nueva contraseña"
            name="password"
            value={props.values.password}
            onChange={props.handleChange}
            error={props.touched.password && Boolean(props.errors.password)}
            helperText={props.touched.password && props.errors.password}
          />
          <TextField
            fullWidth
            label="Confirme contraseña"
            type="password"
            margin="normal"
            placeholder="Confirme nueav contraseña"
            name="passwordConfirmation"
            value={props.values.passwordConfirmation}
            onChange={props.handleChange}
            error={
              props.touched.passwordConfirmation &&
              Boolean(props.errors.passwordConfirmation)
            }
            helperText={
              props.touched.passwordConfirmation &&
              props.errors.passwordConfirmation
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cambiar Contraseña
          </Button>
        </form>
      )}
    </Formik>
  );
}

export default FormPassword;
