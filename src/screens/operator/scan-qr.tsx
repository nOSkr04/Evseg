import { Alert, Dimensions, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo, useCallback, useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationRoutes } from "../../navigation/types";
import AntDesign from "@expo/vector-icons/AntDesign"
const {width, height} = Dimensions.get("window")

const ScanQrScreen = memo(() => {
  const [hasPermission, setHasPermission] = useState<boolean | string | null>(null);
  const [scanned, setScanned] = useState(false);
  const sf = useSafeAreaInsets();

  const navigation = useNavigation();
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);
  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    setScanned(true);
   
  };

  const top = useCallback(() => {
    return{
      paddingTop: sf.top
    }
  },[])
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={[styles.container, top()]}>
      <Pressable style={styles.backButtonContainer} onPress={() => navigation.goBack()}>
      <AntDesign name="left" color={Colors.black} size={18} />
      </Pressable>
      <View style={styles.barcodeContainer}>
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={styles.barcode} />
      </View>
      <TouchableOpacity style={styles.transactionButton} onPress={() => navigation.navigate(NavigationRoutes.OperatorScreen)}>
              <Text style={styles.registerButtonText}>Qr уншуулах</Text>
            </TouchableOpacity>
    </View>
  );
});

ScanQrScreen.displayName = "ScanQrScreen";

export default ScanQrScreen;

const styles = StyleSheet.create({
  container: {
    flex           : 1,
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  backButtonContainer:{
    padding:8,
    backgroundColor:Colors.white,
    alignSelf:"flex-start",
    marginHorizontal:25,
    marginVertical:16,
    borderRadius:4
  },
  barcodeContainer: {
    marginHorizontal: 16,
    height          : height * 0.75,
  },
  barcode: {
    width : "100%",
    height: "100%",
  },
  transactionButton: {
    marginHorizontal: 15,
    marginTop: 50,
    backgroundColor: Colors.bgs,
    height: 50,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  registerButtonText: {
    fontFamily: 'MonThin',
    textAlign: "center",
    fontSize: 16,
    color: Colors.white,
  },
});