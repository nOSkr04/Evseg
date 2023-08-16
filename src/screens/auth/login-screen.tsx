import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View, } from "react-native";
import React, { memo } from "react";
import { DefaultColors } from "../../constants/default-colors";
import { Image } from "expo-image";
import { MonBold, MonMedium, MonSemiBold } from "../../widgets/styled-text";
import LoginForm, { IFormData } from "../../components/auth/login-form";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { AuthApi } from "../../api";
import { authLogin } from "../../store/auth-slice";
import { useForm } from "react-hook-form";
import { NavigationRoutes } from "../../navigation/types";
const LoginScreen = memo(() => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { handleSubmit, control, formState: { errors }, setError } = useForm<IFormData>();

  const onSubmit = async (data: IFormData) => {
    try {
      const res = await AuthApi.login(data);
      dispatch(authLogin(res));
    } catch (err: any) {
      setError("root", {
        type: err.statusCode
      });
    }
  };
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.root}>
      <ScrollView style={styles.container}>
        <Image source={require("../../assets/img/login.jpg")} style={styles.imgBg} />
        <View style={styles.blurContainer} >
          <Image source={require("../../assets/img/nobglogo.png")} style={styles.logo} />
        </View>
        <View style={styles.contentContainer}>
          <MonSemiBold style={styles.welcomeText}>Тавтай морил </MonSemiBold>
          <LoginForm control={control} errors={errors} />
          {errors.root?.type === 401 && <MonMedium style={styles.errorText}>Нэвтрэх нэр нууц үг буруу байна</MonMedium>}
          <View style={styles.mt24} />
          <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.loginContainer}>
            <MonBold style={styles.loginText}>Нэвтрэх</MonBold>
          </TouchableOpacity>
          <MonMedium style={styles.registerText}>Хэрэв танд бүртгэл байхгүй бол</MonMedium>
          <TouchableOpacity onPress={() => navigation.navigate(NavigationRoutes.SignUpScreen)} style={[styles.loginContainer, styles.registerContainer]}>
            <MonBold style={styles.loginText}>Бүртгүүлэх</MonBold>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
});

LoginScreen.displayName = " LoginScreen";

export { LoginScreen };

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  container: {
    backgroundColor: DefaultColors.white,
    flex           : 1
  },
  imgBg: {
    height        : Dimensions.get("window").height / 2.5,
    alignItems    : "center",
    justifyContent: "center",
    flex          : 1
  },
  logo: {
    width    : 150,
    height   : 150,
    alignSelf: "center",
  },
  blurContainer: {
    position      : "absolute",
    alignItems    : "center",
    justifyContent: "center",
    right         : 0,
    left          : 0,
    height        : Dimensions.get("window").height / 2.5,
    
  },
  contentContainer: {
    backgroundColor     : DefaultColors.white,
    flex                : 2,
    bottom              : 50,
    borderTopLeftRadius : 30,
    borderTopRightRadius: 30,
  },
  welcomeText: {
    fontSize : 24,
    textAlign: "center",
    marginTop: 24
  },
  forgetPasswordText: {
    flexDirection: "row"
  },
  loginContainer: {
    flex            : 1,
    backgroundColor : DefaultColors.bgs,
    marginHorizontal: 16,
    borderRadius    : 16,
    paddingVertical : 12,
    justifyContent  : "center",
    alignItems      : "center"
  },
  loginText: {
    color: DefaultColors.white
  },
  registerContainer: {
    backgroundColor: DefaultColors.darkBg
  },
  registerText: {
    textAlign     : "center",
    marginVertical: 10,
    color         : DefaultColors.black
  },
  mt24: {
    marginTop: 24
  },
  errorText: {
    color       : DefaultColors.danger,
    fontSize    : 12,
    marginBottom: 5,
    textAlign   : "right",
    marginRight : 16
  },

});