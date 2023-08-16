import { GestureResponderEvent, StyleSheet, TextStyle,TouchableOpacity,ViewStyle } from "react-native";
import React from "react";
import { MonSemiBold } from "./styled-text";
import useColorScheme from "../hooks/use-color-scheme";
import Colors from "../constants/colors";

type Props = {
    title:string
    onPress?:((event: GestureResponderEvent) => void) | undefined
    buttonStyle?: ViewStyle
    titleStyle?: TextStyle
    disabled?: boolean
}

const Button = ({ title, onPress, buttonStyle,titleStyle,disabled }: Props) => {
  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity disabled={disabled ? disabled : false} onPress={onPress} style={[styles.container, { ...buttonStyle }, { borderColor: Colors[colorScheme].tint }]}>
      <MonSemiBold style={[titleStyle, styles.title]}>{title}</MonSemiBold>
    </TouchableOpacity>
  );
};

export  { Button };

const styles = StyleSheet.create({
    container: {
        alignItems    : "center",
        justifyContent: "center",
        borderRadius  : 8,
        borderWidth   : 1,
        padding       : 10,
    },
    title: {}
});