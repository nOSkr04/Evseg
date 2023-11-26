import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode, memo, useCallback } from 'react'
import { Colors } from '../constants/colors'
import { TouchableOpacity } from '@gorhom/bottom-sheet'

type Props = {
    onPress?: () => void,
    icon?: ReactNode,
    labelText: string,
    labelColor: string,
    textColor: string,
}

const CustomButton = memo(({labelText, labelColor, icon, onPress, textColor} : Props) => {
    const backGroundColor = useCallback(() => {
        return {
            // backgroundColor: labelColor,
        }
    }, [])

    const labelTextColor = useCallback(() => {
        return {
            color: textColor,
        }
    }, [])
    

    return (
        <TouchableOpacity style={[styles.container, backGroundColor()]} onPress={onPress}>
            {icon}
            <Text style={labelTextColor()}>{labelText}</Text>
        </TouchableOpacity>
    )
})

export { CustomButton }

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 15,
        backgroundColor: Colors.bgs,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        height: 50,
    },
})