import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import { useSWRToken } from "../../hooks/use-swr-token";
import { IAuth } from "../../interface/auth";
import { AuthApi } from "../../api";
import { View } from "../../widgets/themed";
import { Image } from "expo-image";
import { MonMedium, MonSemiBold, MonThin } from "../../widgets/styled-text";
import AntDesign from "@expo/vector-icons/AntDesign";
import { DefaultColors } from "../../constants/default-colors";
import { useDispatch } from "react-redux";
import { authLogout } from "../../store/auth-slice";
import { useNavigation } from "@react-navigation/native";
import useColorScheme from "../../hooks/use-color-scheme";
import Colors from "../../constants/colors";
import { format, formatDistanceToNowStrict } from "date-fns";
import mn from "date-fns/locale/mn";
import { NavigationRoutes } from "../../navigation/types";
const ProfileScreen = memo(() => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const theme = useColorScheme();
  const {
    data,
  } = useSWRToken<IAuth>(
    "/auth/me",
    async () => await AuthApi.me(),
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
    Alert.alert("Та бүртгэлээ устгахдаа итгэлтэй байна уу", "Та тийм гэж дарснаар таны бүртгэл дахиж сэргэхгүйг анхаарна уу!",
      [{
        text : "Үгүй",
        style: "cancel",
      },
      {
        text   : "Тийм", onPress: () => {
          AuthApi.deleteUser(data?._id || "");
          dispatch(authLogout());
        }
      },]
    );

  };
  return (
    <View style={styles.root}>
      <View style={styles.user}>
        <Image contentFit="contain" source={require("../../assets/img/icon.png")} style={styles.avatar} />
        <MonSemiBold style={styles.username}>
          {data?.name}
        </MonSemiBold>
        <MonMedium style={styles.deadline}>
          Эрх: {formatDistanceToNowStrict(new Date(data?.deadline ? data.deadline : 0), { locale: mn })}
        </MonMedium>
        <MonThin style={styles.deadline1}>
          Дуусах хугацаа: {format(new Date(data?.deadline ? data.deadline : 0), "yyyy-MM-dd")}
        </MonThin>

      </View>
      <View style={styles.optionContainer}>
        {
          data &&
          !data.privacy ? <>
            <TouchableOpacity onPress={() => navigation.navigate(NavigationRoutes.PaymentScreen)} style={styles.options}>
              <View style={styles.option}>
                <AntDesign color={Colors[theme].text} name="pay-circle1" size={16} />
                <MonMedium style={styles.optionText}>Үйлчилгээ сунгах</MonMedium>
              </View>
              <AntDesign color={Colors[theme].text} name="right" size={16} />
            </TouchableOpacity>
            <View style={styles.border} />
          </> :
            null
        }
        <TouchableOpacity onPress={() => onDeleteAccount()} style={styles.options}>
          <View style={styles.option}>
            <AntDesign color={Colors[theme].text} name="deleteuser" size={16} />
            <MonMedium style={styles.optionText}>Бүргтэл устгах</MonMedium>
          </View>
          <AntDesign color={Colors[theme].text} name="right" size={16} />
        </TouchableOpacity>
        <View style={styles.border} />
        <TouchableOpacity onPress={logout} style={styles.options}>
          <View style={styles.option}>
            <AntDesign color={Colors[theme].text} name="logout" size={16} />
            <MonMedium style={styles.optionText}>Гарах</MonMedium>
          </View>
          <AntDesign color={Colors[theme].text} name="right" size={16} />
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
    alignItems    : "center",
    justifyContent: "center",
    marginTop     : 50
  },
  avatar: {
    width       : 100,
    height      : 100,
    borderRadius: 20
  },
  optionContainer: {
    marginTop       : 30,
    marginHorizontal: 20
  },
  options: {
    flexDirection : "row",
    justifyContent: "space-between",
    alignItems    : "center"
  },
  option: {
    flexDirection: "row",
    alignItems   : "center"
  },
  optionText: {
    fontSize  : 16,
    lineHeight: 20,
    marginLeft: 8
  },
  border: {
    marginTop   : 12,
    borderWidth : 1,
    borderColor : DefaultColors.border,
    marginBottom: 20
  },
  username: {
    fontSize      : 18,
    marginVertical: 8
  },
  deadline: {
    fontSize    : 12,
    marginBottom: 8
  },
  deadline1: {
    fontSize    : 10,
    marginBottom: 4
  }
});