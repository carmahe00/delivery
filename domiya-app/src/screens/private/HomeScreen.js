import React from 'react'
import {  Text } from 'react-native'
import { useTheme } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../components/Home';

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
        </Stack.Navigator>
    )
}

export default HomeScreen
