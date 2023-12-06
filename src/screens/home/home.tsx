import { Dimensions, StyleSheet, Text, View, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import React, { memo, useCallback, useState } from "react";
import { AppBar } from "../../components/app-bar";
// import { IUser } from "../../interface/user";
import useSwr from "swr"
// import { AuthApi } from "../../api";
import { Colors } from "../../constants/colors";
// import AntDesign from "@expo/vector-icons/AntDesign";
// import { NavigationRoutes } from "../../navigation/types";
import { useNavigation } from "@react-navigation/native";
// import Animated from "react-native-reanimated";
// import QRCode from "react-native-qrcode-svg";
import { Carousel } from '../../components/carousel/carousel';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { FlatList } from "react-native-gesture-handler";
import { NavigationRoutes } from "../../navigation/types";

const { width } = Dimensions.get("screen")

const HomeScreen = memo(() => {
  // const [refreshing, setRefreshing] = useState(false);
  // const { data, mutate } = useSwr<IUser>("swr.user.me", async () => {
  //   return await AuthApi.me();
  // });

  const navigation = useNavigation();

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   mutate();
  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 1000);
  // }, []);

  // const onLightBox = useCallback(() => {
  //   navigation.navigate(NavigationRoutes.QrLightBox)
  // }, [])

  const header = useCallback(({ title }: { title: string }) => {
    return <View style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.row}>
        <Text style={styles.seeAll}>Бүгдийг</Text>
        <MaterialIcons name="arrow-forward-ios" size={14} color={Colors.black} />
      </View>
    </View>
  }, [])

  const popularItem = useCallback(() => {
    return <View style={styles.popularProductContainer}>
      <View style={styles.popularProductImage} />
      <Text style={styles.productName} numberOfLines={1}>Air Jordan XXX</Text>
      <Text style={styles.productPrice}>$140.00</Text>
    </View>
  }, [])

  const saleItem = useCallback(() => {
    return <TouchableOpacity style={styles.saleProductContainer} onPress={() => navigation.navigate(NavigationRoutes.ProductDetailScreen, { id: '' })}>
      <View style={styles.saleProductImage} />
      <Text style={styles.productName} numberOfLines={1}>Air Jordan XXX</Text>
      <Text style={styles.productPrice}>$140.00</Text>
    </TouchableOpacity>
  }, [])

  const categories = useCallback(({ name }: { name: string }) => {
    return <View style={styles.categoryContainer}>
      <Text style={styles.category}>{name}</Text>
    </View>
  }, [])

  return (
    <>
      <AppBar />
      <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
        <Carousel data={[{ "_id": "656f52aeaf09311a760de534", "blurHash": "LNP?wK_3%%McIWofRioLS*WAVro#", "url": "https://evseg.s3.ap-southeast-1.amazonaws.com/750ffa90-6b35-42be-895b-ec4847ea8dc1.jpg" }, { "_id": "656f52aeaf09311a760de535", "blurHash": "LQPP_--;%%kCs-j?tRWA9bogRPof", "url": "https://evseg.s3.ap-southeast-1.amazonaws.com/6e720ae8-3f11-447f-b098-90dd52daef47.jpg" }, { "_id": "656f52aeaf09311a760de536", "blurHash": "LeO|CS-n%%bcR:ofWBoLkYbIV?oI", "url": "https://evseg.s3.ap-southeast-1.amazonaws.com/7903a430-a62b-45ea-8342-161e94e205b8.jpg" }]} />
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.rootContainer}>
          {
            ["Shoes", "Clothes", "Fashion"].map((data) => categories({ name: data }))
          }
        </ScrollView>
        {header({ title: "Хямдарсан" })}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.rootContainer}>
          {
            [1, 2, 3].map(() => saleItem())
          }
        </ScrollView>
        {header({ title: "Борлуулалт ихтэй" })}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.rootContainer}>
          {
            [1, 2, 3].map(() => popularItem())
          }
        </ScrollView>
        <View style={{ height: 50 }} />
      </ScrollView>
    </>
  );
});

HomeScreen.displayName = "HomeScreen";

export { HomeScreen };

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  category: {
    fontFamily: "MonThin",
    fontSize: 12,
  },
  categoryContainer: {
    marginRight: 15,
    padding: 10,
    backgroundColor: Colors.white,
    marginBottom: 5,
    marginTop: 20,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.grey,
  },
  popularProductContainer: {
    width: 180,
    marginRight: 10,
  },
  popularProductImage: {
    height: 180,
    width: 180,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  saleProductImage: {
    height: 140,
    width: 140,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  saleProductContainer: {
    width: 140,
    marginRight: 10,
  },
  title: {
    marginVertical: 10,
    fontSize: 20,
    fontFamily: "MonSemiBold",
  },
  productName: {
    marginTop: 5,
    fontFamily: "MonThin",
    fontSize: 13,
  },
  productPrice: {
    marginTop: 5,
    fontFamily: "MonSemiBold",
    fontSize: 13,
  },
  rootContainer: {
    paddingHorizontal: 10,
  },
  root: {
    flex: 1,
    backgroundColor: Colors.bg
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
  titleContainer: {
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  seeAll: {
    marginRight: 3,
    fontFamily: "MonThin",
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


{/* <ScrollView style={styles.root} refreshControl={
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
        {data?.userType === "CUSTOMER" ?
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
    {data?.userType !== "CUSTOMER" &&
      <TouchableOpacity style={styles.transactionButton} onPress={() => navigation.navigate(NavigationRoutes.Transaction)}>
        <AntDesign name="arrowright" color={Colors.transparent} size={16} />
        <Text style={styles.registerButtonText}>Гүйлгээ хийх</Text>
        <AntDesign name="arrowright" color={Colors.white} size={16} />
      </TouchableOpacity>
    }
  </View>
</ScrollView>  */}