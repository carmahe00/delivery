import React from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import colors from '../../styles/colors';
import HomeScreen from '../../screens/private/HomeScreen';
import MapScreen from '../../screens/private/MapScreen';

const Tab = createMaterialBottomTabNavigator();
const AuthNavigation = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                barStyle={styles.navigation}
                screenOptions={({ route }) => ({
                    tabBarIcon: (routeStatus) => {
                        return setIcon(route, routeStatus)
                    }
                })}
            >
                <Tab.Screen name="home" component={HomeScreen} options={{ title: "Inicio" }} />
                <Tab.Screen name="maps" component={MapScreen} options={{ title: "Mapa" }} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

function setIcon({ name }, routeStatus) {
    let iconName = ''
    let color = ''
    switch (name) {
        case 'home':
            iconName = 'home'
            color = '#3371ff'
            break;
        case 'maps':
            iconName = 'heart'
            color = '#ff3333'
            break;
        default:
            break;
    }
    return <AwesomeIcon name={iconName} color={color} style={styles.icon} />
}

const styles = StyleSheet.create({
    navigation: {
        backgroundColor: colors.bgDark
    }
})

export default AuthNavigation
