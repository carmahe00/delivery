import React from "react";
import { useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
} from "react-native";
import { openModal } from "../../actions/modalActions";

const RenderPedido = ({ item }) => {
  const dispatch = useDispatch();
  const choiceVehicle = () =>{
    switch (item.tipo_vehiculo) {
        case "MOTO":
          return <Icon name="motorcycle" size={15} color="#34eb74" />;
        case "PARTICULAR":
          return <Icon name="car" size={15} color="#34eb74" />;
        case "CAMION":
          return <Icon name="truck" size={15} color="#34eb74" />;
        default:
          return <Icon name="car" size={15} color="#34eb74" />;
      }
  }
  
  return (
    <TouchableWithoutFeedback onPress={() => dispatch(openModal(item))}>
      <View style={styles.containerPedido}>
        <View style={styles.rectanglePrice}>
          <Text style={styles.titlePedido}>
            {" "}
            domicilio: <Text style={styles.price}>${item.valor_domicilio}</Text>
          </Text>
          <Text style={styles.titlePedido}>
            {" "}
            recoger: <Text style={styles.recoger}>{item.recoger}</Text>
          </Text>
          <Text style={styles.titlePedido}>
            {" "}
            entregar: <Text style={styles.entregar}>{item.entregar}</Text>
          </Text>

          <Text style={styles.titlePedido}> tipo: {choiceVehicle()} </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RenderPedido;
const width = Dimensions.get("screen").width - 15;
const styles = StyleSheet.create({
  titlePedido: {
    fontWeight: "bold",
    color: "white",
  },
  price: {
    fontWeight: "bold",
    color: "yellow",
  },
  recoger: {
    fontWeight: "bold",
    color: "#00D7FF",
  },
  entregar: {
    fontWeight: "bold",
    color: "#FF2800",
  },
  containerPedido: {
    width: width / 2,
    height: 150,
    marginVertical: 2,
  },
  rectanglePrice: {
    height: "100%",
    width: "100%",
    backgroundColor: "#16222b",
    borderRadius: 10,
    position: "absolute",
    zIndex: 99,
    marginBottom: 140,
  },
});
