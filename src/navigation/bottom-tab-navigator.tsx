import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationRoutes, RootTabParamList } from "./types";

import { ProfileScreen } from "../screens/profile/profile";
import { HomeScreen } from "../screens/home/home";
import { Colors } from "../constants/colors";
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { AnimatedTabBar } from "../components/tab-bar/animated-tab-bar";
import { EcommerceScreen } from "../screens/ecommerce/ecommerce";
import { BasketScreen } from "../screens/basket-screen/basket-screen";
import Entypo from "@expo/vector-icons/Entypo";
const BottomTabNavigator = () => {
  const BottomTab = createBottomTabNavigator<RootTabParamList>();
  return (
    <BottomTab.Navigator initialRouteName={NavigationRoutes.HomeScreen} 
    tabBar={(props) => <AnimatedTabBar {...props} />}
    screenOptions={{ headerShown: false, tabBarActiveTintColor: Colors.bgs, }}
    >
      <BottomTab.Screen
        component={HomeScreen}
        name={NavigationRoutes.HomeScreen}
        options={{ tabBarIcon : () => <FontAwesome color={Colors.black} name="home" size={24}  />,
        headerShown: false,}}
      />
      <BottomTab.Screen
        component={EcommerceScreen}
        name={NavigationRoutes.EcommerceScreen}
        options={{ tabBarIcon : () => <Entypo color={Colors.black} name="shop" size={24}  />,
        headerShown: false,}}
      />
      <BottomTab.Screen
        component={BasketScreen}
        name={NavigationRoutes.BasketScreen}
        options={{ tabBarIcon : () => <FontAwesome color={Colors.black} name="shopping-cart" size={24}   />,
        headerShown: false,}}
      />
      <BottomTab.Screen
        component={ProfileScreen}
        name={NavigationRoutes.ProfileScreen}
        options={{ tabBarIcon : () => <FontAwesome color={Colors.black} name="user" size={24}  />,
        headerShown: false,}}
      />
      
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
