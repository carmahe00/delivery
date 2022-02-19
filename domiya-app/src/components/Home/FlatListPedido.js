import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import RenderPedido from './RenderPedido'

const FlatListPedido = ({pedidos, title}) => {
    return (
        <FlatList
            ListHeaderComponent={
                <>      
                    <Text style={styles.title} >{title}</Text>
                </>
            }
            columnWrapperStyle={styles.tagView}
            numColumns={4}
            data={pedidos}
            renderItem={({item})=> (<RenderPedido item={item} />)}            
            keyExtractor={pedido => pedido.id_pedido}
        />
    )
}

const styles = StyleSheet.create({
    tagView: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: "wrap",
        alignContent: "flex-start",
        margin: -3,
        padding: 5,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop:20
    }
})
export default FlatListPedido