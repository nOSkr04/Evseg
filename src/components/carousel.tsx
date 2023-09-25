import React, { memo, useMemo, useState, useRef } from "react";
import { StyleSheet, FlatList, Dimensions, Pressable, View } from "react-native";
import { Indicator } from "./indicator";

type Props = {
  children: JSX.Element[];
  width?: number;
  height?: number;
  initialIndex?: number;
  onPress?: () => void;
  onChangeIndex?: (index: number) => void;
  showIndicator?: boolean;
};

const Carousel = memo(
  ({
    children,
    width = Dimensions.get("window").width,
    height = Dimensions.get("window").height / 2,
    initialIndex,
    showIndicator = true,
    onPress,
    onChangeIndex,
  }: Props) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 });

    const onViewableItemsChanged = useRef<any>(
      ({ viewableItems }: { viewableItems: { index: number }[] }) => {
        if (!viewableItems || !viewableItems[0]) {
          return;
        }

        const index = viewableItems.length - 1;

        setCurrentIndex(index);
        onChangeIndex && onChangeIndex(index);
      }
    );

    const _CarouselStyles = useMemo(() => {
      const styles = StyleSheet.create({
        carousel: {
          width: width,
          height: height,
        },
      });

      return styles.carousel;
    }, [width, height]);

    const renderItem = ({ item }: { item: JSX.Element }) => {
      return (
        <Pressable onPress={onPress}>
          {item}
        </Pressable>
      );
    };

    return (
      <View style={styles.root}>
        <FlatList
          data={children}
          style={_CarouselStyles}
          renderItem={renderItem}
          initialScrollIndex={initialIndex}
          keyExtractor={(_i, index) => `${index}`}
          getItemLayout={(_, index) => ({
            length: children.length * width,
            offset: width * index,
            index,
          })}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged.current}
          viewabilityConfig={viewabilityConfig.current}
        />
        {showIndicator && (
          <View style={styles.indicator}>
            <Indicator size={children.length} value={currentIndex} />
          </View>
        )}
      </View>
    );
  }
);

Carousel.displayName = "Carousel";

const styles = StyleSheet.create({
  root: {
    position: "relative",
    flex: 1,
  },
  indicator: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export { Carousel };
