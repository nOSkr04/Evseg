import { Alert, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import React, { memo, useState } from "react";
import { useSWRToken } from "../../hooks/use-swr-token";
import { IAuth } from "../../interface/auth";
import { AuthApi } from "../../api";
import { Image } from "expo-image";
import AntDesign from "@expo/vector-icons/AntDesign";
import IonIcons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { Colors } from "../../constants/colors";
import { useDispatch } from "react-redux";
import { authLogout } from "../../store/auth-slice";
import { useNavigation } from "@react-navigation/native";
import { format, formatDistanceToNowStrict } from "date-fns";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import mn from "date-fns/locale/mn";
import useSwr from "swr"
import { IUser } from "../../interface/user";
import { NavigationRoutes } from "../../navigation/types";
const ProfileScreen = memo(() => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { data } = useSwr<IUser>("swr.user.me")

  const logout = async () => {
    try {
      await AuthApi.logout();
      dispatch(authLogout());
    } catch (err) {
      console.log(err);
    }
  };
  const onDeleteAccount = () => {
    Alert.alert(
      "Та бүртгэлээ устгахдаа итгэлтэй байна уу",
      "Та тийм гэж дарснаар таны бүртгэл дахиж сэргэхгүйг анхаарна уу!",
      [
        {
          text: "Үгүй",
          style: "cancel",
        },
        {
          text: "Тийм",
          onPress: () => {
            AuthApi.deleteUser(data?._id || "");
            dispatch(authLogout());
          },
        },
      ]
    );
  };
  return (
    <View style={styles.root}>
      {/* <View style={styles.user}> */}
      {/* <Image
          contentFit="contain"
          source={require("../../assets/img/icon.png")}
          style={styles.avatar}
        /> */}
      {/* <Text style={styles.username}>{data?.name}</Text> */}
      {/* <Text style={styles.deadline}>
          Эрх:{" "}
          {formatDistanceToNowStrict(
            new Date(data?.deadline ? data.deadline : 0),
            { locale: mn }
          )}
        </Text> */}
      {/* <Text style={styles.deadline1}>
          Дуусах хугацаа:{" "}
          {format(new Date(data?.deadline ? data.deadline : 0), "yyyy-MM-dd")}
        </Text> */}
      {/* </View> */}
      {/* <View style={styles.optionContainer}>
        <TouchableOpacity
          onPress={() => onDeleteAccount()}
          style={styles.options}
        >
          <View style={styles.option}>
            <AntDesign color={Colors.bgs} name="deleteuser" size={16} />
            <Text style={styles.optionText}>Бүргтэл устгах</Text>
          </View>
          <AntDesign color={Colors.bgs} name="right" size={16} />
        </TouchableOpacity>
        <View style={styles.border} />
        <TouchableOpacity onPress={logout} style={styles.options}>
          <View style={styles.option}>
            <AntDesign color={Colors.bgs} name="logout" size={16} />
            <Text style={styles.optionText}>Гарах</Text>
          </View>
          <AntDesign color={Colors.bgs} name="right" size={16} />
        </TouchableOpacity>
        <View style={styles.border} />
      </View> */}
      <Text style={styles.userName}>{data?.lastName} {data?.firstName}</Text>
      <View>
       <View style={styles.container}>
        <IonIcons name="person" size={24} />
        <Text>
          Хувийн мэдээлэл
        </Text>
       </View>
       <View style={styles.container}>
        <Entypo name="key" size={24} />
        <Text>
          Нууц үг солих
        </Text>
       </View>
       <View style={styles.container}>
        <IonIcons name="call" size={24} />
        <Text>
          Холбоо барих
        </Text>
       </View>
      </View>
      <View>
        <TouchableOpacity onPress={logout} style={styles.logoutContainer}>
          <AntDesign name="poweroff" color={Colors.white} size={16} />
          <Text style={styles.registerButtonText}>Гарах</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => onDeleteAccount}>
          <Text style={styles.deleteAccount}>Бүртгэл устгах</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
});

ProfileScreen.displayName = "ProfileScreen";

export { ProfileScreen };

const styles = StyleSheet.create({
  registerButtonText: {
    textAlign: "center",
    fontSize: 16,
    color: Colors.white,
  },
  deleteAccount:{
    textAlign: 'right',
    fontSize: 15,
    marginTop: 15,
  },
  logoutContainer: {
    gap: 5,
    backgroundColor: Colors.bgs,
    height: 50,
    borderRadius: 10,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    marginVertical: 8,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    gap: 10,
    paddingLeft: 15,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  userName: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 24,
    justifyContent: 'center',
  },
  root: {
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    flex: 1,
  },
  user: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  optionContainer: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    lineHeight: 20,
    marginLeft: 8,
  },
  border: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },
  username: {
    fontSize: 18,
    marginVertical: 8,
  },
  deadline: {
    fontSize: 12,
    marginBottom: 8,
  },
  deadline1: {
    fontSize: 10,
    marginBottom: 4,
  },
});
