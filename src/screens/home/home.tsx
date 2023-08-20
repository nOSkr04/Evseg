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
        <View style={styles.qrContainer}>
         <Image source={`https://cdn.ttgtmedia.com/rms/misc/qr_code_barcode.jpg`} style={styles.qrCode} contentFit="contain" />
        </View>
        <View style={styles.userContainer}>
          <View style={styles.row}>
            <View style={styles.dot}/>
            <Text style={styles.description}>Таны урамшуулал</Text>
          </View>
          <View style={styles.divider}/>
          <View style={styles.pointContainer}>
            <View >
              <Text style={styles.point1}>Нийт дүн: </Text>
              <Text style={styles.point}>₮ 10000</Text>
            </View>
            <FontAwesome name="refresh" size={24} color={Colors.black} />
          </View>
        </View>
      </View>
    </>
  );
});

HomeScreen.displayName = "HomeScreen";

export { HomeScreen };

const styles = StyleSheet.create({
  description:{
    fontSize: 16,
  },
  dot:{
    marginHorizontal: 10,
    height: 7,
    width: 7,
    borderRadius: 100,
    backgroundColor: Colors.black,
  },
  container: {
    paddingHorizontal: 15,
    flex: 1,
    backgroundColor: Colors.lightGrey,
    marginTop: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  qrContainer:{
    shadowColor: Colors.black,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  row:{
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  divider:{
    width: '100%',
    height: 1.2,
    marginVertical: 10,
    backgroundColor: Colors.black,
  },
  qrCode: {
    width: width * 0.9,
    alignSelf: "center",
    height: 300,
    marginVertical: 24
  },
  userContainer: {
    paddingHorizontal: 15,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    paddingVertical: 12,
    marginTop: 10,
    backgroundColor: Colors.white,
    borderRadius:12
  },
  pointContainer:{
    marginBottom: 20,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingRight: 15,
  },
  point1:{
    marginVertical: 15,
    color:Colors.grey,
    fontSize:20,
  },
  point:{
    color:Colors.black,
    fontSize:25,
  }
});
