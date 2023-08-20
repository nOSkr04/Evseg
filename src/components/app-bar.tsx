import { StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '../constants/colors'

type Props = {
    fullname: string
}

const AppBar = memo(({ fullname }: Props) => {
    const sf = useSafeAreaInsets();

    const containerStyle = useCallback(
        () => {
            return {
                paddingTop: sf.top + 10,
                paddingBottom: 10,
                paddingHorizontal:16,
                backgroundColor:Colors.white,
                borderBottomLeftRadius:20,
      borderBottomRightRadius:20
            }
        },
        [],
    )
    return (
        <View style={[containerStyle(), styles.root]}>
            <Text style={styles.name}>{fullname}</Text>
            <Text>1</Text>
        </View>
    )
})

AppBar.displayName = "AppBar"

export { AppBar }

const styles = StyleSheet.create({
    name:{
      fontSize:16,
      fontWeight:"bold", 
    },
    root: {
          flexDirection:"row",
                justifyContent:"space-between",
                alignItems:"center",
    }
})