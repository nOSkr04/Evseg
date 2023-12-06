import {
  Dimensions,
  FlatList,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import React, { memo, useCallback } from "react";
// import { IBanner } from "../../interfaces/banner";
import { Image } from "expo-image";
// import { BannerApi } from "../../api";
import useSWR from "swr";
import CarouselSlider from "react-native-reanimated-carousel";
import Animated from "react-native-reanimated";
import { IImage } from "../../interface/image";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation/types";
// import { IProduct } from "../../interfaces/product";

const PAGE_WIDTH = Dimensions.get("window").width;

type Props = {
  data: IImage[]
}

const Carousel = memo(({ data }: Props) => {
  // const { data } = useSWR<IProduct[]>("swr.banner", async () => {
  //   const {products} = await BannerApi.getBanners();
  //   return products;
  // });

  const navigation = useNavigation();

  const baseOptions = {
    width: PAGE_WIDTH,
    height: 218,
  } as const;

  const renderItem = useCallback(({ item }: { item: { url: string, blurHash: string } }) => {
    return (
      <View style={styles.flex}>
        <Image source={item.url} style={styles.image} placeholder={item.blurHash} />
      </View>
    );
  }, []);
  return (
    <CarouselSlider
      // onSnapToItem={(index) =>   navigation.navigate(NavigationRoutes.ProductLightBox, {
      //           data: data,
      //           indexNumber: index,
      //         })}
      {...baseOptions}
      style={styles.root}
      loop
      snapEnabled
      mode="parallax"
      data={data || []}
      renderItem={renderItem}
    />
  );
});

Carousel.displayName = "Carousel";

export { Carousel };

const styles = StyleSheet.create({
  root: {
    width: PAGE_WIDTH,
  },
  flex: {
    flex: 1,
  },
  image: {
    flex: 1,
    borderRadius: 10,
  },
});