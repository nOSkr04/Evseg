import { SWRConfig } from "swr";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./src/store";
import { StatusBar } from "expo-status-bar";
import { SwrProviderConfig } from "./src/providers/swr-config";
import Navigation from "./src/navigation/navigation-container";
import React from "react";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SWRConfig value={SwrProviderConfig}>
          <StatusBar style="light" />
          <SafeAreaProvider>
                <GestureHandlerRootView style={styles.container}>
                  <Navigation />
                </GestureHandlerRootView>
          </SafeAreaProvider>
        </SWRConfig>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});