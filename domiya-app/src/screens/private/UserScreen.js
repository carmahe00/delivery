import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import colors from "../../styles/colors";
import Menu from "../../components/config/Menu";

const Stack = createStackNavigator();

const MapScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.fontLight,
        headerStyle: { backgroundColor: colors.bgDark },
        cardStyle: { backgroundColor: colors.bgLight },
      }}
    >
        <Stack.Screen name="menu" component={Menu} options={{title:'Cuenta', headerShown: false}} />
    </Stack.Navigator>
  );
};

export default MapScreen;
