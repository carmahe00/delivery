import React, { useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  View,
} from "react-native";
import { useTheme, Card, Avatar } from "react-native-paper";

import stylesForm from "../styles/form";
import { useSelector } from "react-redux";
import { addProductOrder } from "../actions/storeActions";
import { useMounted } from "../hooks/useMounted";

const Wait = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const navigation = useNavigation();
  const { isVisible } = useMounted();
  const { pedido } = useSelector((state) => state.pedidosConnect);
  const navigateToMain = () => {
    navigation.navigate("home", { screen: "main" });
  };
  useFocusEffect(
    useCallback(() => {
      (async () => {
        await addProductOrder(
          pedido.id_pedido,
          pedido?.proveedor.nombre,
          pedido.nombre,
          pedido.fecha_hora,
          pedido.estado
        );
      })();
    }, [])
  );
  return (
    <>
      {isVisible && (
        <SafeAreaView style={styles.container}>
          <View style={styles.root}>
            <Card elevation={5} style={styles.card}>
              <Card.Content style={styles.content}>
                <Avatar.Icon icon="check" style={styles.avatarIcon} />
                <View style={styles.infoContainer} >
                  <Text style={styles.title}>
                    Servicio finalizado. Muchas gracias por tu colaboración.
                  </Text>
                </View>
                <Button
                  mode="contained"
                  style={stylesForm.btnSuccess}
                  onPress={navigateToMain}
                  title="Aceptar"
                />
              </Card.Content>
            </Card>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default Wait;

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
      flex: 0.7,
      width: "100%",
      borderRadius: 20,
      backgroundColor: colors.darkness,
    },
    content: {
      justifyContent: "center",
      flex: 1,
      alignItems: "center",
    },
    avatarIcon:{
      marginBottom: -10,
      zIndex: 10
    },
    infoContainer:{
      backgroundColor: colors.bgDark,
      borderRadius: 10,
      justifyContent: "center",
      padding: 15,
      height: 200,
      marginBottom: 10
    },
    title: {
      fontSize: 20,
      color: colors.fontLight,
      textAlign: "center",
    },
  });
