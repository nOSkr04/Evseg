import { Dimensions, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationRoutes, RootStackParamList } from '../../navigation/types';
import Animated, { SharedTransition, withSpring } from 'react-native-reanimated';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, NavigationRoutes.ProductDetailScreen>;

const AniamtedImage = Animated.createAnimatedComponent(Image);
const { width } = Dimensions.get("window")
const customTransition = SharedTransition.custom((values) => {
  "worklet";
  return {
    height: withSpring(values.targetHeight),
    width: withSpring(values.targetWidth),
    originX: withSpring(values.targetOriginX),
    originY: withSpring(values.targetOriginY,),
  };
});

const ProductDetail = memo(({ route }: Props) => {
  const { item: data } = route.params
  const navigation = useNavigation();
  const renderItem = useCallback(({ item, index }: { item: string, index: number }) => {
    return (<Pressable onPress={() => navigation.navigate(NavigationRoutes.ProductLightBox, { data: data.imgs, indexNumber: index })}>
      <AniamtedImage source={item} style={styles.imgs} sharedTransitionTag={item} sharedTransitionStyle={customTransition} contentFit={"contain"} />
    </Pressable>)
  }, [])
  const renderFooter = useCallback(() => {
    return (
      <View>
        <Text>
          {data.name}
        </Text>
        <Text>
          {data.price}
        </Text>
      </View>
    )
  }, [])
  return (
    <>
      <FlatList data={data.imgs} keyExtractor={item => item} renderItem={renderItem} initialScrollIndex={0} horizontal pagingEnabled />
      {renderFooter()}
    </>
  )
})

ProductDetail.displayName = 'ProductDetail'

export { ProductDetail }

const styles = StyleSheet.create({
  imgs: {
    width,
    height: 400
  }
})