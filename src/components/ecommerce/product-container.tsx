import { Dimensions, Pressable, StyleSheet, Text,  View } from 'react-native'
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
        navigation.navigate(NavigationRoutes.ProductDetailScreen, {item})
    }, [])
    return (
        <Pressable style={styles.container} onPress={onDetail}>
            <Image source={item.img} style={styles.image} contentFit='contain' />
            <Text style={styles.title}>
                {item.name}
            </Text>
            <Text style={styles.title}>
                {priceBrief(item.price)}
            </Text>
            <View style={styles.button}>
                <Text style={styles.buttonTitle}>Сагслах</Text>
            </View>
        </Pressable>
    )
})

ProductContainer.displayName = "ProductContainer"

export { ProductContainer }

const styles = StyleSheet.create({
    container: {
        width: width * 0.5 - 16 - 5,
        marginRight: 10,
        backgroundColor: Colors.white,
        padding: 6,
        borderRadius: 4,
        marginTop: 8
    },
    image: {
        width: "100%",
        height: 265,
        backgroundColor: Colors.black
    },
    title: {
        fontFamily: 'MonSemiBold',
        marginVertical: 8
    },
    price: {
        marginBottom: 12,
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