import React from "react";
import { useTheme } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../components/Home";
import OrderDetail from "../../components/OrderDetail";
import RoadMap from "../../components/RoadMap";
import Wait from "../../components/Wait";
import Camera from "../../components/Camera";

const Stack = createNativeStackNavigator(); // Stack contains Screen & Navigator properties
const HomeScreen = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.bgDark,
        headerStyle: { backgroundColor: colors.bgDark },
        cardStyle: {
          backgroundColor: colors.bgLight,
        },
      }}
    >
      <Stack.Screen
        name="main"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="pedido"
        component={OrderDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="road"
        component={RoadMap}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="camera"
        component={Camera}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="wait"
        component={Wait}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeScreen;
