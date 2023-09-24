import {  StyleSheet, TouchableOpacity, View, Text, ScrollView } from "react-native";
import React, { memo,  } from "react";
import { AuthApi } from "../../api";
import AntDesign from "@expo/vector-icons/AntDesign";
import IonIcons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { Colors } from "../../constants/colors";
import { useDispatch } from "react-redux";
import { authLogout } from "../../store/auth-slice";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import useSwr from "swr"
import { IUser } from "../../interface/user";
import { NavigationRoutes } from "../../navigation/types";
import { AppBar } from "../../components/app-bar";
import Feather from '@expo/vector-icons/Feather';
import { Image } from "expo-image";

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
  console.log(data)
  return (
    <ScrollView style={styles.root}>
      <AppBar title="Миний мэдээлэл" />
      <TouchableOpacity style={styles.profile} onPress={() => navigation.navigate(NavigationRoutes.EditProfile)}>
        <View style={styles.option}>
          {/* <View style={styles.circleAvatar} /> */}
          <Image source={require("../../../assets/logo.png")} style={styles.circleAvatar}  contentFit="cover"  />
          <View >
            <Text style={styles.profileName}>{data?.lastName} {data?.firstName}</Text>
            <Text style={styles.userType}>{data?.userType}</Text>
          </View>
        </View>
        <Feather name="edit" size={24} color={Colors.grey} />
      </TouchableOpacity>
      <View style={styles.account}>
        <Text style={styles.description}>Мэдээлэл</Text>
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate(NavigationRoutes.AddBank)}>
          <View style={styles.passwordChangeContainer}>
            <IonIcons name="md-card" size={24} color={Colors.white} />
          </View>
          <Text style={styles.setting}>
            Данс нэмэх 
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate(NavigationRoutes.TransactionHistory)}>
          <View style={styles.passwordChangeContainer}>
            <MaterialCommunityIcons name="bank" size={24} color={Colors.white} />
          </View>
          <Text style={styles.setting}>
            Гүйлгээний түүх
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate(NavigationRoutes.ChangePassword)}>
          <View style={styles.passwordChangeContainer}>
            <Entypo name="key" size={24} color={Colors.white} />
          </View>
          <Text style={styles.setting}>
            Нууц үг солих
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.account}>
        <Text style={styles.description}>Аккаунт удирдлага</Text>
        <TouchableOpacity style={styles.logoutContainer}>
          <Text style={styles.call}>
            Холбоо барих
          </Text>
          <IonIcons name="call" size={16} color={Colors.grey}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutContainer} onPress={logout}>
          <Text style={styles.deleteAccountText}>Бүртгэл устгах</Text>
          <AntDesign name="deleteuser" color={Colors.blue} size={16} />
        </TouchableOpacity>
        <TouchableOpacity onPress={logout} style={styles.logoutContainer}>
          <Text style={styles.logoutText}>Гарах</Text>
          <AntDesign name="logout" color={Colors.danger} size={16} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
});

ProfileScreen.displayName = "ProfileScreen";

export { ProfileScreen };

const styles = StyleSheet.create({
  passwordChangeContainer: {
    marginRight: 10,
    backgroundColor: Colors.grey,
    height: 50,
    width: 50,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  account: {
    marginHorizontal: 15,
    marginTop: 60,
  },
  setting: {
    fontFamily: 'MonSemiBold',
    fontSize: 16,
  },
  userType: {
    fontFamily: 'MonThin',
  },
  description: {
    fontFamily: 'MonThin',
    color: Colors.grey,
  },
  circleAvatar: {
    marginRight: 15,
    height: 80,
    width: 80,
    borderRadius: 100,
  },
  profileName: {
    fontSize: 17,
    fontFamily: "MonSemiBold"
  },
  deleteAccountText: {
    fontSize: 18,
    fontFamily: 'MonMedium',
    color: Colors.blue,
  },
  call: {
    fontSize: 18,
    fontFamily: 'MonMedium',
    color: Colors.grey,
  },
  profile: {
    marginHorizontal: 15,
    marginTop: 60,
    justifyContent: 'space-between',
    gap: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    fontFamily: 'MonMedium',
    fontSize: 20,
    textAlign: 'center',
  },
  logoutText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: 'MonMedium',
    color: Colors.danger,
  },
  deleteAccount: {
    textAlign: 'right',
    fontSize: 15,
    marginTop: 15,
  },
  logoutContainer: {
    gap: 5,
    flexDirection: 'row',
    alignItems: "center",
    marginTop: 15,
  },
  container: {
    marginVertical: 8,
    // shadowColor: Colors.black,
    // shadowOffset: {
    //   width: 2,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
    // gap: 10,
    // paddingLeft: 15,
    // height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    // backgroundColor: Colors.white,
  },
  userName: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 24,
    justifyContent: 'center',
  },
  root: {
    backgroundColor:Colors.bg,

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
