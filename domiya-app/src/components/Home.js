import React, { useEffect } from "react";
import { useTheme, Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { closeMessage } from "../actions/messageActions";
import FlatListPedido from "./Home/FlatListPedido";
import StatusBarCustom from "./StatusBarCustom";
import ComponentLoading from "./utils/ComponentLoading";

const Home = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { pedidos, pedido } = useSelector((state) => state.pedidosConnect);
  const { visible, message } = useSelector((state) => state.message);
  const onDismissSnackBar = () => dispatch(closeMessage());

  useEffect(() => {
    switch (pedido.estado) {
      case "VA_RECOGER":
        return navigation.navigate("pedido");
      case "EN_CAMINO":
        return navigation.navigate("road");
      case "ENTREGADO":
        return navigation.navigate("wait");
      default:
        navigation.navigate("main");
        break;
    }
  }, [pedido, navigation]);
  return (
    <>
      <StatusBarCustom
        backgroundColor={colors.bgDark}
        barStyle="light-content"
      />
      {pedidos.length > 0 ? (
        <FlatListPedido pedidos={pedidos} title="Nuevos Pedidos" />
      ) : (
        <ComponentLoading text="Esperando pedidos..." />
      )}
      <Snackbar visible={visible} onDismiss={onDismissSnackBar} size="large">
        {message}
      </Snackbar>
    </>
  );
};

export default Home;
