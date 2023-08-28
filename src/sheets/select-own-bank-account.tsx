import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useCallback } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomSheetParamList, NavigationRoutes } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/colors';
import { Image } from "expo-image"

type Props = NativeStackScreenProps<BottomSheetParamList, NavigationRoutes.SelectOwnBankAccount>;

const { width } = Dimensions.get("window")

const SelectOwnBankAccount = memo(({ route }: Props) => {
    const { onChange } = route.params
    const navigation = useNavigation();
    const changed = useCallback((type: string) => {
        navigation.goBack();
        onChange(type)
    }, [])
    const data = [
        { name: "Хаан банк", img: require('../../assets/img/khan-bank.jpg'), id: '1', accountNumber: 10000000 },
        { name: "Хас банк", img: require('../../assets/img/xac-bank.jpg'), id: '2', accountNumber: 10000000 },
        { name: "Голомт банк", img: require('../../assets/img/golomt-bank.jpg'), id: '3', accountNumber: 10000000 },
        { name: "Төрийн банк", img: require('../../assets/img/statement-bank.png'), id: '4', accountNumber: 10000000 },
        { name: "ХХБ", img: require('../../assets/img/td-bank.jpg'), id: '5', accountNumber: 10000000 },
        { name: "Ариг банк", img: require('../../assets/img/arig-bank.png'), id: '6', accountNumber: 10000000 },
    ]

    const renderItem = useCallback(({ item, index }: { item: { name: string, img: string, id: string, accountNumber: number }, index: number }) => {

        return (
            <>
                <TouchableOpacity onPress={() => changed(item.name)} style={styles.bankContainer}>
                    <Image source={item.img} contentFit='cover' style={styles.image} />
                    <Text>/ {item.name} /</Text>
                    <Text>{item.accountNumber}</Text>
                </TouchableOpacity>
                {index % 3 !== 3 && <View style={styles.w3} />}
            </>

        )

    }, [])

    return (
        <FlatList contentContainerStyle={styles.listContent}
            scrollEnabled={true}
            keyExtractor={item => item.id} renderItem={renderItem} data={data} />
    )
})

SelectOwnBankAccount.displayName = "SelectOwnBankAccount"

export { SelectOwnBankAccount }

const styles = StyleSheet.create({
    image: {
        borderRadius: 10,
        height: 20,
        width: 20,
    },
    bankContainer: {
        gap: 5,
        paddingLeft: 15,
        flexDirection: 'row',
        marginTop: 5,
        backgroundColor: Colors.border,
        borderRadius: 3,
        paddingHorizontal: 5,
        paddingVertical: 10,
        marginHorizontal: 8

    },
    wrapper: {
        justifyContent: 'space-between',
    },
    listContent: {
        backgroundColor: Colors.white,
        marginTop: 8,
        paddingTop: 20,
        borderRadius: 16,
    },
    w3: {
        width: 3,
    },
    column: {
        marginHorizontal: 16.5,
    },
    listItem: {
        flexDirection: "row",
        marginBottom: 3,
    },



})