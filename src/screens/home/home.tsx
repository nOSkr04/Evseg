import { Button, Dimensions, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { AppBar } from "../../components/app-bar";
import { IUser } from "../../interface/user";
import useSwr from "swr"
import { AuthApi } from "../../api";
import { useDispatch } from "react-redux";
import { authLogout } from "../../store/auth-slice";
import { Colors } from "../../constants/colors";
import { Image } from "expo-image";
import { FontAwesome } from '@expo/vector-icons';
const { width } = Dimensions.get("screen")

const HomeScreen = memo(() => {
  const dispatch = useDispatch();
  const { data } = useSwr<IUser>("swr.user.me", async () => {
    return await AuthApi.me();
  });

  return (
    <>
      {/* <AppBar fullname={`${data?.lastName} ${data?.firstName}`} /> */}
      <AppBar fullname={"Пүрэвдорж жаргал"} />
      <View style={styles.container}>
        <Image source={`https://cdn.ttgtmedia.com/rms/misc/qr_code_barcode.jpg`} style={styles.qrCode} contentFit="contain" />
        <View style={styles.userContainer}>
          <View style={styles.pointContainer}>
            <Text style={styles.point}>10000₮</Text>
            <FontAwesome name="refresh" size={24} color={Colors.white} />
          </View>
        </View>
      </View>
    </>
  );
});

HomeScreen.displayName = "HomeScreen";

export { HomeScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  qrCode: {
    width: width * 0.9,
    alignSelf: "center",
    height: 300,
    marginVertical: 24
  },
  userContainer: {
    paddingVertical: 12,
    backgroundColor: Colors.bgs,
    marginHorizontal: 16,
    borderRadius:12
  },
  pointContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal:24
  },
  point:{
    color:Colors.white,
    fontSize:24,
    fontWeight:"bold"

  }
});
