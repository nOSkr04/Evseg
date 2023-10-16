import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback } from 'react'
import { Image } from 'expo-image'
import { Colors } from '../../constants/colors'
import { useNavigation } from '@react-navigation/native'
import { NavigationRoutes } from '../../navigation/types'
import { ProductType } from '../../screens/ecommerce/ecommerce'
import { priceBrief } from '../../utils/price-brief'

const width = Dimensions.get("window").width


const ProductContainer = memo(({ item }: { item: ProductType }) => {
    const navigation = useNavigation();
    const onDetail = useCallback(() => {
        navigation.navigate(NavigationRoutes.ProductDetailScreen, { item })
    }, [])
    return (
        <Pressable style={styles.container} onPress={onDetail}>
            <Image source={item.img} style={styles.image} contentFit='cover' />
            <Text style={styles.price}>
                {item.name}
            </Text>
            <Text style={styles.title}>
                {priceBrief(item.price)}
            </Text>
            {/* <View style={styles.button}>
                <Text style={styles.buttonTitle}>Сагслах</Text>
            </View> */}
        </Pressable>
    )
})

ProductContainer.displayName = "ProductContainer"

export { ProductContainer }

const styles = StyleSheet.create({
    container: {
        shadowColor: Colors.grey,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        width: width * 0.5 - 16 - 5,
        marginRight: 10,
        backgroundColor: Colors.white,
        padding: 6,
        borderRadius: 10,
        marginTop: 8
    },
    image: {
        borderRadius: 10,
        width: "100%",
        height: 200,
        backgroundColor: Colors.black
    },
    title: {
        fontFamily: 'MonMedium',
        marginBottom: 12,
    },
    price: {
        marginVertical: 8,
        color: 'grey',
        fontFamily: "MonMedium",
        fontSize: 12
    },
    button: {
        backgroundColor: Colors.fbPrimary,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
        marginHorizontal: 12,
        borderRadius: 4,
        marginTop: 6,
        marginBottom: 8
    },
    buttonTitle: {
        fontFamily: 'MonSemiBold',
        fontSize: 12,
        color: Colors.white
    }
})