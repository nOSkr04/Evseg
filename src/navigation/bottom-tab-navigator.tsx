import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationRoutes, RootTabParamList } from "./types";

import { ProfileScreen } from "../screens/profile/profile";
import { HomeScreen } from "../screens/home/home";
import { Colors } from "../constants/colors";
import FontAwesome from "@expo/vector-icons/FontAwesome"
const BottomTabNavigator = () => {
  const BottomTab = createBottomTabNavigator<RootTabParamList>();
  return (
    <BottomTab.Navigator initialRouteName={NavigationRoutes.HomeScreen} screenOptions={{
      tabBarActiveTintColor: Colors.bgs,
      title: ""
    }}  >
      <BottomTab.Screen
        component={HomeScreen}
        name={NavigationRoutes.HomeScreen}
        options={{ tabBarIcon : ({ color }: { color: string }) => <FontAwesome color={color} name="home" size={24}  />,
        headerShown: false,}}
      />
      <BottomTab.Screen
        component={ProfileScreen}
        name={NavigationRoutes.ProfileScreen}
        options={{ tabBarIcon : ({ color }: { color: string }) => <FontAwesome color={color} name="user" size={24}  />,
        headerShown: false,}}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
