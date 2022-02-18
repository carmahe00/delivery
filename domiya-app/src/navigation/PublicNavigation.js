import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignScreen from '../screens/user/SignScreen';
import AboutScreen from '../screens/about/AboutScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                <Stack.Screen name="login" component={SignScreen} options={{ title: 'page' }} />
                <Stack.Screen name="about" component={AboutScreen} options={{ title: 'page' }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation
