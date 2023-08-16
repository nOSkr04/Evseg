import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo } from "react";
import { Image } from "expo-image";
import { MonBold, MonMedium, MonSemiBold } from "../../widgets/styled-text";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { AuthApi } from "../../api";
import { DefaultColors } from "../../constants/colors";
import { authLogin } from "../../store/auth-slice";
import AntDesign from "@expo/vector-icons/AntDesign";
import SignUpForm, { IFormData } from "../../components/auth/sign-up-form";
const SignUpScreen = memo(() => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<IFormData>();

  const onSubmit = async (data: IFormData) => {
    try {
      const res = await AuthApi.signUp(data);
      dispatch(authLogin(res));
    } catch (err: any) {
      if (data.password.length < 4) {
        return Alert.alert("Нууц үг хамгийн багадаа 4оронтой байна");
      }
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
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backArrow}
      >
        <AntDesign name="left" size={24} />
      </TouchableOpacity>
      <ScrollView style={styles.container}>
        <Image
          source={require("../../assets/img/gradient.png")}
          style={styles.imgBg}
          transition={500}
        />
        <View style={styles.blurContainer}>
          <Image
            source={require("../../assets/img/nobglogo.png")}
            style={styles.logo}
            transition={1000}
          />
        </View>
        <View style={styles.contentContainer}>
          <MonSemiBold style={styles.welcomeText}>Бүртгүүлэх </MonSemiBold>
          <SignUpForm control={control} errors={errors} />
          {errors.root?.type === 401 && (
            <MonMedium style={styles.errorText}>
              Нэвтрэх нэр нууц үг буруу байна
            </MonMedium>
          )}
          {errors.root?.type === 500 && (
            <MonMedium style={styles.errorText}>
              Бүртгэлтэй хэрэглэгч байна
            </MonMedium>
          )}

          <View style={styles.mt24} />
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={styles.loginContainer}
          >
            <MonBold style={styles.loginText}>Бүртгүүлэх</MonBold>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
});

SignUpScreen.displayName = " SignUpScreen";

export { SignUpScreen };

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    backgroundColor: DefaultColors.white,
    flex: 1,
  },
  imgBg: {
    height: Dimensions.get("window").height / 2.5,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
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
    backgroundColor: DefaultColors.white,
    flex: 2,
    bottom: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
    backgroundColor: DefaultColors.bgs,
    marginHorizontal: 16,
    borderRadius: 16,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: DefaultColors.white,
  },
  registerContainer: {
    backgroundColor: DefaultColors.darkBg,
  },
  registerText: {
    textAlign: "center",
    marginVertical: 10,
  },
  mt24: {
    marginTop: 24,
  },
  errorText: {
    color: DefaultColors.danger,
    fontSize: 12,
    marginBottom: 5,
    textAlign: "right",
    marginRight: 16,
  },
  backArrow: {
    position: "absolute",
    top: 60,
    zIndex: 99,
    left: 20,
    backgroundColor: DefaultColors.darkTransparent,
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
});
