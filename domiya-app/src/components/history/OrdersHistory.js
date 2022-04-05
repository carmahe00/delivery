import React, { useCallback } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import moment from "moment";
import { useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { listPedidos } from "../../actions/historyActions";
import ComponentLoading from "../../components/utils/ComponentLoading";

moment.locale("es");
const OrdersHistory = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const styles = makeStyles(colors);
  const navigation = useNavigation();
  const { pedidos, loading } = useSelector((state) => state.history);
  useFocusEffect(
    useCallback(() => {
      dispatch(listPedidos());
    }, [])
  );
  if (loading) return <ComponentLoading />;
  const navigateToDetail = (id_pedido) => {
    navigation.navigate("order-history", { id_pedido });
  };

  const HeaderList = () => (
    <View style={styles.item}>
      <Text style={styles.titleHeader}>SERVICIO</Text>
      <Text style={styles.titleHeader}>FECHA HORA</Text>
      <Text style={styles.titleHeader}>VALOR</Text>
      <Text style={styles.titleHeader}>COMISIÓN</Text>
    </View>
  );

  const Item = ({ numero, fechaHora, valor, comision }) => (
    <TouchableOpacity
      onPress={() => navigateToDetail(numero)}
      style={styles.item}
    >
      <Text style={styles.title}>#{numero}</Text>
      <Text style={styles.title}>{moment(fechaHora).format("DD MM YYYY, h:mm:ss")}</Text>
      <Text style={styles.titlePrice}>${valor}</Text>
      <Text style={styles.title}>${comision}</Text>
    </TouchableOpacity>
  );
  const renderItem = ({ item }) => (
    <Item
      valor={item.valor_domicilio}
      numero={item.id_pedido}
      fechaHora={item.fecha_hora}
      comision={item.comision}
    />
  );
  return (
    <FlatList
      ListHeaderComponent={
        <>
          <Text style={styles.textTitle}>{"HISTORIAL DE PEDIDOS"}</Text>
          <HeaderList />
        </>
      }
      ItemSeparatorComponent={(props) => {
        return (
          <View
            style={{
              height: 5,
              backgroundColor: props.highlighted
                ? colors.darkness
                : colors.bgDark,
            }}
          />
        );
      }}
      data={pedidos}
      renderItem={renderItem}
      keyExtractor={(order, index) => `${order.id_pedido}${index}`}
      ListEmptyComponent={() => (
        <View style={styles.container}>
          <Text>No hay Pedidos</Text>
        </View>
      )}
    />
  );
};

const makeStyles = (colors) =>
  StyleSheet.create({
    titleHeader: {
      color: colors.bgDark,
      fontWeight: "bold",
      fontSize: 16,
      marginTop: 10,
      flexGrow: 1,
      width: 80,
      textAlign: "center",
      overflow: "hidden",
    },
    titlePrice: {
      fontWeight: "bold",
      fontSize: 7,
      marginTop: 10,
      flexGrow: 1,
      width: 80,
      textAlign: "right",
      overflow: "scroll",
    },
    title: {
      fontWeight: "bold",
      fontSize: 7,
      marginTop: 10,
      flexGrow: 1,
      width: 80,
      textAlign: "center",
      overflow: "scroll",
    },
    item: {
      width: "100%",
      justifyContent: "space-between",
      flexDirection: "row",
    },
    container: {
      flex: 1,
    },
    textInfo: {
      textAlign: "center",
    },
    textTitle: {
      color: colors.bgDark,
      fontWeight: "bold",
      fontSize: 20,
      marginTop: 20,
      textAlign: "center",
    },
  });
export default OrdersHistory;
