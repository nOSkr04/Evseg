import { StyleSheet, RefreshControl, FlatList, ScrollView, View, Text, Dimensions } from 'react-native'
import React, { memo, useCallback, useState } from 'react'
import { AppBar } from '../../components/app-bar'
import { ProductContainer } from '../../components/ecommerce/product-container'
import { FadeOutDown, ZoomInEasyDown } from 'react-native-reanimated'
import { Stagger } from '../../components/animate/stagger'
import { FlashList } from '@shopify/flash-list'
import useSWRInfinite from "swr/infinite"
import { ProductApi } from '../../api'
import { IProduct } from '../../interface/product'
import { Colors } from '../../constants/colors'
import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { CategoryAppbar } from '../../components/category-appbar'
import Feather from '@expo/vector-icons/Feather'
import useSWR from 'swr'
import { useNavigation } from '@react-navigation/native'
import { NavigationRoutes } from '../../navigation/types'
import { ICategory } from '../../interface/category'
import { Controller, useForm } from 'react-hook-form'

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
    index => `${selectedFilter}.product.${index}`,
    async index => {
      const page = index.split(".").pop();
      const res = await ProductApi.getProducts({ page: parseInt(`${page || 1}`, 10) + 1, limit: 10, categoryId: selectedFilter, subCategoryId: selectedCategory?.id });
      return res;
    },
    { revalidateAll: true },
  );

  const navigation = useNavigation();

  const { data: categoryData } = useSWR(`/categories`, async () => {
    const res = await ProductApi.category({ page: 1, limit: 10 });
    return res.data;
  })

  const [selectedFilter, setSelectedFilter] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<ICategory | undefined>()

  const filterTextColor = useCallback((id: string) => {
    return {
      color: id === selectedFilter ? Colors.white : Colors.black,
    }
  }, [selectedFilter])

  const filterBoxColor = useCallback((id: string) => {
    return {
      backgroundColor: id === selectedFilter ? Colors.black : Colors.lightGrey
    }
  }, [selectedFilter])

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
      <CategoryAppbar title='Цахим дэлгүүр' category={
        <>
          <FlatList showsHorizontalScrollIndicator={false} data={categoryData?.filter((category: ICategory) => !category.parent)} style={styles.filterContainer} horizontal={true} renderItem={({ item }) => {
            return <TouchableOpacity style={[styles.filterBox, filterBoxColor(item.id)]} onPress={() => setSelectedFilter(item.id)}>
              <Text style={filterTextColor(item.id)}>{item.name}</Text>
            </TouchableOpacity>

          }} />
          <TouchableOpacity style={styles.row} onPress={() => selectedFilter ? navigation.navigate(NavigationRoutes.SelectCategory, {
            onChange(category: ICategory) {
              setSelectedCategory(category)
            }, id: selectedFilter,
          }) : {}}>
            <View style={styles.childFilterContainer}>
              <Feather name='filter' color={Colors.black} size={18} />
            </View>
            <Text style={styles.mr10}>Шүүлтүүр:</Text>
            <View style={styles.childFilterBox}>
              {
                selectedCategory !== undefined ? <Text>{selectedCategory?.name}</Text> : <Text>Бүгд</Text>
              }
            </View>
          </TouchableOpacity>
        </>
      } />
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
  mr10: {
    marginRight: 10,
  },
  row: {
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 15,
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  childFilterBox: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: Colors.lightGrey,
  },
  childFilterContainer: {
    marginRight: 5,
    padding: 5,
    borderRadius: 5,
    borderColor: Colors.grey,
    borderWidth: 1,
  },
  filterBox: {
    paddingHorizontal: 15,
    marginRight: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  filterContainer: {
    backgroundColor: Colors.white,
    paddingLeft: 10,
    width: "100%",
  },
  container: {
    paddingHorizontal: 16,
  }
})