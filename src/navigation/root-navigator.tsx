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
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
      {user ? (
        <>
          <Stack.Screen
            component={BottomTabNavigator}
            name={NavigationRoutes.Root}
            options={{ headerShown: false }}
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
