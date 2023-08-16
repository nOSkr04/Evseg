import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationRoutes, RootTabParamList } from "./types";

import { HomeScreen } from "../screens/article/home-screen";
import { ProfileScreen } from "../screens/profile/profile";

const BottomTabNavigator = () => {
  const BottomTab = createBottomTabNavigator<RootTabParamList>();
  return (
    <BottomTab.Navigator initialRouteName={NavigationRoutes.HomeScreen}>
      <BottomTab.Screen
        component={HomeScreen}
        name={NavigationRoutes.HomeScreen}
      />
      <BottomTab.Screen
        component={ProfileScreen}
        name={NavigationRoutes.ProfileScreen}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
