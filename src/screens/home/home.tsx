import { Dimensions, StyleSheet, Text, View, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import React, { memo, useCallback, useState } from "react";
import { AppBar } from "../../components/app-bar";
import { IUser } from "../../interface/user";
import useSwr from "swr"
import { AuthApi } from "../../api";
import { Colors } from "../../constants/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { NavigationRoutes } from "../../navigation/types";
import { useNavigation } from "@react-navigation/native";
import Animated  from "react-native-reanimated";
import QRCode from "react-native-qrcode-svg";

const { width } = Dimensions.get("screen")

const HomeScreen = memo(() => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, mutate } = useSwr<IUser>("swr.user.me", async () => {
    return await AuthApi.me();
  });
  const navigation = useNavigation();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    mutate();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const onLightBox = useCallback(() => {
    navigation.navigate(NavigationRoutes.QrLightBox)
  }, [])

  return (
    <>
      <AppBar />
      <ScrollView style={styles.root} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Animated.Text style={styles.scanMe} sharedTransitionTag="qrTitle">QR УНШУУЛАХ</Animated.Text>
        <View style={styles.container}>
          <View style={styles.qrContainer}>
            <TouchableOpacity onPress={onLightBox} style={styles.qrContent} >
              <Animated.View sharedTransitionTag="userQrCode"  >
                <QRCode logoBackgroundColor={Colors.white} size={280} value={data?._id} />
              </Animated.View>
            </TouchableOpacity>
            <View style={styles.ticketLine}>
              <View style={styles.leftPoint} />
              <View>
                <View style={styles.dotBorder} />
              </View>
              <View style={styles.rightPoint} />
            </View>
            <View style={styles.pointContainer} >
              {data?.userType === "Хэрэглэгч" ?
                <>
                  <Text style={styles.point1}>Эпойнт: </Text>
                  <Text style={styles.point}>
                    {data?.bonusAmount && data?.bonusAmount.toLocaleString()}
                  </Text>
                </>
                :
                <>
                  <Text style={styles.point1}>Урамшуулалын дүн: </Text>
                  <Text style={styles.point}>
                    {data?.bonusAmount && data?.bonusAmount.toLocaleString()} ₮
                  </Text>
                </>
              }
            </View>
          </View>
          {data?.userType !== "Хэрэглэгч" &&
            <TouchableOpacity style={styles.transactionButton} onPress={() => navigation.navigate(NavigationRoutes.Transaction)}>
              <AntDesign name="arrowright" color={Colors.transparent} size={16} />
              <Text style={styles.registerButtonText}>Гүйлгээ хийх</Text>
              <AntDesign name="arrowright" color={Colors.white} size={16} />
            </TouchableOpacity>
          }
        </View>
      </ScrollView>
    </>
  );
});

HomeScreen.displayName = "HomeScreen";

export { HomeScreen };

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.bg
  },
  totalAmoungContainer: {
    textAlign: 'center',
  },
  registerButtonText: {
    fontFamily: 'MonThin',
    textAlign: "center",
    fontSize: 16,
    color: Colors.white,
  },
  transactionButton: {
    marginHorizontal: 15,
    marginTop: 50,
    backgroundColor: Colors.bgs,
    height: 50,
    borderRadius: 10,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingHorizontal: 25,
    alignItems: "center",
  },
  scanMe: {
    fontFamily: 'MonMedium',
    marginTop: 20,
    textAlign: 'center',
    fontSize: 25,
  },
  description: {
    fontSize: 16,
  },
  dot: {
    marginHorizontal: 10,
    height: 7,
    width: 7,
    borderRadius: 100,
    backgroundColor: Colors.black,
  },
  container: {
    paddingHorizontal: 15,
    flex: 1,
    backgroundColor: Colors.bg,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  qrContainer: {
    marginTop: 20,
    marginHorizontal: 15,
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  row: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  divider: {
    width: '100%',
    height: 1.2,
    marginVertical: 10,
    backgroundColor: Colors.black,
  },
  qrCode: {
    width: width * 0.6,
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
    marginHorizontal: 15,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderRadius: 12
  },
  point1: {
    fontFamily: 'MonThin',
    textAlign: 'center',
    color: Colors.grey,
    fontSize: 15,
  },
  point: {
    fontFamily: 'MonThin',
    textAlign: 'center',
    color: Colors.black,
    fontSize: 30,
  },
  dotBorder: {
    borderWidth: 1,
    borderStyle: "dashed",
    width: width - 100,
    borderColor: Colors.lightGrey
  },
  ticketLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rightPoint: {
    width: 20,
    height: 20,
    borderRadius: 100,
    backgroundColor: Colors.lightGrey,
    left: 10
  },
  leftPoint: {
    width: 20,
    height: 20,
    borderRadius: 100,
    backgroundColor: Colors.lightGrey,
    right: 10
  },
  pointContainer: {
    marginTop: 10,
    marginBottom: 24
  },
  qrContent: {
    alignSelf: "center",
    marginVertical: 12
  }
});
