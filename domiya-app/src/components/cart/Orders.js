import React, { useCallback, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import { getAllOrders } from "../../actions/storeActions";

const Orders = () => {
  const { colors } = useTheme();
  const navigate = useNavigation();
  const styles = makeStyles(colors);
  const [ordersList, setOrdersList] = useState([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const res = await getAllOrders();
        setOrdersList(res);
      })();
    }, [])
  );

  const navigateToDetail = (id_pedido) => {
    navigate.navigate("order", { id_pedido });
  };

  const HeaderList = () => (
    <View style={styles.item}>
      <Text style={styles.titleHeader}>SERVICIO</Text>
      <Text style={styles.titleHeader}>PROVEEDOR</Text>
      <Text style={styles.titleHeader}>CLIENTE</Text>
      <Text style={styles.titleHeader}>ESTADO</Text>
    </View>
  );

  const Item = ({ estado, numero, proveedor, nombre }) => (
    <TouchableOpacity
      onPress={() => navigateToDetail(numero)}
      style={styles.item}
    >
      <Text style={styles.title}>#{numero}</Text>
      <Text style={styles.title}>{proveedor}</Text>
      <Text style={styles.title}>{nombre}</Text>
      <Text style={styles.title}>{estado}</Text>
    </TouchableOpacity>
  );
  const renderItem = ({ item }) => (
    <Item
      estado={item.estado}
      numero={item.id_pedido}
      proveedor={item.proveedor}
      nombre={item.nombre}
    />
  );
  return (
    <FlatList
      ListHeaderComponent={
        <>
          <Text style={styles.textTitle}>{"SERVICIOS PENDIENTES"}</Text>
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
      data={ordersList}
      renderItem={renderItem}
      keyExtractor={(order, index) => `${order.id_pedido}${index}`}
      contentContainerStyle={{ flexGrow: 1 }}
      pagingEnabled
      scrollEnabled
      ListFooterComponentStyle={{ flex: 1, justifyContent: "flex-end" }}
      
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
      fontSize: 12,
      marginTop: 10,
      flexGrow: 1,
      width: 80,
      textAlign: "center",
      overflow: "hidden"
    },
    title: {
      fontWeight: "bold",
      fontSize: 7,
      marginTop: 10,
      flexGrow: 1,
      width: 80,
      textAlign: "center",
      overflow: "scroll"
    },
    item: {
      width: "auto",
      overflow: "scroll",
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
    separator: {
      backgroundColor: "#000",
    },
  });

export default Orders;
