import React, { memo } from "react";
import { StyleSheet, ViewStyle, View } from "react-native";
import { Colors } from "../constants/colors";

type Props = {
  size?: number;
  value?: number;
  style?: ViewStyle;
};

const Indicator = memo(({ size = 10, value = 1, style }: Props) => {
  return (
    <View style={styles.container}>
      {new Array(size).fill(0).map((_, index) => {
        return (
          <View
            key={index}
            style={[styles.indicator, index === value ? styles.current : undefined, style]}
          />
        );
      })}
    </View>
  );
});

Indicator.displayName = "Indicator";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  indicator: {
    width: 4,
    height: 4,
    borderRadius: 100,
    marginHorizontal: 4,
    opacity: 0.5,
    backgroundColor: Colors.white,
  },
  current: {
    opacity: 1,
  },
});

export { Indicator };
