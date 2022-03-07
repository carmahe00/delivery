import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import ModalComponent from '../utils/ModalComponent'
import RenderHostory from './RenderHistory'
import RenderPedido from './RenderPedido'

const FlatListPedido = ({pedidos, title, history = false}) => {
    return (
        <>
        <FlatList
            ListHeaderComponent={
                <>      
                    <Text style={styles.title} >{title}</Text>
                </>
            }
            columnWrapperStyle={styles.tagView}
            numColumns={2}
            data={pedidos}
            renderItem={({item})=> history ? <RenderHostory item={item} /> : <RenderPedido item={item} />}            
            keyExtractor={(pedido, index) => `${pedido.id_pedido}-${index}`}
        />
        <ModalComponent />
        </>
    )
}

const styles = StyleSheet.create({
    tagView: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: 'space-between',
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