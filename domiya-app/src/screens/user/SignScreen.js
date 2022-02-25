import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { TextInput, Button } from 'react-native-paper'
import * as Yup from 'yup';
import { Formik } from 'formik'
import { useDispatch } from 'react-redux';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native'

import stylesForm from '../../styles/form'
import { login } from '../../actions/userActions';
import Logo from '../../../assets/images/logo-2.jpeg'


const validateSchema = Yup.object().shape({
    email: Yup.string().required(true).email('Debe ser email'),
    password: Yup.string().required(true)
})

const SignScreen = () => {
    const { height } = useWindowDimensions()
    const dispatch = useDispatch()
    const navigation = useNavigation()
    
    const goAbout = () => {
        navigation.navigate('about')
    }

    return (
        <ScrollView showsHorizontalScrollIndicator={false} >
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validateSchema}
                onSubmit={({ email, password }) => {

                    dispatch(login(email, password))
                }}
            >
                {({ handleBlur, handleChange, handleSubmit, values, errors, touched }) => (

                    <View style={styles.root} >
                        <Image source={Logo} style={[styles.logo, { height: (height * 0.3) }]} resizeMode="contain" />
                        <TextInput placeholder="correo" mode="flat" style={stylesForm.input}
                            left={<TextInput.Icon name="account-circle" />}
                            onChangeText={handleChange('email')}
                            value={values.email}
                            onBlur={handleBlur('email')}
                            error={errors.email}
                        />

                        <TextInput placeholder="contraseña" secureTextEntry mode="flat" style={stylesForm.input}
                            left={<TextInput.Icon name="key" />}
                            onChangeText={handleChange('password')}
                            value={values.password}
                            onBlur={handleBlur('password')}
                            error={errors.password}
                        />
                        
                        <Button mode="contained" style={stylesForm.btnSuccess} onPress={handleSubmit} >
                            <Text style={stylesForm.textSuccess} >Login</Text>
                        </Button>

                        <Button mode="text" style={stylesForm.btnSuccess} onPress={() => console.warn('click')} >
                            Forgot
                        </Button>

                        <Button mode="text" style={stylesForm.btnInfo} color="#FAE9EA" onPress={goAbout} >
                            <Text style={stylesForm.textInfo} >about</Text>
                        </Button>
                    </View>
                )}
            </Formik>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
        justifyContent: 'center',
        height: '100%'
    },
    logo: {
        width: "70%",
        maxWidth: 300,
        height: 100,
        maxHeight: 200
    }
})

export default SignScreen
