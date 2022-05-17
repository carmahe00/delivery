import React, { useContext, useState, useEffect } from "react";
import { useNavigation} from "@react-navigation/native";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import MapboxGL, { Logger } from "@react-native-mapbox-gl/maps";
import { useSelector } from "react-redux";
import { lineString as makeLineString } from "@turf/helpers";
import * as Linking from "expo-linking";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Button } from "react-native-paper";
import MapboxDirectionsFactory from "@mapbox/mapbox-sdk/services/directions";

import flag from "../../assets/images/flag.png";
import camera from "../../assets/images/camera.png";
import { SocketContext } from "../context/SocketProvider";
import { useMounted } from "../hooks/useMounted";

const accessToken =
  "sk.eyJ1IjoiY2FybWFoZTAwIiwiYSI6ImNsMGUza2RtNjBmOTIzY3BiMTBpcmhkZHkifQ.RJmr59J3FiDiu7zP9g5Beg";

MapboxGL.setAccessToken(accessToken);

const directionsClient = MapboxDirectionsFactory({ accessToken });

const RoadMap = () => {
  const navigation = useNavigation();
  const { socket } = useContext(SocketContext);
  const { pedido } = useSelector((state) => state.pedidosConnect);
  const [showDesti, setshowDesti] = useState(true);
  const [showLocation, setShowLocation] = useState(true);
  const [currentLocation, setCurrentLocation] = useState([]);

  const [permissionIsGranted, setpermissionIsGranted] = useState(false);
  const [coordinate, setCoordinate] = useState([-74, 1001067, 4, 6800951]);
  const [route, setRoute] = useState(null);
  const [locationRoute, setLocationRoute] = useState(null);
  const { isVisible } = useMounted();
  const [entregar, setEntregar] = useState([]);
  const [recoger, setRecoger] = useState([]);
  if (Object.entries(pedido).length === 0) {
    navigation.navigate("main");
    dispatch(openMessage("No se le ha asignado el pedido"));
  }
  const fetchCoordinate =async () => {
    MapboxGL.setConnected(true);
    MapboxGL.setTelemetryEnabled(false);
    const permission = await MapboxGL.requestAndroidLocationPermissions();
    setpermissionIsGranted(permission);
    Logger.setLogCallback((log) => {
      const { message } = log;
      if (
        message.match("Request failed due to a permanent error: Canceled") ||
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
    setEntregar([Number(pedido?.lat_entregar), Number(pedido?.lon_entregar)]);
    setRecoger([Number(pedido?.lat_recoger), Number(pedido?.lon_recoger)]);
  }
  const fetchRoute = async () => {
    const reqOptions = {
      waypoints: [{ coordinates: recoger }, { coordinates: entregar }],
      profile: "driving-traffic",
      geometries: "geojson",
    };
    const res = await directionsClient.getDirections(reqOptions).send();
    const newRoute = makeLineString(res.body.routes[0].geometry.coordinates);
    setRoute(newRoute);
  };
  const fetchCurrentRoute = async () => {
    const reqOptions = {
      waypoints: [{ coordinates: currentLocation }, { coordinates: recoger }],
      profile: "driving-traffic",
      geometries: "geojson",
    };
    const res = await directionsClient.getDirections(reqOptions).send();
    const newRoute = makeLineString(res.body.routes[0].geometry.coordinates);
    setLocationRoute(newRoute);
  };

  useEffect(() => {
    fetchCoordinate()
  }, []);

  useEffect(() => {
    if (recoger.length && entregar.length) fetchRoute();
  }, [recoger, entregar]);
  useEffect(() => {
    if (recoger.length && currentLocation.length) fetchCurrentRoute();
  }, [recoger, currentLocation]);

  const sendEntregar = async () => {
    socket?.emit("domicilio:entregado", pedido, navigateToDelivered);
  };

  const navigateToDelivered = () => {
    pedido.evidencia
      ? navigation.navigate("home", { screen: "camera" })
      : navigation.navigate("home", { screen: "wait" });
  };
  console.log("recoger:", recoger);
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
                onUpdate={({ coords }) =>
                  setCurrentLocation([coords.longitude, coords.latitude])
                }
              />
              <MapboxGL.PointAnnotation
                id={pedido?.lon_recoger}
                title="Recoger"
                snippet="se debe recoger"
                coordinate={recoger}
                onSelected={() => console.log("pressed")}
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
              {route && showDesti && (
                <MapboxGL.ShapeSource id="destinationRoute" shape={route}>
                  <MapboxGL.LineLayer
                    id="linedestination"
                    style={{
                      lineWidth: 5,
                      lineJoin: "bevel",
                      lineColor: "#ff0000",
                    }}
                  />
                </MapboxGL.ShapeSource>
              )}
              {locationRoute && showLocation && (
                <MapboxGL.ShapeSource id="currentRoute" shape={locationRoute}>
                  <MapboxGL.LineLayer
                    id="lineCurrent"
                    style={{
                      lineWidth: 5,
                      lineColor: "#1c1c1c",
                    }}
                  />
                </MapboxGL.ShapeSource>
              )}
            </MapboxGL.MapView>
            <View style={styles.textInfoContainer}>
              <Text style={styles.textDesti}>Ruta donde empieza</Text>
              <Text style={styles.textCurrent}>Ruta donde entrega</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                mode="text"
                icon="refresh"
                color="#1c1c1c"
                onPress={fetchCurrentRoute}
              />
              <Button
                mode="text"
                icon="eye"
                color="#1c1c1c"
                onPress={() => setShowLocation(!showLocation)}
              />
              <Button
                mode="text"
                icon="eye"
                color="#ff0000"
                onPress={() => setshowDesti(!showDesti)}
              />
            </View>
            <View style={styles.buttonWazeContainer}>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    `https://www.waze.com/ul?ll=${recoger[1]}%2C${recoger[0]}&navigate=yes&zoom=17`
                  )
                }
                activeOpacity={0.8}
              >
                <Icon name="waze" size={30} color="#1c1c1c" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    `https://www.waze.com/ul?ll=${entregar[1]}%2C${entregar[0]}&navigate=yes&zoom=17`
                  )
                }
                activeOpacity={0.8}
              >
                <Icon name="waze" size={30} color="#ff0000" />
              </TouchableOpacity>
            </View>
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
  textInfoContainer: {
    position: "absolute",
    width: 150,
    height: 70,
    top: 0,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 20,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  buttonWazeContainer: {
    position: "absolute",
    bottom: 30,
    left: 0,
  },
  textDesti: {
    fontWeight: "bold",
    color: "#1c1c1c",
  },
  textCurrent: {
    fontWeight: "bold",
    color: "#ff0000",
  },
  text: {
    textAlign: "center",
    fontSize: 10,
    flex: 1,
  },
});
