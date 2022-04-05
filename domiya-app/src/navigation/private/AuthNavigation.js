import React, { useContext } from "react";
import { StyleSheet, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useDispatch, useSelector } from "react-redux";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useTheme } from "react-native-paper";

import { logout } from "../../actions/userActions";
import MapScreen from "../../screens/private/UserScreen";
import ConfigScreen from "../../screens/private/ConfigScreen";
import HomeScreen from "../../screens/private/HomeScreen";
import { SocketContext } from "../../context/SocketProvider";
import HistoryScreen from "../../screens/private/HistoryScreen";
import PedidoScreen from "../../screens/private/PedidoScreen";
import HeaderInfo from "../../components/Home/HeaderInfo";

const Tab = createBottomTabNavigator();
const AuthNavigation = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const { desconectarSocket } = useContext(SocketContext);
  const { pedidos } = useSelector((state) => state.pedidosConnect);
  const dispatch = useDispatch();
  const logoutAccount = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de salir?",
      [
        { text: "No" },
        {
          text: "Si",
          onPress: async () => {
            desconectarSocket();

            dispatch(logout());
          },
        },
      ],
      { cancelable: false }
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
        iconName = "gear";
        break;
      case "camera":
        iconName = "camera";
        break;
      case "salir":
        iconName = "sign-out";
        break;
      case "history":
        iconName = "history";
        break;
      default:
        break;
    }
    return <AwesomeIcon size={20} name={iconName} style={styles.icon} />;
  }
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: (routeStatus) => {
            return setIcon(route, routeStatus);
          },
          tabBarBadgeStyle: { backgroundColor: colors.primary },
          tabBarStyle: { backgroundColor: colors.bgDark },
          tabBarActiveTintColor: colors.fontLight,
        })}
      >
        <Tab.Screen
          name="home"
          component={HomeScreen}
          options={{
            headerTitle: "",
            tabBarBadge: pedidos.length || 0,
            headerStyle: {height: 30},
            headerBackground: ()=> <HeaderInfo />
          }}
        />
        <Tab.Screen
          name="list"
          component={PedidoScreen}
          options={{ title: "Pedido", headerShown: false }}
        />
        <Tab.Screen
          name="history"
          component={HistoryScreen}
          options={{ title: "Historial", headerShown: false }}
        />
        <Tab.Screen
          name="account"
          component={ConfigScreen}
          options={{ title: "Cuenta", headerShown: false }}
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

const makeStyles = (colors) =>
  StyleSheet.create({
    navigation: {
      backgroundColor: colors.bgDark,
    },
    icon: {
      fontSize: 20,
      color: colors.fontLight,
    },
  });

export default AuthNavigation;
