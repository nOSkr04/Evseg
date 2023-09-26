import { StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomSheetParamList, NavigationRoutes } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import {Image} from "expo-image";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from '../constants/colors';


type Props = NativeStackScreenProps<BottomSheetParamList, NavigationRoutes.SelectUserType>;

const SelectUserType = memo(({ route }: Props) => {
    const { onChange } = route.params;
    const navigation = useNavigation();
    const changed = useCallback(
        (type: string) => {
            console.log(type)
            navigation.goBack();
            onChange(type);
        },
        [],
    )

    const data = [
        {
            name: "Жолооч",
            icon: "ios-car-outline"
        },
        {
            name: "Хөтөч",
            icon: "map-outline"
        },
        {
        name: "Хэрэглэгч",
            icon: "person-outline"
        },
      
    ]

    const renderItems = useCallback(({ item, index }: { item: { name: string , icon: string}, index: number }) => {
        return (
            <>
                <TouchableOpacity onPress={() => changed(item.name)}>
                    <View style={styles.row}>
                        <Ionicons name={item.icon} size={24}/>
                     <Text>{item.name}</Text>
                    </View>
                </TouchableOpacity>
            </>
        )
    }, [])
    return (
        <FlatList 
        data={data} renderItem={renderItems}
        />
    )
})

export { SelectUserType }

const styles = StyleSheet.create({
    textStyle:{
        fontSize: 16,
    },
    row:{
        marginHorizontal: 20,
        paddingLeft:20,
        gap: 15,
        height: 50,
        marginVertical: 5,
        backgroundColor: Colors.border,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
})