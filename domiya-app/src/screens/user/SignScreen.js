import React, { useState } from "react";
import {
  TextInput,
  Button,
  useTheme,
  Avatar,
  Snackbar,
  Card,
} from "react-native-paper";
import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from "react-native";

import stylesForm from "../../styles/form";
import { login } from "../../actions/userActions";
import Logo from "../../../assets/images/logo-2.png";
import ComponentLoading from "../../components/utils/ComponentLoading";
import { closeMessage } from "../../actions/messageActions";

const validateSchema = Yup.object().shape({
  email: Yup.string().required(true).email("Debe ser email"),
  password: Yup.string().required(true),
});

const SignScreen = () => {
  const { colors } = useTheme();
  const { height } = useWindowDimensions();
  const styles = makeStyles(colors);
  const [openEye, setOpenEye] = useState(true);
  const { visible } = useSelector((state) => state.message);
  const { loading, error } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const changeEye = () => {
    setOpenEye(!openEye);
  };
  const onDismissSnackBar = () => dispatch(closeMessage());
  if (loading) return <ComponentLoading />;
  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
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
              <Avatar.Image source={Logo} style={styles.logo} size={150} />
              <View style={[styles.card, { height: height * 0.7 }]}>
                <Card.Content style={styles.contentCard}>
                  <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.container}
                  >
                    <View style={styles.contenForm}>
                      <TextInput
                        placeholder="correo"
                        mode="flat"
                        style={stylesForm.input}
                        right={<TextInput.Icon name="account-circle" />}
                        onChangeText={handleChange("email")}
                        value={values.email}
                        onBlur={handleBlur("email")}
                        error={errors.email}
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect={false}
                        keyboardType="email-address"
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
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect={false}
                      />

                      <Button
                        mode="contained"
                        style={stylesForm.btnSuccess}
                        onPress={handleSubmit}
                      >
                        <Text style={stylesForm.textSuccess}>Login</Text>
                      </Button>
                    </View>
                    <Text style={styles.footerText}>
                      ©Desarrollado por DOMIYA
                    </Text>
                  </KeyboardAvoidingView>
                </Card.Content>
              </View>
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

const makeStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    root: {
      alignItems: "center",
      padding: 20,
      justifyContent: "center",
      flex: 1,
      backgroundColor: colors.bgDark,
    },
    card: {
      width: "100%",
      borderRadius: 20,
      zIndex: 2,
      elevation: 2,
      backgroundColor: colors.darkness,
    },
    contentCard: {
      flex: 1,
      justifyContent: "center",
    },
    contenForm: {
      flexGrow: 1,
      justifyContent: "center",
    },
    logo: {
      alignSelf: "center",
      backgroundColor: colors.fontLight,
      borderColor: `rgba(91, 3, 155, 0.9)`,
      borderStyle: "solid",
      borderStartWidth: 5,
      marginBottom: -5,
      zIndex: 10,
      elevation: 10,
    },
    footerText: {
      color: colors.fontLight,
      textAlign: "center",
      marginBottom: 20,
    },
  });

export default SignScreen;
