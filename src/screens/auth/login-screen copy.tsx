import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import React, { memo } from "react";
import { Image } from "expo-image";
import LoginForm, { IFormData } from "../../components/auth/login-form";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { AuthApi } from "../../api";
import { authLogin } from "../../store/auth-slice";
import { useForm } from "react-hook-form";
import { NavigationRoutes } from "../../navigation/types";
import { Colors } from "../../constants/colors";
const LoginScreen = memo(() => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<IFormData>();

  const onSubmit = async (data: IFormData) => {
    try {
      const res = await AuthApi.login(data);
      dispatch(authLogin(res));
    } catch (err: any) {
      setError("root", {
        type: err.statusCode,
      });
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.root}
    >
      <ScrollView style={styles.container}>
        {/* <Image
          source={require("../../../assets/img/evseg.png")}
          style={styles.imgBg}
          contentFit="contain"
        /> */}
        <View style={styles.contentContainer}>
          <Text style={styles.logoText}>EVSEG</Text>
          <Text style={styles.welcomeText}>Тавтай морил </Text>
          <LoginForm control={control} errors={errors} />
          {errors.root?.type === 401 && (
            <Text style={styles.errorText}>
              Нэвтрэх нэр нууц үг буруу байна
            </Text>
          )}
          <View style={styles.mt24} />
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={styles.loginContainer}
          >
            <Text style={styles.loginText}>Нэвтрэх</Text>
          </TouchableOpacity>
          <Text style={styles.registerText}>
            Хэрэв танд бүртгэл байхгүй бол
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(NavigationRoutes.SignUpScreen)}
            style={[styles.loginContainer, styles.registerContainer]}
          >
            <Text style={styles.loginText}>Бүртгүүлэх</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
});

LoginScreen.displayName = "LoginScreen";

export { LoginScreen };

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  logoText:{
    fontSize: 50,
    fontWeight: '600',
    color: Colors.bgs,
    textAlign:"center"
  },
  // imgBg: {
  //   height: Dimensions.get("window").height / 4,
  //   // height: 100,
  //   // width:300,
  //   // alignSelf:"center"
  // },
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },
  blurContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    right: 0,
    left: 0,
    height: Dimensions.get("window").height / 2.5,
  },
  contentContainer: {
    backgroundColor: Colors.white,
  },
  welcomeText: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 24,
  },
  forgetPasswordText: {
    flexDirection: "row",
  },
  loginContainer: {
    flex: 1,
    backgroundColor: Colors.bgs,
    marginHorizontal: 16,
    borderRadius: 16,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: Colors.white,
  },
  registerContainer: {
    backgroundColor: Colors.darkBg,
  },
  registerText: {
    textAlign: "center",
    marginVertical: 10,
    color: Colors.black,
  },
  mt24: {
    marginTop: 24,
  },
  errorText: {
    color: Colors.danger,
    fontSize: 12,
    marginBottom: 5,
    textAlign: "right",
    marginRight: 16,
  },
});
