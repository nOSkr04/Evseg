import { Dimensions, Pressable, StyleSheet, Text, View, } from 'react-native'
import React, { memo, useState, useCallback } from 'react'
import { LightBox } from '../../components/animate/light-box'
import { useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationRoutes, RootStackParamList } from '../../navigation/types';
import Animated from 'react-native-reanimated';
import { Image } from 'expo-image';
import { Carousel } from '../../components/carousel';
import { Colors } from '../../constants/colors';
import {AntDesign} from "@expo/vector-icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
type Props = NativeStackScreenProps<RootStackParamList, NavigationRoutes.ProductLightBox>;
const AnimatedImage = Animated.createAnimatedComponent(Image)

const width = Dimensions.get("window").width

const ProductLightBox = memo(({ route }: Props) => {
  const { data, indexNumber } = route.params
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(1);

  return (
    <LightBox onClosed={() => navigation.goBack()} LightHeaderComponent={
    <View style={styles.header}>
       <Pressable onPress={() => navigation.goBack()} style={styles.backContainer}>
        <AntDesign name="arrowleft" size={24} color={Colors.white} />
      </Pressable>
      <Text style={styles.title}>{currentIndex + 1} / {data.length}</Text>
      <Pressable style={styles.backContainer2}>
        <MaterialIcons name="keyboard-arrow-left" size={24} color={Colors.black} />
      </Pressable>
    </View>
  }>
      <Carousel
        initialIndex={indexNumber}
        onChangeIndex={(index) => setCurrentIndex(index)}
        showIndicator={true}
      >
        {data.map((e) => {
          return (
            <AnimatedImage key={e} source={e} style={styles.img} sharedTransitionTag={e} contentFit={"contain"} />
          );
        })}
      </Carousel>
    </LightBox>
  )
})

ProductLightBox.displayName = "ProductLightBox"

export { ProductLightBox }

const styles = StyleSheet.create({
  img: {
    width,
    height: "100%"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-between",
    width,
    marginHorizontal:16
  },
  backContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius:8
  },
  backContainer2: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius:8
  },
  title:{
    fontFamily:"MonSemiBold",
    fontSize:16,
    color:Colors.white
  }
})