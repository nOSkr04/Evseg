import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback } from 'react'
import { AppBar } from '../../components/app-bar'
import { ProductContainer } from '../../components/ecommerce/product-container'
import { FadeOutDown, ZoomInEasyDown } from 'react-native-reanimated'
import { Stagger } from '../../components/animate/stagger'
import { ScrollView } from 'react-native-gesture-handler'
import { BasketCard } from '../../components/basket-card/basket-card'
import useSWRInfinite from 'swr/infinite'
import { BasketApi } from '../../api'
import { IProduct } from '../../interface/product'

export type ProductType = {
  _id: string,
  img: string
  imgs: string[]
  name: string
  price: number
  category: string
}

const BasketScreen = memo(() => {

  const {data,size ,  setSize, isLoading} = useSWRInfinite(
    index => `baskets.${index}`,
     async index => {
      const page = index.split(".").pop();
      const res = BasketApi.getBaskets({page: parseInt(`${page || 1}`, 10 ) + 1 , limit: 10,});
      return res;
     },
     {revalidateAll: true},
  );

  const renderItem = useCallback(({item} : {item: ProductType}) => {
    return (
     
      <Stagger
      stagger={50}
      duration={100}
      exitDirection={-1}
      entering={() => ZoomInEasyDown.springify()}
      exiting={() => FadeOutDown.springify()}
    >
       <BasketCard item={item}/>
    </Stagger>
    )
  }, [])

  return (
    <>
      <AppBar title="Сагс" />
      <FlatList
        // data={(data || []).map(entry => entry?.data).flat() as IProduct[]}
        data={data || [] as any}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        style={styles.container}
        showsVerticalScrollIndicator={false}
      />
    </>
  )
})

BasketScreen.displayName = "BasketScreen"

export { BasketScreen }

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    flex: 1,
    alignSelf: 'center',
  }
})