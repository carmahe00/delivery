import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

    input: {
        backgroundColor: 'white',
        width: '100%',
        maxHeight: 50,

        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,

        paddingHorizontal: 10,
        marginVertical: 15
    },
    btnSuccess: {
        padding: 10,
        width: '100%',
        borderRadius: 10,
        fontWeight: 'bold',
        marginVertical: 15,

    },
    textSuccess: {
        fontWeight: 'bold',
        color: 'white'
    },
    btnInfo: {
        padding: 10,
        width: '100%',
        borderRadius: 10,
        fontWeight: 'bold',
        backgroundColor: '#FAE9EA',
    },
    textInfo:{
        fontWeight: 'bold',
        color: '#DD4D44'
    }
})

export default styles