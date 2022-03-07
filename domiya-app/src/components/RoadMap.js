import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Text, Image } from "react-native";
import MapboxGL, { Logger } from "@react-native-mapbox-gl/maps";
import { useSelector } from "react-redux";

import flag from "../../assets/images/flag.png";
import { SocketContext } from "../context/SocketProvider";

MapboxGL.setAccessToken(
  "sk.eyJ1IjoiY2FybWFoZTAwIiwiYSI6ImNsMGUza2RtNjBmOTIzY3BiMTBpcmhkZHkifQ.RJmr59J3FiDiu7zP9g5Beg"
);
const RoadMap = () => {
  const navigation = useNavigation();
  const { socket } = useContext(SocketContext);
  const { pedido } = useSelector((state) => state.pedidosConnect);
  const [coordinate, setCoordinate] = useState([-74, 1001067, 4, 6800951]);
  const [entregar, setEntregar] = useState([]);
  const [recoger, setRecoger] = useState([]);
  if (Object.entries(pedido).length === 0) {
    navigation.navigate("main");
    dispatch(openMessage("No se le ha asignado el pedido"));
  }
  useEffect(() => {
    switch (pedido.estado) {
      case "VA_RECOGER":
        navigation.navigate("pedido");
        break;
      case "EN_CAMINO":
        navigation.navigate("road");
        break;
      case "ENTREGADO":
        navigation.navigate("wait");
        break;
      default:
        navigation.navigate("road");
        break;
    }
    MapboxGL.setConnected(true);
    MapboxGL.setTelemetryEnabled(false);
    Logger.setLogCallback((log) => {
      const { message } = log;
      if (
        message.match("Request failed due to a permanent error: Canceled") ||
        message.match("Request failed due to a permanent error: Socket Closed")
      ) {
        return true;
      }
      return false;
    });
    setCoordinate([Number(pedido?.lat_recoger), Number(pedido?.lon_recoger)]);
    setEntregar([Number(pedido?.lat_entregar), Number(pedido?.lon_entregar)]);
    setRecoger([Number(pedido?.lat_recoger), Number(pedido?.lon_recoger)]);
  }, [MapboxGL, pedido, pedido, navigation]);

  const sendEntregar = async () => {
    socket?.emit("domicilio:entregado", pedido, navigateToWait);
  };

  const navigateToWait = () => {
    navigation.navigate("wait");
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map}>
          <MapboxGL.Camera zoomLevel={15} centerCoordinate={coordinate} />

          <MapboxGL.PointAnnotation
            id={pedido?.lon_recoger}
            title="Recoger"
            snippet="se debe recoger"
            coordinate={recoger}
          />
          <MapboxGL.MarkerView id={"marker"} coordinate={entregar}>
            <View>
              <View style={styles.markerContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.text} onPress={sendEntregar}>
                    {"¿Entregar?"}
                  </Text>
                </View>
                <Image
                  source={flag}
                  style={{
                    width: 10,
                    height: 20,
                    resizeMode: "cover",
                  }}
                />
              </View>
            </View>
          </MapboxGL.MarkerView>
        </MapboxGL.MapView>
      </View>
    </View>
  );
};

export default RoadMap;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: "100%",
    width: "100%",
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    alignItems: "center",
    width: 60,
    backgroundColor: "transparent",
    height: 70,
  },
  textContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 10,
    flex: 1,
  },
});
