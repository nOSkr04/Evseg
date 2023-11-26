import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback } from 'react'
import { AppBar } from '../../components/app-bar'
import { FadeOutDown, ZoomInEasyDown } from 'react-native-reanimated'
import { Stagger } from '../../components/animate/stagger'
import { BasketCard } from '../../components/basket-card/basket-card'
import useSWRInfinite from 'swr/infinite'
import { BasketApi } from '../../api'
import { CustomButton } from '../../components/custom-button'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { NavigationRoutes } from '../../navigation/types'

export type ProductType = {
  _id: string,
  img: {
    url: string,
  }
  product: string,
  quantity: string,
  subCategory: string,
  name: string
  price: number
  category: string
  size: string,
}

const BasketScreen = memo(() => {

  const navigation = useNavigation();

  const { data, size, setSize, isLoading, } = useSWRInfinite(
    index => `baskets.${index}`,
    async index => {
      const page = index.split(".").pop();
      const res = await BasketApi.getBaskets({ page: parseInt(`${page || 1}`, 10) + 1, limit: 10,});
      console.log(res.data, 'res')
      return res.data;
    },
    { revalidateAll: true },
  );

  console.log(data, 'data');

  const renderItem = useCallback(({ item }: { item: ProductType }) => {
    return (
      <Stagger
        stagger={50}
        duration={100}
        exitDirection={-1}
        entering={() => ZoomInEasyDown.springify()}
        exiting={() => FadeOutDown.springify()}
      >
        <BasketCard item={item} />
      </Stagger>
    )
  }, [])

  return (
    <>
      <AppBar title="Сагс" />
      <FlatList
        onEndReached={() => setSize(size + 1)}
        data={(data || []).map(entry => entry?.data).flat() as ProductType[]}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        style={styles.container}
        showsVerticalScrollIndicator={false}
      />
      <CustomButton labelColor={Colors.bgs} labelText='Төлбөр төлөх' onPress={() => navigation.navigate(NavigationRoutes.PaymentScreen)} textColor={Colors.white} icon={<MaterialIcons name='payment' color={Colors.white} size={24} style={styles.mr15} />} />
      <View style={styles.h20} />
    </>
  )
})

BasketScreen.displayName = "BasketScreen"

export { BasketScreen }

const styles = StyleSheet.create({
  h20: {
    height: 20,
  },
  mr15: {
    marginRight: 15,
  },
  container: {
    marginHorizontal: 15,
    flex: 1,
    alignSelf: 'center',
  }
})