import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { NavigationRoutes, RootStackParamList } from "./types";
import BottomTabNavigator from "./bottom-tab-navigator";
import { ArticleDetailScreen } from "../screens/article/article-detail";
import { useDispatch, useSelector } from "react-redux";
import { IAuth } from "../interface/auth";
import { useSWRToken } from "../hooks/use-swr-token";
import { authMe } from "../store/auth-slice";
import { AuthApi } from "../api";
import { LoginScreen } from "../screens/auth/login-screen";
import {   articleDetailScreen } from "../components/header";
import { SignUpScreen } from "../screens/auth/sign-up-screen";

const Stack = createSharedElementStackNavigator<RootStackParamList>();

function RootNavigator() {
  const dispatch = useDispatch();

  const { user } = useSelector((state: { auth: IAuth }) => state.auth);
  const { isInitialLoading } = useSWRToken(
    "auth/me",
    async () => {
      return await AuthApi.me();
    },
    {
      onSuccess: authData => {
        dispatch(authMe(authData));
      }
    }
  );

  if (isInitialLoading) {
    return null;
  }
  return (
    <Stack.Navigator>
      {user ?
        <>
          <Stack.Screen component={BottomTabNavigator} name={NavigationRoutes.Root} options={{ headerShown: false }} />
          <Stack.Screen component={ArticleDetailScreen} name={NavigationRoutes.ArticleDetailScreen} options={articleDetailScreen} />
        </>
        :
        <>
          <Stack.Screen component={LoginScreen} name={NavigationRoutes.LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen component={SignUpScreen} name={NavigationRoutes.SignUpScreen} options={{ headerShown: false }} />
        </>
      }
    </Stack.Navigator>
  );
}



export default RootNavigator;
