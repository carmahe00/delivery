import React from 'react'
import { View, Text, TouchableWithoutFeedback, Image, StyleSheet } from 'react-native'

const RenderPedido = ({ item }) => {
    
    return (
        <TouchableWithoutFeedback>
            <View style={styles.containerPedido} >

                <View style={styles.rectanglePrice} >
                    <Text style={styles.titlePedido} > domicilio:{" "}<Text style={styles.price} >${item.valor_domicilio}</Text></Text>
                    <Text style={styles.titlePedido} > recoger: {" "}  <Text style={styles.recoger} >{item.recoger}</Text></Text>
                    <Text style={styles.titlePedido} > entregar: {" "} <Text style={styles.entregar} >{item.entregar}</Text></Text>
                    
                    <Text style={styles.titlePedido} > nombre: {" "} {item.nombre} </Text>
                </View>

            </View>

        </TouchableWithoutFeedback>
    )
}

export default RenderPedido

const styles = StyleSheet.create({
    titlePedido: {
        fontWeight: 'bold',
        color: 'white'
    },
    price: {
        fontWeight: 'bold',
        color: 'yellow'
    },
    recoger: {
        fontWeight: 'bold',
        color: '#00D7FF'
    },
    entregar: {
        fontWeight: 'bold',
        color: '#FF2800'
    },
    containerPedido: {
        width: '49%',
        height: 150,
        marginVertical: 2,
        marginHorizontal: 2,
    },
    rectanglePrice: {
        height: "100%",
        width: "100%",
        backgroundColor: '#16222b',
        borderRadius: 10,
        position: 'absolute',
        zIndex: 99,
        marginBottom: 140
    },

})