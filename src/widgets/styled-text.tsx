import { Text, TextProps } from "./themed";
import React from "react";
import { StyleSheet } from "react-native";
export function MonBold(props: TextProps) {
  return <Text {...props} style={[props.style, styles.MonBold]} />;
}
export function MonSemiBold(props: TextProps) {
  return <Text {...props} style={[props.style, styles.MonSemiBold]} />;
}
export function MonMedium(props: TextProps) {
  return <Text {...props} style={[props.style, styles.MonMedium]} />;
}
export function MonThin(props: TextProps) {
  return <Text {...props} style={[props.style, styles.MonThin]} />;
}
export function NunitoBoldIt(props: TextProps) {
  return <Text {...props} style={[props.style, styles.NunitoBoldIt]} />;
}


const styles = StyleSheet.create({
  MonBold: {
    fontFamily: "MonBold",
  },
  MonSemiBold: {
    fontFamily: "MonSemiBold",
  },
  MonMedium: {
    fontFamily: "MonMedium"
  },
  MonThin: {
    fontFamily: "MonThin"
  },
  NunitoBoldIt: {
    fontFamily: "NunitoBoldIt"
  }
});