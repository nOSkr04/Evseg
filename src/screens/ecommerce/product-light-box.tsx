import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback, useRef, useState } from 'react'
import { LightBox } from '../../components/animate/light-box'
import { useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationRoutes, RootStackParamList } from '../../navigation/types';
import Animated, { SharedTransition, withSpring } from 'react-native-reanimated';
import { Image } from 'expo-image';
import { Carousel } from '../../components/carousel';

type Props = NativeStackScreenProps<RootStackParamList, NavigationRoutes.ProductLightBox>;
const AnimatedImage = Animated.createAnimatedComponent(Image)

const width = Dimensions.get("window").width
const customTransition = SharedTransition.custom((values) => {
    "worklet";
    return {
        height: withSpring(values.targetHeight),
        width: withSpring(values.targetWidth),
        originX: withSpring(values.targetOriginX),
        originY: withSpring(values.targetOriginY,),
    };
});
const ProductLightBox = memo(({ route }: Props) => {
    const { data, indexNumber } = route.params
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(1);
    return (
        <LightBox onClosed={() => navigation.goBack()} LightHeaderComponent={<Text>{currentIndex + 1} / {data.length}</Text>}  >
           <Carousel
          initialIndex={indexNumber}
          onChangeIndex={(index) => setCurrentIndex(index)}
          showIndicator={false}
        >
          {data.map((e) => {
            return (
              <>
                <AnimatedImage key={e} source={e} style={styles.img} sharedTransitionTag={e} sharedTransitionStyle={customTransition} contentFit={"contain"} />
              </>
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
    }
})