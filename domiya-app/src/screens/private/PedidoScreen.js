import React from 'react'
import { useTheme } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Orders from '../../components/cart/Orders';
import OrderDetails from '../../components/cart/OrderDetails';

const Stack = createNativeStackNavigator();

const PedidoScreen = () => {
  const { colors } = useTheme();
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
        name="orders"
        component={Orders}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="order"
        component={OrderDetails}
      />
    </Stack.Navigator>
  );
};

export default PedidoScreen;
