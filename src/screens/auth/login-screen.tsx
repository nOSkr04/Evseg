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
         <View>
           <Text style={styles.logoText}>EVSEG</Text>
           <View style={styles.divider}/>
           <Text style={styles.logoText1}>Mongolian Premium Cashmere</Text>
         </View>
          <LoginForm control={control} errors={errors} />
          {errors.root?.type === 401 && (
            <Text style={styles.errorText}>
              Нэвтрэх нэр нууц үг буруу байна
            </Text>
          )}
          {/* <View style={styles.mt24} /> */}
          <View>
           <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={styles.loginContainer}
           >
            <Text style={styles.loginText}>Нэвтрэх</Text>
           </TouchableOpacity>
           <View style={styles.row}>
            <Text style={styles.registerText}>
            Бүртгэл байхгүй юу ? 
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate(NavigationRoutes.SignUpScreen)}>
              <Text style={styles.registerButtonText}>  БҮРТГҮҮЛЭХ</Text>
            </TouchableOpacity>
           </View>
           {/* <TouchableOpacity
            onPress={() => navigation.navigate(NavigationRoutes.SignUpScreen)}
            style={[styles.loginContainer, styles.registerContainer]}
           >
            <Text style={styles.loginText}>Бүртгүүлэх</Text>
          </TouchableOpacity> */}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
});

LoginScreen.displayName = "LoginScreen";

export { LoginScreen };

const styles = StyleSheet.create({
  row:{
    alignItems: 'center',
    justifyContent:'center',
    flexDirection: 'row',
  },
  root: {
    flex: 1,
  },
  logoText1:{
    color: Colors.bgs,
    textAlign: 'center',
    fontSize: 13,
  },
  divider:{
    marginVertical: 5,
    width: 190,
    alignSelf: 'center',
    height: 2,
    backgroundColor: Colors.bgs,
  },
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  logoText:{
    marginTop: 100,
    fontSize: 60,
    fontWeight: '400',
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
    height: Dimensions.get('window').height,
    justifyContent: 'space-evenly',
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
    backgroundColor: Colors.bgs,
    height: 50,
    marginHorizontal: 16,
    borderRadius: 10,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: Colors.white,
  },
  registerContainer: {
    marginBottom: 50,
  },
  registerText: {
    textAlign: "center",
    marginVertical: 10,
    color: Colors.grey,
  },
  registerButtonText: {
    textAlign: "center",
    color: 'black',
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
