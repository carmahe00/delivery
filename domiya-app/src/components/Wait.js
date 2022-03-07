import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import stylesForm from "../styles/form";
import { useDispatch, useSelector } from "react-redux";
import { pedidoReset } from "../actions/pedidosActions";

const Wait = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const { pedido } = useSelector((state) => state.pedidosConnect);
  const navigateToMain = () => {
    dispatch(pedidoReset())
    navigation.navigate("main");
  };
  useEffect(() => {
    switch (pedido.estado) {
      case "VA_RECOGER":
        return navigation.navigate("pedido");
      case "EN_CAMINO":
        return navigation.navigate("road");
      case "ENTREGADO":
        return navigation.navigate("wait");
      default:
        navigation.navigate("wait");
        break;
    }
  }, [pedido, navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" color="#03fcd3" style={styles.loading} />
      <Text style={styles.title}>Ahora espera al proveedor</Text>
      <Button
        mode="contained"
        style={stylesForm.btnSuccess}
        onPress={navigateToMain}
        title="Volver al menu"
      />
    </SafeAreaView>
  );
};

export default Wait;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
  },
});
