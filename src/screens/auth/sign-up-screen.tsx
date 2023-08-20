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
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { AuthApi } from "../../api";
import { Colors } from "../../constants/colors";
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
    getValues
  } = useForm<IFormData>();

  const onSubmit = async (data: IFormData) => {
    const sendData = {
      firstName: data.firstname,
      register: `${data.alphabet}${data.alphabet1}${data.regNumber}`,
      phone: data.phone,
      lastName: data.lastname,
      bankAccount: data.bankAccount,
      bankAccountNumber: data.bankAccountNumber,
      password: data.password,
      userType: data.userType,
    }
    try {
      const res = await AuthApi.signUp(sendData);
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
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backArrow}
            >
              <AntDesign name="left" size={24} />
            </TouchableOpacity>
            <Text style={styles.welcomeText}>Бүртгүүлэх </Text>
            <TouchableOpacity
              style={styles.backArrow}
            >
              <AntDesign name="left" size={24} color={"white"} />
            </TouchableOpacity>
          </View>
          <SignUpForm control={control} errors={errors} getValues={getValues} />
          {errors.root?.type === 401 && (
            <Text style={styles.errorText}>
              Нэвтрэх нэр нууц үг буруу байна
            </Text>
          )}
          {errors.root?.type === 500 && (
            <Text style={styles.errorText}>
              Бүртгэлтэй хэрэглэгч байна
            </Text>
          )}

          <View style={styles.mt24} />
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={styles.loginContainer}
          >
            <Text style={styles.loginText}>Бүртгүүлэх</Text>
          </TouchableOpacity>
          <View style={styles.mt24} />
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
    backgroundColor: Colors.white,
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
  contentContainer: {
    backgroundColor: Colors.white,
  },
  welcomeText: {
    fontSize: 24,
    textAlign: "center",
  },
  forgetPasswordText: {
    flexDirection: "row",
  },
  loginContainer: {
    flex: 1,
    backgroundColor: Colors.bgs,
    marginHorizontal: 16,
    height: 50,
    borderRadius: 10,
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
  backArrow: {
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24
  }
});
