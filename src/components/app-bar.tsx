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
                paddingHorizontal: 16,
                backgroundColor: Colors.white,
            }
        },
        [],
    )
    return (
        <View style={[containerStyle(), styles.root]}>
            {/* <Text style={styles.name}>{fullname}</Text> */}
            <View>
              <Text style={styles.logoStyle}>E V S E G</Text>
              <View style={styles.divider}/>
              <Text style={styles.textStyle}>Mongolian Premium Cashmere</Text>
            </View>
            <View style={styles.transaction}/>
            {/* <Text>1</Text> */}
        </View>
    )
})

AppBar.displayName = "AppBar"

export { AppBar }

const styles = StyleSheet.create({
    transaction:{
        height: 50,
        width: 50,
        backgroundColor: Colors.grey,
    },
    textStyle:{
        fontSize:9,
    },
    divider:{
        height: 1,
        width: 125,
        backgroundColor: Colors.black,
    },
    logoStyle:{
        fontSize: 30,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
    root: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }
})