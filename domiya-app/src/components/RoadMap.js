import React, { useContext, useState, useCallback } from "react";
import {
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import { View, StyleSheet, Text, Image } from "react-native";
import MapboxGL, { Logger } from "@react-native-mapbox-gl/maps";
import { useSelector } from "react-redux";

import flag from "../../assets/images/flag.png";
import camera from "../../assets/images/camera.png";
import { SocketContext } from "../context/SocketProvider";
import { addProductOrder } from "../actions/storeActions";
import { useMounted } from "../hooks/useMounted";

MapboxGL.setAccessToken(
  "sk.eyJ1IjoiY2FybWFoZTAwIiwiYSI6ImNsMGUza2RtNjBmOTIzY3BiMTBpcmhkZHkifQ.RJmr59J3FiDiu7zP9g5Beg"
);
const RoadMap = () => {
  const navigation = useNavigation();
  const { socket } = useContext(SocketContext);
  const { pedido } = useSelector((state) => state.pedidosConnect);

  const [permissionIsGranted, setpermissionIsGranted] = useState(false);
  const [coordinate, setCoordinate] = useState([-74, 1001067, 4, 6800951]);
  const { isVisible } = useMounted();
  const [entregar, setEntregar] = useState([]);
  const [recoger, setRecoger] = useState([]);
  if (Object.entries(pedido).length === 0) {
    navigation.navigate("main");
    dispatch(openMessage("No se le ha asignado el pedido"));
  }

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await addProductOrder(
          pedido.id_pedido,
          pedido?.proveedor.nombre,
          pedido.nombre,
          pedido.fecha_hora,
          pedido.estado
        );
      })();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      (async () => {
        MapboxGL.setConnected(true);
        MapboxGL.setTelemetryEnabled(false);
        const permission = await MapboxGL.requestAndroidLocationPermissions();
        setpermissionIsGranted(permission);
        Logger.setLogCallback((log) => {
          const { message } = log;
          if (
            message.match(
              "Request failed due to a permanent error: Canceled"
            ) ||
            message.match(
              "Request failed due to a permanent error: Socket Closed"
            ) ||
            message.match("eglSwapBuffer error: 12301. Waiting or new surface")
          ) {
            return true;
          }
          return false;
        });
        setCoordinate([
          Number(pedido?.lat_entregar),
          Number(pedido?.lon_entregar),
        ]);
        setEntregar([
          Number(pedido?.lat_entregar),
          Number(pedido?.lon_entregar),
        ]);
        setRecoger([Number(pedido?.lat_recoger), Number(pedido?.lon_recoger)]);
      })();
    }, [])
  );

  const sendEntregar = async () => {
    socket?.emit("domicilio:entregado", pedido, navigateToDelivered);
  };

  const navigateToDelivered = () => {
    pedido.evidencia
      ? navigation.navigate("home", {screen: "camera"})
      : navigation.navigate("home", {screen: "wait"});
  };
  
  return (
    <>
      {permissionIsGranted && isVisible && (
        <View style={styles.page}>
          <View style={styles.container}>
            <MapboxGL.MapView style={styles.map}>
              <MapboxGL.Camera zoomLevel={15} centerCoordinate={coordinate} />
              <MapboxGL.UserLocation
                animated
                visible
                androidRenderMode="compass"
              />
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
                      source={pedido.evidencia ? camera : flag}
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
      )}
    </>
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
    width: "100%",
    height: "100%",
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
