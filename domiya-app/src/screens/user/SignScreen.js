import React, { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import { Snackbar } from "react-native-paper";
import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";

import stylesForm from "../../styles/form";
import { login } from "../../actions/userActions";
import Logo from "../../../assets/images/logo-2.jpeg";
import ComponentLoading from "../../components/utils/ComponentLoading";
import { closeMessage } from "../../actions/messageActions";

const validateSchema = Yup.object().shape({
  email: Yup.string().required(true).email("Debe ser email"),
  password: Yup.string().required(true),
});

const SignScreen = () => {
  const { height } = useWindowDimensions();
  const [openEye, setOpenEye] = useState(true);
  const { visible, message } = useSelector((state) => state.message);
  const { loading, error } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const changeEye = () => {
    setOpenEye(!openEye);
  };

  const onDismissSnackBar = () => dispatch(closeMessage());
  if (loading) return <ComponentLoading />;

  return (
    <>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validateSchema}
          onSubmit={async ({ email, password }) => {
            dispatch(login(email, password));
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
              <Image
                source={Logo}
                style={[styles.logo, { height: height * 0.3 }]}
                resizeMode="contain"
              />
              <TextInput
                placeholder="correo"
                mode="flat"
                style={stylesForm.input}
                right={<TextInput.Icon name="account-circle" />}
                onChangeText={handleChange("email")}
                value={values.email}
                onBlur={handleBlur("email")}
                error={errors.email}
              />

              <TextInput
                placeholder="contraseña"
                secureTextEntry={openEye}
                mode="flat"
                style={stylesForm.input}
                right={
                  <TextInput.Icon
                    onPress={changeEye}
                    name={openEye ? "eye" : "eye-off"}
                  />
                }
                onChangeText={handleChange("password")}
                value={values.password}
                onBlur={handleBlur("password")}
                error={errors.password}
              />

              <Button
                mode="contained"
                style={stylesForm.btnSuccess}
                onPress={handleSubmit}
              >
                <Text style={stylesForm.textSuccess}>Login</Text>
              </Button>
            </View>
          )}
        </Formik>
      </ScrollView>
      <Snackbar visible={visible} onDismiss={onDismissSnackBar} size="large">
        {error}
      </Snackbar>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
    justifyContent: "center",
    height: "100%",
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    height: 100,
    maxHeight: 200,
  },
});

export default SignScreen;
