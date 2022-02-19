import React from 'react'
import { StatusBar, SafeAreaView } from 'react-native'

/**
 * componente para dar espacio a los iconos superior
 * 
 * @param {*} backgroundColor  color de fondo
 * @param {*} rest  resto de propiedades
 */
export default function StatusBarCustom({ backgroundColor, ...rest }) {
    return (
        <>
            <StatusBar animated={true} backgroundColor={backgroundColor} {...rest} />
            <SafeAreaView
                style={{
                    flex: 0,
                    backgroundColor
                }}
            />
        </>
    )
}
