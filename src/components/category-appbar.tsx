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
    category?: ReactNode,
}

const CategoryAppbar = memo(({ title, category }: Props) => {
    const sf = useSafeAreaInsets();
    const navigation = useNavigation();

    const containerStyle = useCallback(
        () => {
            return {
                paddingTop: sf.top + 10,
                paddingBottom: 10,
                backgroundColor: Colors.white,
            }
        },
        [],
    )
    
    return (
        <View style={[styles.root, containerStyle()]}>
            <Text style={styles.title}>{title}</Text>
            <MaterialIcons name='arrow-back-ios' size={20} color={Colors.transparent} />
            {category}
        </View>
    )
})

CategoryAppbar.displayName = "CategoryAppbar"

export { CategoryAppbar }

const styles = StyleSheet.create({
    backArrow: {
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
        justifyContent: "space-between",
        alignItems: "center",
    }
})