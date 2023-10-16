import { Dimensions, Pressable, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { memo, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationRoutes, RootStackParamList } from '../../navigation/types';
import Animated from 'react-native-reanimated';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';

import { AntDesign, Entypo, Fontisto, } from "@expo/vector-icons"
import { Colors } from '../../constants/colors';
import { Carousel } from '../../components/carousel';
import { priceBrief } from '../../utils/price-brief';
import { AppBar } from '../../components/app-bar';
import Feather from '@expo/vector-icons/Feather';
import useSWR from 'swr';
import { ProductApi } from '../../api';

type Props = NativeStackScreenProps<RootStackParamList, NavigationRoutes.ProductDetailScreen>;

const AniamtedImage = Animated.createAnimatedComponent(Image);
const { width } = Dimensions.get("window")


const sizes = [
  "S", "M", "L", "XL"
]

const colored = [
  "gray", "black", "pink", "blue"
]

const ProductDetail = memo(({ route }: Props) => {
  const { id } = route.params;
  const {data} = useSWR(`product.${id}`,async () => {
    const res = ProductApi.getProduct(id);
    return res
  })
  const [count, setCount] = useState(1)
  const [selectSize, setSelectSize] = useState("M");
  const [selectColor, setSelectColor] = useState("gray")
  const navigation = useNavigation();




  const addCount = () => {
    setCount(count + 1)
  }

  const minusCount = () => {
    if (count === 1) {
      return;
    }
    setCount(count - 1)
  }
if(!data){
  return null
}


  return (
    <>
      <AppBar leading title={data?.name} />
      <ScrollView style={styles.root}>
        <View>
          <Carousel initialIndex={0} width={width} showIndicator={true}>
            <View>
            {data?.images.map((item, index) => {
              return (
                <Pressable
                  key={index}
                  onPress={() => navigation.navigate(NavigationRoutes.ProductLightBox, { data: data.images, indexNumber: index })}
                  style={styles.imageContainer}
                >
                  <AniamtedImage source={item.url} placeholder={item.blurHash} style={[styles.imgs]} sharedTransitionTag={item.url} contentFit={"cover"}  />
                </Pressable>)
            })}
                  </View>
          </Carousel>
          <View style={styles.container}>
            <View>
              <Text style={styles.title}>
                {data.name}
              </Text>
              <Text style={styles.price}>
                {data.category}
              </Text>
            </View>
            <Pressable >
              <AntDesign name='heart' color={Colors.danger} size={18} />
            </Pressable>
          </View>
          <View style={styles.detailContainer}>
            <View style={styles.detail}>
              <Text style={styles.detailTitle}>Хэмжээ</Text>
              <View style={styles.sizeRoot}>
                {sizes.map((size) => {
                  return (
                    <Pressable style={size === selectSize ? styles.selectedSize : styles.sizeContainer} key={size} onPress={() => setSelectSize(size)}>
                      <Text style={styles.sizeTitle}>{size}</Text>
                    </Pressable>
                  )
                })}
              </View>
            </View>
            <View style={styles.detail}>
              <Text style={styles.detailTitle}>Өнгө</Text>
              <View style={styles.sizeRoot}>
                {colored.map((color) => {
                  const colors = () => {
                    return {
                      backgroundColor: color
                    }
                  }
                  return (
                    <Pressable style={[styles.colorContainer, colors()]} key={color} onPress={() => setSelectColor(color)}>
                      {color === selectColor &&
                        <Entypo name='check' size={20} color={Colors.bgs} />
                      }
                    </Pressable>
                  )
                })}
              </View>
            </View>
          </View>
        </View>
        <Text style={styles.description}>
          Одоогоос 150 гаруй жилийн тэртээ Францын хаан гуравдугаар Наполеон эхнэртээ ховор нандин ороолт бэлэглэжээ. Бүр нэгийг бус арван долоон ширхгийг бэлэглэсний учир юунд байв? Хатан хаан Эжени зөөлөн тансаг уг алчуураа магтахдаа "хуримын бөгжин дундуур гүйлгэхэд гарч ирэхээр тийм нимгэн" хэмээснээс загварын түүхэнд "бөгжинд багтах ороолт" гэж нэршсэн энэхүү алчуур цэвэр ноолууран ороолт байв. Түүний өмссөн зүүсэн бүхэн Францын язгууртан дунд улмаар бусад Европын орнуудад эрэлттэй зүйл болдог байсан тул ноолуур ийнхүү Европын тансаг хэрэглээнд анх нэвтэрсэн нь XIX зуун.
        </Text>
        <View style={styles.bottomContainer}>
          <View style={styles.bottomContent}>
            <View style={styles.incrementContainer}>
              <TouchableOpacity style={styles.buttonContainer} onPress={minusCount}>
                <AntDesign name="minus" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.minusTitle}>{count}</Text>
              <TouchableOpacity style={styles.buttonContainer} onPress={addCount}>
                <AntDesign name="plus" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.priceTitle}>Нийт дүн</Text>
              <Text style={styles.priceContent}>{priceBrief(data.price * count)}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.basketContainer}>
          <Feather name="shopping-cart" size={16} color={Colors.white} />
          <Text style={styles.buyText}>Худалдаж авах</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  )
})

ProductDetail.displayName = 'ProductDetail'

export { ProductDetail }

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.white,
    flex: 1,
    // justifyContent: "space-between",
  },
  description:{
    marginHorizontal: 15,
    color: Colors.grey,
    marginVertical: 5,
  },
  imgs: {
    width,
    height: 400,
  },
  imageContainer: {
    backgroundColor: Colors.bgs,
    height: 400,
  },
  buyText: {
    marginLeft: 10,
    color: Colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 8,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: "MonBold"
  },
  price: {
    fontSize: 18,
    marginTop: 4
  },
  likeContainer: {
    padding: 8,
    backgroundColor: Colors.white,
    borderRadius: 10
  },

  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
  },
  detail: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    width: width / 2 - 20,
    padding: 8,
    marginRight: 8,
    marginTop: 16

  },
  detailTitle: {
    fontSize: 16,
    fontFamily: "MonSemiBold",
    marginBottom: 8
  },
  sizeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#acacac",
    padding: 8,
    borderRadius: 100,
    height: 45,
    width: 45,
    marginRight: 4
  },
  selectedSize: {
    width: 45,
    height: 45,
    borderRadius: 100,
    marginRight: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.bgs,
  },
  sizeRoot: {
    flexDirection: "row",
    justifyContent: "space-evenly",

  },
  sizeTitle: {
    fontSize: 16,
    fontFamily: "MonBold",
    color: Colors.white
  },
  colorContainer: {
    width: 45,
    height: 45,
    borderRadius: 100,
    marginRight: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  bottomContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16
  },
  incrementContainer: {
    flexDirection: "row",
    alignItems: "center",

  },
  buttonContainer: {
    padding: 4,
    // backgroundColor: "#acacac",
    borderRadius: 4
  },
  basketContainer: {
    marginTop: 15,
    flexDirection: 'row',
    marginBottom: 25,
    padding: 16,
    marginLeft: 15,
    alignSelf: "flex-start",
    backgroundColor: Colors.bgs,
    borderRadius: 15,
    bottom: 0
  },
  minusTitle: {
    fontFamily: "MonBold",
    fontSize: 16,
    marginHorizontal: 8
  },
  bottomContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  priceTitle: {
    fontFamily: "MonThin",
    color: Colors.grey,
    textAlign: "right",
    marginBottom: 4
  },
  priceContent: {
    fontFamily: "MonBold",
    fontSize: 16,

  },
  backContainer: {
    position: "absolute",
    left: 16,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
    padding: 8,
    borderRadius: 8
  }



})