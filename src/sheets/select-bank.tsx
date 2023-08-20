import { Dimensions, FlatList,  StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useCallback } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomSheetParamList, NavigationRoutes } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/colors';
import {Image} from "expo-image"

type Props = NativeStackScreenProps<BottomSheetParamList, NavigationRoutes.SelectBankSheet>;

const { width } = Dimensions.get("window")

const SelectBankSheet = memo(({ route }: Props) => {
    const { onChange } = route.params
    const navigation = useNavigation();
    const changed = useCallback((type: string) => {
        navigation.goBack();
        onChange(type)
    }, [])
    const data = [
        { name: "Хаан банк", img: require('../../assets/img/khan-bank.jpg'), id: '1' },
        { name: "Хас банк", img: require('../../assets/img/xac-bank.jpg'), id: '2' },
        { name: "Голомт банк", img: require('../../assets/img/golomt-bank.jpg'), id: '3' },
        { name: "Төрийн банк", img: require('../../assets/img/statement-bank.png'), id: '4' },
        { name: "ХХБ", img: require('../../assets/img/td-bank.jpg'), id: '5' },
        { name: "Ариг банк", img: require('../../assets/img/arig-bank.png'), id: '6' },
    ]

    const renderItem = useCallback(({ item, index }: { item: { name: string, img: string, id: string }, index: number }) => {

        return (
            <>
                <TouchableOpacity onPress={() => changed(item.name)} style={styles.bankContainer}>
                    <Image source={item.img} contentFit='cover' style={styles.image}/>
                    <Text>{item.name}</Text>
                </TouchableOpacity>
                {index % 3 !== 3 && <View style={styles.w3} />}
            </>

        )

    }, [])

    return (
        <FlatList contentContainerStyle={styles.listContent}
            columnWrapperStyle={styles.column}
            keyExtractor={item => item.id} renderItem={renderItem} data={data} numColumns={3} />
    )
})

SelectBankSheet.displayName = "SelectBankSheet"

export { SelectBankSheet }

const styles = StyleSheet.create({
    image:{
        borderRadius: 10,
        height: 30, 
        width: 30,
    },
    bankContainer: {
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: Colors.border,
        borderRadius: 3,
        paddingHorizontal: 5,
        paddingVertical: 10,
        width: (width - 90) * 0.333,
        height: 80,
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