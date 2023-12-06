import { Dimensions, Pressable, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { memo, useState, useCallback } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationRoutes, RootStackParamList } from '../../navigation/types';
import Animated from 'react-native-reanimated';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from "@expo/vector-icons"
import { Colors } from '../../constants/colors';
import { priceBrief } from '../../utils/price-brief';
import { AppBar } from '../../components/app-bar';
import Feather from '@expo/vector-icons/Feather';
import useSWR from 'swr';
import { BasketApi, ProductApi } from '../../api';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { Carousel } from '../../components/carousel/carousel';
import { ProductLightBox } from './product-light-box';
import { IProduct } from '../../interface/product';

type Props = NativeStackScreenProps<RootStackParamList, NavigationRoutes.ProductDetailScreen>;

const AnimatedImage = Animated.createAnimatedComponent(Image);
const { width } = Dimensions.get("window")

const ProductDetail = memo(({ route }: Props) => {
  const { id } = route.params;

  const [selectImage, setSelectImage] = useState("");
  const { data } = useSWR(`${selectImage}.products.${id}`, async () => {
    const res = ProductApi.getProduct(id, selectImage);
    return res;
  })
  const [count, setCount] = useState(1)
  const [selectSize, setSelectSize] = useState(``);
  const navigation = useNavigation();
  const addCount = () => {
    if (count !== data?.availableCount) {
      setCount(count + 1)
    }
  }

  const addCart = useCallback(async () => {
    const createData = {
      quantity: count,
      productId: data!._id,
      size: selectSize,
    }

    try {
      const res = await BasketApi.addBasket(createData)
      navigation.goBack();
    } catch(err){
      console.log(err)
    }

   

  }, [selectSize, count, selectSize])

  const imageBorder = useCallback((id: string) => {
    return {
      borderWidth: selectImage === id ? 1 : 0,
      borderColor: selectImage === id ? Colors.black : Colors.transparent,
    }
  }, [selectImage])


  const minusCount = () => {
    if (count === 1) {
      return;
    }
    setCount(count - 1)
  }

  if (!data) {
    return null
  }
  console.log(data)

  return (
    <>
      <AppBar leading title={"Барааны дэлгэрэнгүй"} />
      <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
        <View>
          <Carousel data={data.images} />
          <ScrollView horizontal={true} style={styles.horizontalContainer}>
            {
              data.images.map((item, index) => <TouchableOpacity key={index} onPress={() => setSelectImage(item._id)} style={styles.image}>
                <Image source={item.url} placeholder={item.blurHash} style={[styles.mainProduct, imageBorder(item._id)]} />
              </TouchableOpacity>)
            }
          </ScrollView>
          <View style={styles.container}>
            <View>
              <Text style={styles.title}>
                {data?.name}
              </Text>
              <Text style={styles.price}>
                {data.category?.name}
              </Text>
            </View>
            <Pressable >
              <AntDesign name='heart' color={Colors.danger} size={18} />
            </Pressable>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailTitle}>Хэмжээ</Text>
            <View style={styles.sizeRoot}>
              {/* {data.size.map((item: IProduct) => {
                return (
                  <Pressable style={item.name === selectSize ? styles.selectedSize : styles.sizeContainer} key={item.name} onPress={() => setSelectSize(item.name)}>
                    <Text style={item.name === selectSize ? styles.selectedText : styles.sizeTitle}>{item.name.toUpperCase()}</Text>
                  </Pressable>
                )
              })} */}
            </View>
          </View>
        </View>
        <Text style={styles.description}>
          {data.description}
        </Text>
        <View style={styles.bottomContainer}>
          <View style={styles.bottomContent}>
            <View>
              <View style={styles.incrementContainer}>
                <TouchableOpacity style={styles.quantityContainer} onPress={minusCount}>
                  <AntDesign name="minus" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.minusTitle}>{count}</Text>
                <TouchableOpacity style={styles.quantityContainer} onPress={addCount}>
                  <AntDesign name="plus" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <Text style={styles.quantityText}>Үлдэгдэл : {data.availableCount}</Text>
            </View>
            <View>
              <Text style={styles.priceTitle}>Нийт дүн</Text>
              <Text style={styles.priceContent}>{priceBrief(data.price * count)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.basketContainer} onPress={addCart}>
            <Feather name="shopping-cart" size={16} color={Colors.white} />
            <Text style={styles.basketText}>Барааг сагслах</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyContainer}>
            <MaterialCommunityIcons name="bank-transfer" size={22} color={Colors.bgs} />
            <Text style={styles.buyText}>Худалдан авах</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  )
})

ProductDetail.displayName = 'ProductDetail'

export { ProductDetail }

const styles = StyleSheet.create({
  quantityText: {
    fontFamily: 'MonSemiBold'
  },
  image:{
    marginRight: 10,
  },
  mainProduct: {
    paddingHorizontal: 15,
    height: 150,
    width: 90,
    borderRadius: 10,
  },
  colorBorder: {
    padding: 3,
    borderWidth: 1.5,
    borderRadius: 100,
  },
  root: {
    backgroundColor: Colors.white,
    flex: 1,
    // justifyContent: "space-between",
  },
  horizontalContainer: {
    gap: 5,
    paddingHorizontal: 15,
  },
  description: {
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
  basketText: {
    marginLeft: 10,
    color: Colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  buyText: {
    marginLeft: 10,
    color: Colors.bgs,
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
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginHorizontal: 16,
  },
  detail: {
    marginLeft: 15,
    backgroundColor: Colors.white,
    marginRight: 8,
    marginTop: 16,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  detailTitle: {
    fontSize: 16,
    fontFamily: "MonSemiBold",
    marginBottom: 8
  },
  sizeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bgs,
    padding: 8,
    borderRadius: 10,
    height: 45,
    width: 45,
    marginRight: 4,
  },
  selectedSize: {
    width: 45,
    height: 45,
    borderRadius: 10,
    marginRight: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.bgs,
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
  selectedText: {
    fontSize: 16,
    fontFamily: "MonBold",
    color: Colors.bgs,
  },
  colorContainer: {
    width: 30,
    height: 30,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16
  },
  incrementContainer: {
    flexDirection: "row",
    alignItems: "center",

  },
  quantityContainer: {
    padding: 4,
    // backgroundColor: "#acacac",
    borderRadius: 4
  },
  buttonContainer: {
    marginTop: 15,
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    bottom: 0,
  },
  buyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 46,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignSelf: "flex-start",
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.bgs,
    borderRadius: 15,
  },
  basketContainer: {
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignSelf: "flex-start",
    backgroundColor: Colors.bgs,
    borderRadius: 15,
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