import React, { useContext } from "react";
import { StyleSheet, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useDispatch } from "react-redux";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";

import colors from "../../styles/colors";
import { logout } from "../../actions/userActions";
import MapScreen from "../../screens/private/UserScreen";
import HomeScreen from "../../screens/private/HomeScreen";
import { SocketContext } from "../../context/SocketProvider";
import HistoryScreen from "../../screens/private/HistoryScreen";
import PedidoScreen from "../../screens/private/PedidoScreen";

const Tab = createMaterialBottomTabNavigator();
const AuthNavigation = () => {
  const { desconectarSocket } = useContext(SocketContext);
  const dispatch = useDispatch();
  const logoutAccount = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de salir?",
      [
        { text: "No" },
        {
          text: "Si",
          onPress: () => {
            desconectarSocket();
            dispatch(logout());
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <NavigationContainer>
      <Tab.Navigator
        barStyle={styles.navigation}
        screenOptions={({ route }) => ({
          tabBarIcon: (routeStatus) => {
            return setIcon(route, routeStatus);
          },
        })}
      >
        <Tab.Screen
          name="home"
          component={HomeScreen}
          options={{ title: "Inicio" }}
        />
        <Tab.Screen
          name="list"
          component={PedidoScreen}
          options={{ title: "Pedido" }}
        />
        <Tab.Screen
          name="account"
          component={MapScreen}
          options={{ title: "Cuenta" }}
        />
        <Tab.Screen
          name="history"
          component={HistoryScreen}
          options={{ title: "Historial" }}
        />
        <Tab.Screen
          name="salir"
          component={MapScreen}
          listeners={{
            tabPress: (e) => {
              // Prevent default action
              e.preventDefault();

              //Any custom code here
              logoutAccount();
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

function setIcon({ name }, routeStatus) {
  let iconName = "";

  switch (name) {
    case "home":
      iconName = "home";
      break;
    case "list":
      iconName = "list";
      break;
    case "account":
      iconName = "bars";
      break;
    case "salir":
      iconName = "arrow-right";
      break;
    case "history":
      iconName = "history";
      break;
    default:
      break;
  }
  return <AwesomeIcon size={20} name={iconName} style={styles.icon} />;
}

const styles = StyleSheet.create({
  navigation: {
    backgroundColor: colors.bgDark,
  },
  icon: {
    fontSize: 20,
    color: colors.fontLight,
  },
});

export default AuthNavigation;
