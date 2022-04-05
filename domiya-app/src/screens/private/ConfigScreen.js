import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Menu from "../../components/config/Menu";
import Password from "../../components/config/Password";

const Stack = createNativeStackNavigator();
const ConfigScreen = () => {
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
        name="menu"
        component={Menu}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="password"
        component={Password}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ConfigScreen;
