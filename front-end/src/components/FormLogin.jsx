import React from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  CircularProgress,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { login } from "../actions/userActions";

const validationSchema = yup.object({
  email: yup
    .string("Ingrese su usuario")
    .required("Email es obligatorio")
    .email("Debe ser un correo valido"),
  password: yup
    .string("Enter your password")
    .min(4, "La contraseña es minima de 4 caracteres")
    .required("Password es obligatorio"),
});



function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        {/* {`${window.location.protocol}//${window.location.hostname}`} */}
        Domiya
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const FormLogin = () => {
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
        email: "",
        password: "",
      }}
      onSubmit={({ email, password }) => {
        dispatch(login(email, password));
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <TextField
            fullWidth
            label="Correo"
            margin="normal"
            placeholder="Ingrese su correo"
            name="email"
            value={props.values.email}
            onChange={props.handleChange}
            error={props.touched.email && Boolean(props.errors.email)}
            helperText={props.touched.email && props.errors.email}
          />
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            margin="normal"
            placeholder="Ingrese su contraseña"
            name="password"
            value={props.values.password}
            onChange={props.handleChange}
            error={props.touched.password && Boolean(props.errors.password)}
            helperText={props.touched.password && props.errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Iniciar
          </Button>
          <Copyright sx={{ mt: 5 }} />
          
        </form>
      )}
    </Formik>
  );
};

export default FormLogin;
