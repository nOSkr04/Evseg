import { Button, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { AppBar } from "../../components/app-bar";
import { IUser } from "../../interface/user";
import useSwr from "swr"
import { AuthApi } from "../../api";
import { useDispatch } from "react-redux";
import { authLogout } from "../../store/auth-slice";
const HomeScreen = memo(() => {
  const dispatch = useDispatch();
  const {data} = useSwr<IUser>("swr.user.me", async () => {
    return await AuthApi.me();
  });

  const logout = async () => {
    try {
      await AuthApi.logout();
      dispatch(authLogout());
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View>
      <AppBar fullname={`${data?.lastName} ${data?.firstName}`}/>
      <Button onPress={logout} title="lol"  />
    </View>
  );
});

HomeScreen.displayName = "HomeScreen";

export { HomeScreen };

const styles = StyleSheet.create({});
