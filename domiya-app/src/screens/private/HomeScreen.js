import React from 'react'
import { useTheme } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../components/Home';
import OrderDetail from '../../components/OrderDetail';
import RoadMap from '../../components/RoadMap';
import Wait from '../../components/Wait';

const Stack = createStackNavigator();
const HomeScreen = () => {
    const { colors } = useTheme();
    
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: colors.fontLight,
                headerStyle: {backgroundColor: colors.bgDark},
                cardStyle: {
                    backgroundColor: colors.bgLight
                }
            }}
        >
            <Stack.Screen 
                name='main'
                component={Home}
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name='pedido'
                component={OrderDetail}
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name='road'
                component={RoadMap}
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name='wait'
                component={Wait}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}

export default HomeScreen
