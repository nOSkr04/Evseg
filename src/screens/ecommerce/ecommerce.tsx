import { StyleSheet, RefreshControl,FlatList } from 'react-native'
import React, { memo, useCallback } from 'react'
import { AppBar } from '../../components/app-bar'
import { ProductContainer } from '../../components/ecommerce/product-container'
import { FadeOutDown, ZoomInEasyDown } from 'react-native-reanimated'
import { Stagger } from '../../components/animate/stagger'
import { FlashList } from '@shopify/flash-list'
import useSWRInfinite from "swr/infinite"
import { ProductApi } from '../../api'
import { IProduct } from '../../interface/product'
export type ProductType = {
  _id: string,
  img: string
  imgs: string[]
  name: string
  price: number
  category: string
}

const EcommerceScreen = memo(() => {
  
  const { data, size, setSize, isLoading, } = useSWRInfinite(
    index => `product.${index}`,
    async index => {
      const page = index.split(".").pop();
      const res = await ProductApi.getProducts({ page: parseInt(`${page || 1}`, 10) + 1, limit: 10, });
      return res;
    },
    { revalidateAll: true },
  );
  console.log(data)


  const renderItem = useCallback(({ item }: { item: IProduct }) => {
    return (
      <Stagger
        stagger={50}
        duration={100}
        exitDirection={-1}
        entering={() => ZoomInEasyDown.springify()}
        exiting={() => FadeOutDown.springify()}
      >
        <ProductContainer item={item} />
   </Stagger>
    )
  }, []);
  return (
    <>
      <AppBar title="Цахим дэлгүүр" />
      <FlatList
        data={(data || []).map(entry => entry?.data).flat() as IProduct[]}
        onEndReached={() => setSize(size + 1)}
        onEndReachedThreshold={0.8}
        numColumns={2}
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              setSize(1);
            }}
            refreshing={isLoading}
          />
        }
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={styles.container}
      />
    </>
  )
})

EcommerceScreen.displayName = "EcommerceScreen"

export { EcommerceScreen }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal:16
  }
})