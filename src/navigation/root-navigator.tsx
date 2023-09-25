import React from "react";
import { NavigationRoutes, RootStackParamList } from "./types";
import BottomTabNavigator from "./bottom-tab-navigator";
import { useDispatch, useSelector } from "react-redux";
import { IAuth } from "../interface/auth";
import { useSWRToken } from "../hooks/use-swr-token";
import { authMe } from "../store/auth-slice";
import { AuthApi } from "../api";
import { LoginScreen } from "../screens/auth/login-screen";
import { SignUpScreen } from "../screens/auth/sign-up-screen";
import { createNativeStackNavigator, } from "@react-navigation/native-stack";

import { EditProfile } from "../screens/edit-profile/edit-profile";
import { AddBank } from "../screens/add-bank/add-bank";
import { TransactionHistory } from "../screens/transaction-history/transaction-history";
import { ChangePassword } from "../screens/change-password/change-password";
import { Transaction } from "../screens/transaction/transaction";
import { QrLightBox } from "../screens/home/qr-light-box";
import { ProductDetail } from "../screens/ecommerce/detail";
import { ProductLightBox } from "../screens/ecommerce/product-light-box";

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const dispatch = useDispatch();

  const { user } = useSelector((state: { auth: IAuth }) => state.auth);
  const { isInitialLoading } = useSWRToken(
    "swr.user.me",
    async () => {
      return await AuthApi.me();
    },
    {
      onSuccess: (authData) => {
        dispatch(authMe(authData));
      },
    }
  );

  if (isInitialLoading) {
    return null;
  }

  return (
    <Stack.Navigator>
      {!user ? (
        <>
          <Stack.Screen
            component={BottomTabNavigator}
            name={NavigationRoutes.Root}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            component={EditProfile}
            name={NavigationRoutes.EditProfile}
            options={{
              headerShown: false,
              fullScreenGestureEnabled: true
            }}
          />
          <Stack.Screen
            component={AddBank}
            name={NavigationRoutes.AddBank}
            options={{
              headerShown: false,
              fullScreenGestureEnabled: true
            }}
          />
          <Stack.Screen
            component={TransactionHistory}
            name={NavigationRoutes.TransactionHistory}
            options={{
              headerShown: false,
              fullScreenGestureEnabled: true
            }}
          />
          <Stack.Screen
            component={ChangePassword}
            name={NavigationRoutes.ChangePassword}
            options={{
              headerShown: false,
              fullScreenGestureEnabled: true
            }}
          />
          <Stack.Screen
            component={Transaction}
            name={NavigationRoutes.Transaction}
            options={{
              headerShown: false,
              fullScreenGestureEnabled: true
            }}
          />
          <Stack.Screen
            component={ProductDetail}
            name={NavigationRoutes.ProductDetailScreen}
            options={{
              headerShown: false,
              fullScreenGestureEnabled: true
            }}
          />
          <Stack.Screen
            name={NavigationRoutes.QrLightBox}
            component={QrLightBox}
            options={{
              headerShown: false,
              animation: "fade",
              gestureEnabled: true,
              presentation: "containedTransparentModal",
            }}
          />
          <Stack.Screen
            name={NavigationRoutes.ProductLightBox}
            component={ProductLightBox}
            options={{
              headerShown: false,
              animation: "fade",
              gestureEnabled: true,
              presentation: "containedTransparentModal",
            }}
          />
          {/* <Stack.Screen component={NewScreen} name={NavigationRoutes.NewScreen} options={articleDetailScreen} /> */}
        </>
      ) : (
        <>
          <Stack.Screen
            component={LoginScreen}
            name={NavigationRoutes.LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            component={SignUpScreen}
            name={NavigationRoutes.SignUpScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default RootNavigator;
