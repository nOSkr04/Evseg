import { BottomSheetParamList, NavigationRoutes } from '../navigation/types';
import { StyleSheet, Text, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { memo, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '../constants/colors';

type Props = NativeStackScreenProps<BottomSheetParamList, NavigationRoutes.SelectAlphabet>;

const SelectAlphabet = memo(({ route }: Props) => {
    const { onChange } = route.params;
    const navigation = useNavigation();
    const changed = useCallback(
        (type: string) => {
            navigation.goBack();
            onChange(type);
        },
        [],
    )

    const alphabets = [
        {
            name: "А",
            id: "1",
        },
        {
            name: "Б",
            id: "2",
        },
        {
            name: "В",
            id: "3",
        },
        {
            name: "Г",
            id: "4",
        },
        {
            name: "Д",
            id: "5",
        },
        {
            name: "Е",
            id: "6",
        },
        {
            name: "Ё",
            id: "7",
        },
        {
            name: "Ж",
            id: "8",
        },
        {
            name: "З",
            id: "9",
        },
        {
            name: "И",
            id: "10",
        },
        {
            name: "Й",
            id: "11",
        },
        {
            name: "К",
            id: "12",
        },
        {
            name: "Л",
            id: "13",
        },
        {
            name: "М",
            id: "14",
        },
        {
            name: "Н",
            id: "15",
        },
        {
            name: "О",
            id: "16",
        },
        {
            name: "Ө",
            id: "17",
        },
        {
            name: "П",
            id: "18",
        },
        {
            name: "Р",
            id: "19",
        },
        {
            name: "С",
            id: "20",
        },
        {
            name: "Т",
            id: "21",
        },
        {
            name: "У",
            id: "22",
        },
        {
            name: "Ү",
            id: "23",
        },
        {
            name: "Ф",
            id: "24"
        },
        {
            name: "Х",
            id: "25",
        },
        {
            name: "Ц",
            id: "26",
        },
        {
            name: "Ч",
            id: "27",
        },
        {
            name: "Ш",
            id: "28",
        },
        {
            name: "Щ",
            id: "29",
        },
        {
            name: "Ь",
            id: "30",
        },
        {
            name: "Ъ",
            id: "31",
        },
        {
            name: "Ы",
            id: "32",
        },
        {
            name: "Э",
            id: "33",
        },
        {
            name: "Ю",
            id: "34",
        },
        {
            name: "Я",
            id: "35",
        },
    ];

    const renderItems = useCallback(({ item, index }: { item: { name: string }, index: number }) => {
        return (
            <>
                <TouchableOpacity onPress={() => changed(item.name)}
                    style={styles.alphabetContainer}>
                    <Text>{item.name}</Text>
                </TouchableOpacity>
            </>
        )
    }, [])

    return (
        <FlatList numColumns={7}
            data={alphabets} renderItem={renderItems}
            contentContainerStyle={styles.listContent}
            columnWrapperStyle={styles.column} />
    )
})

export { SelectAlphabet }

SelectAlphabet.displayName = "SelectAlphabet"

const styles = StyleSheet.create({
    listContent: {
        backgroundColor: Colors.white,
        marginTop: 8,
        paddingTop: 20,
        borderRadius: 16,
    },
    column: {
        marginHorizontal: 16.5,
    },
    alphabetContainer: {
        margin: 1,
        borderRadius: 10,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.border,
    },
})