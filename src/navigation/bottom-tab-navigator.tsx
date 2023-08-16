import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationRoutes, RootTabParamList } from "./types";

import { ProfileScreen } from "../screens/profile/profile";
import { HomeScreen } from "../screens/home/home";

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
