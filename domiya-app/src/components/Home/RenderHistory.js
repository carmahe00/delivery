import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {Card} from 'react-native-paper'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
} from "react-native";

const RenderHostory = ({ item }) => {
  
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
    
      <Card style={styles.containerPedido}>
        <Card.Content style={styles.rectanglePrice}>
          <Text style={styles.titlePedido}>
            {" "}
            domicilio: <Text style={styles.price}>${item.valor_domicilio}</Text>
          </Text>
          <Text style={styles.titlePedido}>
            {" "}
            recogido: <Text style={styles.recoger}>{item.recoger}</Text>
          </Text>
          <Text style={styles.titlePedido}>
            {" "}
            entregado: <Text style={styles.entregar}>{item.entregar}</Text>
          </Text>
          <Text style={styles.titlePedido}> tipo: {choiceVehicle()} </Text>
        </Card.Content>
      </Card>
    
  );
};

export default RenderHostory;
const width = Dimensions.get("screen").width - 15;
const styles = StyleSheet.create({
  titlePedido: {
    
    color: "white",
  },
  price: {
    
    color: "yellow",
  },
  recoger: {
    
    color: "#00D7FF",
  },
  entregar: {
    
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
    backgroundColor: "#5b039b",
    borderRadius: 10,
    position: "absolute",
    zIndex: 99,
    marginBottom: 140,
  },
});
