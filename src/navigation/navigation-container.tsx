import React from "react";
import {  NavigationContainer } from "@react-navigation/native";
import { BottomSheetNavigator } from "./bottom-sheet-navigator";
export default function Navigation() {
  return (
    <NavigationContainer
      >
      <BottomSheetNavigator/>
    </NavigationContainer>
  );
}