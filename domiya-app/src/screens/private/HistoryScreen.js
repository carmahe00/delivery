import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "../../styles/colors";
import OrdersHistory from "../../components/history/OrdersHistory";
import OrderDetailsHistory from "../../components/history/OrderDetails";

const Stack = createNativeStackNavigator();
const HistoryScreen = () => {
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.fontLight,
        headerStyle: { backgroundColor: colors.bgDark },
        cardStyle: {
          backgroundColor: colors.bgLight,
        },
      }}
    >
      <Stack.Screen
        name="orders-history"
        component={OrdersHistory}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="order-history" component={OrderDetailsHistory} />
    </Stack.Navigator>
  );
};

export default HistoryScreen;
