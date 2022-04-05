import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "../../styles/colors";
import Menu from "../../components/config/Menu";

const Stack = createNativeStackNavigator();

const MapScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.fontLight,
        headerStyle: { backgroundColor: colors.bgDark },
        cardStyle: { backgroundColor: colors.bgLight },
      }}
    >
      <Stack.Screen
        name="menu"
        component={Menu}
        options={{ title: "Cuenta", headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MapScreen;
