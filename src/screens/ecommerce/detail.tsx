import { Dimensions, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useCallback, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationRoutes, RootStackParamList } from '../../navigation/types';
import Animated from 'react-native-reanimated';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AntDesign, Entypo, Fontisto, MaterialIcons } from "@expo/vector-icons"
import { Colors } from '../../constants/colors';
import { Carousel } from '../../components/carousel';
import { priceBrief } from '../../utils/price-brief';
import { AppBar } from '../../components/app-bar';
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
  const { item: data } = route.params
  const [count, setCount] = useState(1)
  const [selectSize, setSelectSize] = useState("M");
  const [selectColor, setSelectColor] = useState("gray")
  const sf = useSafeAreaInsets();
  const navigation = useNavigation();

  const safeTop = useCallback(() => {
    return {
      marginTop: sf.top,
    }
  }, [])

  const positionTop = useCallback(() => {
    return {
      top: sf.top + 16,
    }
  }, [])

  const addCount = () => {
    setCount(count + 1)
  }

  const minusCount = () => {
    if (count === 1) {
      return;
    }
    setCount(count - 1)
  }





  return (
    <>
       <AppBar leading title={data.name}/>
      <View style={[safeTop(), styles.root]}>
        <View>
          <Carousel initialIndex={0} width={width} showIndicator={true}>
            {data.imgs.map((item, index) => {
              return (
                <Pressable
                  key={index}
                  onPress={() => navigation.navigate(NavigationRoutes.ProductLightBox, { data: data.imgs, indexNumber: index })}
                  style={styles.imageContainer}
                >
                  <AniamtedImage source={item} style={[styles.imgs]} sharedTransitionTag={item} contentFit={"contain"} />
                </Pressable>)
            })}
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
                        <Entypo name='check' size={20} color={Colors.fbPrimary} />
                      }
                    </Pressable>
                  )
                })}
              </View>

            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.basketContainer}>
            <Fontisto name="shopping-basket-add" size={16} color={Colors.white} />
          </View>
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
      </View>
    </>
  )
})

ProductDetail.displayName = 'ProductDetail'

export { ProductDetail }

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.bg,
    flex: 1,
    justifyContent: "space-between"
  },
  imgs: {
    width,
    height: 400,
  },
  imageContainer: {
    backgroundColor: "rgba(0,0,0,0.4)",
    height: 400,

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
    backgroundColor: "#acacac",
    padding: 8,
    borderRadius: 8,
    marginRight: 4
  },
  selectedSize: {
    backgroundColor: Colors.fbPrimary,
    padding: 8,
    borderRadius: 8,
    marginRight: 4
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
    width: 32,
    height: 36,
    borderRadius: 8,
    marginRight: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  bottomContainer: {
    backgroundColor: Colors.white,
    paddingBottom: 50,
    paddingHorizontal: 16
  },
  incrementContainer: {
    flexDirection: "row",
    alignItems: "center",

  },
  buttonContainer: {
    padding: 4,
    backgroundColor: "#acacac",
    borderRadius: 4
  },
  basketContainer: {
    padding: 16,
    alignSelf: "center",
    backgroundColor: Colors.fbPrimary,
    borderRadius: 100,
    bottom: 20
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
    borderRadius:8
  }



})