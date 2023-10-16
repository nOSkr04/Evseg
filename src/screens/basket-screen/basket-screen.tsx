import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback } from 'react'
import { AppBar } from '../../components/app-bar'
import { ProductContainer } from '../../components/ecommerce/product-container'
import { FadeOutDown, ZoomInEasyDown } from 'react-native-reanimated'
import { Stagger } from '../../components/animate/stagger'
import { ScrollView } from 'react-native-gesture-handler'
import { BasketCard } from '../../components/basket-card/basket-card'

export type ProductType = {
  _id: string,
  img: string
  imgs: string[]
  name: string
  price: number
  category: string
}

const BasketScreen = memo(() => {

  const data = [
    {
      _id: "1",
      img: "https://cdn.greensoft.mn/uploads/site/1176/photos/module_product/20230912163343_cc9364c45775890bda9398debfb54db7.JPG", imgs: ["https://cdn.greensoft.mn/uploads/site/1176/photos/module_product/20230912163343_cc9364c45775890bda9398debfb54db7.JPG", "https://cdn.greensoft.mn/uploads/site/1176/photos/module_product/20230912163415_f2ea41808e2017e64e025e65e7fce195.JPG", "https://cdn.greensoft.mn/uploads/site/1176/photos/module_product/20230912163447_6a80ba0e4daa7d1b2a8afd7711ffd3cf.JPG"],
      name: "Пальто",
      price: 1060000,
      category: "Эрэгтэй"
    },
    {
      _id: "2", img: "https://cdn.greensoft.mn/uploads/site/1176/photos/module_product/20230912161311_79da6c8b54f6d0bab8aef16b70862612.JPG", imgs: ["https://cdn.greensoft.mn/uploads/site/1176/photos/module_product/20230912161311_79da6c8b54f6d0bab8aef16b70862612.JPG", "https://cdn.greensoft.mn/uploads/site/1176/photos/module_product/20230912161333_48ffd935576e7cf8f6a972ee8e893ebb.JPG", "https://cdn.greensoft.mn/uploads/site/1176/photos/module_product/20230912161826_576a38a77942641628cd37939aafe236.JPG"], name: "Пиджак", price: 780000,
      category: "Эмэгтэй"
    },
    { _id: "3", img: "https://cdn.greensoft.mn/uploads/site/1176/photos/module_product/20230912160447_95c47f62dd831a1888877a0634280588.JPG", imgs: ["https://cdn.greensoft.mn/uploads/site/1176/photos/module_product/20230912160447_95c47f62dd831a1888877a0634280588.JPG", "https://cdn.greensoft.mn/uploads/site/1176/photos/module_product/20230912160459_5c3955a4861bcc31e93ddd96422588de.JPG"], name: "Пальто", price: 1489000, category: "Эрэгтэй" }
  ]

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
        data={data}
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