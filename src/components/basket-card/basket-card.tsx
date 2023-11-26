import { StyleSheet, Text, View, Dimensions, Pressable, TextInput } from 'react-native'
import { Image } from 'expo-image'
import React, { ReactNode, memo, useCallback, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ProductType } from '../../screens/basket-screen/basket-screen'
import { Colors } from '../../constants/colors'
import AntDesign from "@expo/vector-icons/AntDesign";
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { NavigationRoutes, RootStackParamList } from '../../navigation/types'

const width = Dimensions.get("window").width



const BasketCard = memo(({ item }: { item: ProductType }) => {

    const [count, setCount] = useState(1);

    const addCount = () => {
        setCount(count + 1);
    }

    const minus = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    }

    const navigation = useNavigation();
    const onDetail = useCallback(() => {
        navigation.navigate(NavigationRoutes.ProductDetailScreen, {id:item._id})
    }, [])


    return (
        <TouchableOpacity onPress={onDetail} style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={item.img} style={styles.image} contentFit='cover' />
            </View>
            <View style={styles.descriptionContainer}>

                <Text style={styles.name}>{item.name}</Text>

                <View style={styles.subContainer}>
                    <View>
                        <Text style={styles.name}>{item.size}</Text>
                        <Text style={styles.price}>{item.price.toLocaleString()}₮</Text>
                    </View>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity onPress={minus} style={styles.countContainer}>
                            <AntDesign size={24} name='minus' color={Colors.white} />
                        </TouchableOpacity>
                        <Text style={styles.count}>{count}</Text>
                        <TouchableOpacity onPress={addCount} style={styles.countContainer}>
                            <AntDesign size={24} name='plus' color={Colors.white} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


        </TouchableOpacity>
    )
})

BasketCard.displayName = "BasketCard"

export { BasketCard }

const styles = StyleSheet.create({
    imageContainer:{
        borderWidth: 1,
        borderColor: Colors.lightGrey,
        borderRadius: 10,
    },
    container: {
        shadowColor: Colors.grey,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        width: width - 30,
        flexDirection: 'row',
        padding: 5,
        backgroundColor: Colors.white,
        marginTop: 5,
        borderRadius: 10,
    },
    count: {
        fontWeight: '600',
        fontSize: 16,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    countContainer: {
        backgroundColor: Colors.cool,
        borderRadius: 10,
        padding: 5,
    },
    price: {
        fontWeight: '600',
        color: Colors.black,
        fontSize: 15,
        fontFamily: "MonSemiBold"
    },
    name: {
        fontSize: 14,
        color: Colors.grey,
        fontFamily: "MonThin"
    },
    subContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    descriptionContainer: {
        width: width - 115,
        justifyContent: 'space-around',
        marginLeft: 15,
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 10,
    },
})