import { Alert, StyleSheet, TouchableOpacity, View,Text } from "react-native";
import React, { memo } from "react";
import { useSWRToken } from "../../hooks/use-swr-token";
import { IAuth } from "../../interface/auth";
import { AuthApi } from "../../api";
import { Image } from "expo-image";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "../../constants/colors";
import { useDispatch } from "react-redux";
import { authLogout } from "../../store/auth-slice";
import { useNavigation } from "@react-navigation/native";
import { format, formatDistanceToNowStrict } from "date-fns";
import mn from "date-fns/locale/mn";
const ProfileScreen = memo(() => {
  const dispatch = useDispatch();
  const { data } = useSWRToken<IAuth>(
    "/auth/me",
    async () => await AuthApi.me()
  );
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
      <View style={styles.user}>
        {/* <Image
          contentFit="contain"
          source={require("../../assets/img/icon.png")}
          style={styles.avatar}
        /> */}
        <Text style={styles.username}>{data?.name}</Text>
        <Text style={styles.deadline}>
          Эрх:{" "}
          {formatDistanceToNowStrict(
            new Date(data?.deadline ? data.deadline : 0),
            { locale: mn }
          )}
        </Text>
        <Text style={styles.deadline1}>
          Дуусах хугацаа:{" "}
          {format(new Date(data?.deadline ? data.deadline : 0), "yyyy-MM-dd")}
        </Text>
      </View>
      <View style={styles.optionContainer}>
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
      </View>
    </View>
  );
});

ProfileScreen.displayName = "ProfileScreen";

export { ProfileScreen };

const styles = StyleSheet.create({
  root: {
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
