import { StyleSheet, Text, View } from 'react-native'
import React, { ReactNode, memo, useCallback } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '../constants/colors'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { NavigationRoutes } from '../navigation/types'

type Props = {
    title?: string,
    leading?: ReactNode,
}

const AppBar = memo(({ title, leading }: Props) => {
    const sf = useSafeAreaInsets();
    const navigation = useNavigation();

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
    if (leading && title) {
        return (<View style={[styles.root, containerStyle()]}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrow}>
                <MaterialIcons name='arrow-back-ios' size={20} />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <MaterialIcons name='arrow-back-ios' size={20} color={Colors.transparent} />
        </View>)
    }
    return (
        <View style={containerStyle()}>
            {/* <Text style={styles.name}>{fullname}</Text> */}
            {
                !title ? <View style={styles.root}>
                    <View>
                        <Text style={styles.logoStyle}>E V S E G</Text>
                        <View style={styles.divider} />
                        <Text style={styles.textStyle}>Mongolian Premium Cashmere</Text>
                    </View>
                    <TouchableOpacity style={styles.transaction} onPress={() => navigation.navigate(NavigationRoutes.TransactionHistory)}>
                        <MaterialCommunityIcons name='bank'size={16}/>
                    </TouchableOpacity>
                </View> :
                    <Text style={styles.title}>{title}</Text>
            }

            {/* <Text>1</Text> */}
        </View>
    )
})

AppBar.displayName = "AppBar"

export { AppBar }

const styles = StyleSheet.create({
    backArrow:{
        padding: 10,
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontFamily: "MonMedium",
    },
    transaction: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        height: 30,
        width: 30,
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textStyle: {
        fontSize: 9,
        fontFamily: "NunitoBoldIt",
    },
    divider: {
        height: 1,
        backgroundColor: Colors.black,
    },
    logoStyle: {
        fontSize: 30,
        fontFamily: "NunitoBoldIt",
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