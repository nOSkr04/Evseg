import { StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback } from 'react'

type Props = {
    labelText: string,
    labelColor: string,
}

const CustomButton = memo(({labelText, labelColor} : Props) => {
    const backGroundColor = useCallback(
      () => {
        return {
            backgrounColor: labelColor
        }
      },
      [],
    )
    

    return (
        <View style={[styles.container, backGroundColor()]}>
            <Text>CustomButton</Text>
        </View>
    )
})

export { CustomButton }

const styles = StyleSheet.create({
    container:{
        height: 50,
    },
})