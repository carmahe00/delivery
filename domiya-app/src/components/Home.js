import React from "react";
import { useTheme, Snackbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { closeMessage } from "../actions/messageActions";
import FlatListPedido from "./Home/FlatListPedido";
import StatusBarCustom from "./StatusBarCustom";

const Home = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch()
  const { pedidos } = useSelector((state) => state.pedidosConnect);
  const { visible, message } = useSelector((state) => state.message);
  const onDismissSnackBar = () => dispatch(closeMessage())
  
  return (
    <>
      <StatusBarCustom
        backgroundColor={colors.bgDark}
        barStyle="light-content"
      />
      {pedidos.length > 0 && (
        <FlatListPedido pedidos={pedidos} title="Nuevos Pedidos" />
      )}
      <Snackbar visible={visible} onDismiss={onDismissSnackBar} >
          {message}
      </Snackbar>
    </>
  );
};

export default Home;
