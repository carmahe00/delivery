import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import FlatListPedido from './Home/FlatListPedido';
import StatusBarCustom from './StatusBarCustom'

const Home = () => {
    const { colors } = useTheme();
    const { pedidos } = useSelector(state => state.pedidosConnect)
    const a = []
    
    return (
        <>
            <StatusBarCustom 
                backgroundColor={colors.bgDark}
                barStyle='light-content'
            />
            {
                (pedidos.length) > 0 && 
                <FlatListPedido pedidos={pedidos} title="Nuevos Pedidos" />
            }
        </>
    )
}

export default Home
