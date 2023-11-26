import { Alert, Dimensions, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo, useCallback, useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationRoutes } from "../../navigation/types";
import AntDesign from "@expo/vector-icons/AntDesign"
const { width, height } = Dimensions.get("window")

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
    return {
      top: sf.top + 30
    }
  }, [])
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={[styles.container,]}>
      <Pressable style={[styles.backButtonContainer, top()]} onPress={() => navigation.goBack()}>
        <AntDesign name="left" color={Colors.black} size={18} />
      </Pressable>
      <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />
      <View style={[StyleSheet.absoluteFill]}>
        <View style={[styles.scanOverlay, { top: 0, left: 0, width: '25%', bottom: 0 }]} />
        <View style={[styles.scanOverlay, { top: 0, left: '25%', right: '25%', height: '38%' }]} />
        <View style={[styles.scanOverlay, { bottom: 0, left: '25%', right: '25%', height: '38%' }]} />
        <View style={[styles.scanOverlay, { top: 0, right: 0, width: '25%', bottom: 0 }]} />
      </View>
      
    
    </View>
  );
});

ScanQrScreen.displayName = "ScanQrScreen";

export default ScanQrScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  scanOverlay: {
    position: 'absolute',
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  backButtonContainer: {
    padding: 8,
    backgroundColor: Colors.white,
    alignSelf: "flex-start",
    borderRadius: 4,
    position: "absolute",
    left: 10,
    zIndex: 2
  },
  barcodeContainer: {
    flex: 1
  },
  barcode: {
    width: "100%",
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