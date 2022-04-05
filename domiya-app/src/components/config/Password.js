import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { Snackbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { TextInput, Button } from "react-native-paper";

import stylesForm from "../../styles/form";
import { closeMessage } from "../../actions/messageActions";
import { changePassword } from "../../actions/userActions";

const validationSchema = Yup.object({
  oldPassword: Yup.string("Ingrese su usuario").required(
    "Contraseña es obligatorio"
  ),

  password: Yup.string("Enter your password")
    .min(4, "La contraseña es minima de 4 caracteres")
    .required("Password es obligatorio"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Contraseña debe coincidir"
  ),
});

const Password = () => {
  const dispatch = useDispatch()
  const { visible, message } = useSelector((state) => state.message);
  const onDismissSnackBar = () => dispatch(closeMessage());
  const { loading, error } = useSelector((state) => state.userReducer);
  return (
    <View style={styles.container}>
      
        <Formik
          initialValues={{
            oldPassword: "",
            password: "",
            passwordConfirmation: "",
          }}
          validationSchema={validationSchema}
          onSubmit={({passwordConfirmation, ...props}) => {
            
            dispatch(changePassword(props))
          }}
        >
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.root}>
              <TextInput
                placeholder="Contraseña Anterior"
                mode="flat"
                style={stylesForm.input}
                right={<TextInput.Icon name="key" />}
                onChangeText={handleChange("oldPassword")}
                value={values.oldPassword}
                onBlur={handleBlur("oldPassword")}
                error={errors.oldPassword}
              />

              <TextInput
                placeholder="contraseña"
                secureTextEntry={true}
                mode="flat"
                style={stylesForm.input}
                onChangeText={handleChange("password")}
                value={values.password}
                onBlur={handleBlur("password")}
                error={errors.password}
              />

              <TextInput
                placeholder="Confirme Contraseña"
                secureTextEntry={true}
                mode="flat"
                style={stylesForm.input}
                onChangeText={handleChange("passwordConfirmation")}
                value={values.passwordConfirmation}
                onBlur={handleBlur("passwordConfirmation")}
                error={errors.passwordConfirmation}
              />

              <Button
                mode="contained"
                style={stylesForm.btnSuccess}
                onPress={handleSubmit}
              >
                <Text style={stylesForm.textSuccess}>Cambiar Contraseña</Text>
              </Button>
            </View>
          )}
        </Formik>
      
      <Snackbar visible={visible} onDismiss={onDismissSnackBar} size="large">
        {error}
      </Snackbar>
    </View>
  );
};

export default Password;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center"
  },
});
