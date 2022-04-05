import React, { useCallback } from "react";
import { Snackbar } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import { useFocusEffect } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";
import { closeMessage } from "../actions/messageActions";
import FlatListPedido from "./Home/FlatListPedido";
import { useMounted } from "../hooks/useMounted";
import { getBalance } from "../actions/balanceActions";

const Home = () => {
  const dispatch = useDispatch();
  const { isVisible } = useMounted();

  const { pedidos } = useSelector((state) => state.pedidosConnect);
  const { visible, message } = useSelector((state) => state.message);

  const onDismissSnackBar = () => dispatch(closeMessage());

  useFocusEffect(
    useCallback(() => {
      dispatch(getBalance());
    }, [])
  );

  return (
    <>
      {isVisible && (
        <>
          {pedidos.length !== 0 ? (
            <FlatListPedido pedidos={pedidos} title="SERVICIOS DISPONIBLES" />
          ) : (
            <View style={styles.container}>
              <LottieView
                source={require("../assets/97920-scooter-delivery.json")}
                autoPlay
                style={{ opacity: 0.9 }}
              />
            </View>
          )}

          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            size="large"
          >
            {message}
          </Snackbar>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default Home;
