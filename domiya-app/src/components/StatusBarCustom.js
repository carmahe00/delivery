import React from 'react'
import { StatusBar, SafeAreaView } from 'react-native'
import { useTheme } from 'react-native-paper';

export default function StatusBarCustom({ backgroundColor, ...rest }) {
    const { colors } = useTheme();
    return (
        <>
            <StatusBar animated={true} backgroundColor={colors.bgDark} {...rest} />
            <SafeAreaView
                style={{
                    flex: 0,
                    backgroundColor
                }}
            />
        </>
    )
}
