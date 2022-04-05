import React from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { useTheme } from 'react-native-paper'
import { openModal } from "../../actions/modalActions";

const RenderPedido = ({ item }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const styles = makeStyles(colors);
  
  return (
    <TouchableWithoutFeedback onPress={() => dispatch(openModal(item))}>
      <View style={styles.containerPedido}>
        <View style={styles.rectanglePrice}>
          <Text style={styles.titlePedido}>
            {" "}
            Servicio Número: <Text style={styles.price}>#{item.id_pedido}</Text>
          </Text>
          
          <Text style={styles.titlePedido}>
            {" "}
            Valor Pedido: <Text style={styles.price}>${item.valor_pedido}</Text>
          </Text>
          <Text style={styles.titlePedido}>
            {" "}
            Valor Domicilio:{" "}
            <Text style={styles.price}>${item.valor_domicilio}</Text>
          </Text>
          <Text style={styles.titlePedido}>
            {" "}
            Recoger:{" "}
            <Text style={styles.recoger}>
              {item.recoger.length > 40
                ? `${item.recoger.slice(0, 40)}...`
                : item.recoger}
            </Text>
          </Text>
          <Text style={styles.titlePedido}>
            {" "}
            Entregar:{" "}
            <Text style={styles.entregar}>
              {item.entregar.length > 40
                ? `${item.entregar.slice(0, 40)}...`
                : item.entregar}
            </Text>
          </Text>
          <Text style={styles.titlePedido}>
            {" "}
            Observación:{" "}
            <Text style={styles.price}>
              {item.descripcion.length > 40
                ? `${item.descripcion.slice(0, 40)}...`
                : item.descripcion}
            </Text>
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RenderPedido;
const makeStyles = (colors) =>
  StyleSheet.create({
    titlePedido: {
      fontWeight: "bold",
      color: colors.fontLight,
    },
    price: {
      fontWeight: "bold",
      color: colors.fontYellow,
      lineHeight: 14,
    },
    recoger: {
      fontWeight: "bold",
      color: colors.fontSea,
      lineHeight: 14,
    },
    entregar: {
      fontWeight: "bold",
      color: "#FF2800",
      lineHeight: 14,
    },
    
    containerPedido: {
      flexGrow: 1,
      width: "100%",
      height: 150,
      marginVertical: 2,
    },
    rectanglePrice: {
      height: "100%",
      width: "100%",
      backgroundColor: "#1d0230",
      borderRadius: 10,
      position: "absolute",
      zIndex: 99,
      marginBottom: 140,
      padding:3
    },
  });
