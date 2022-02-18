import React from 'react'
import { Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native'

export default function ComponentLoading({ size, color}) {
    return (
        <SafeAreaView style={styles.container} >
            {/* Spinner */}
            <ActivityIndicator size={size} color={color} style={styles.loading} />
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:"center",
        justifyContent: "center"
    },
    loading:{
        marginBottom: 10,

    },
    title:{
        fontSize: 18
    }
})

ComponentLoading.defaultProps = {
    
    color: '#000'
}