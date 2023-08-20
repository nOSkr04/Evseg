import React from "react";
import { createBottomSheetNavigator } from "@th3rdwave/react-navigation-bottom-sheet";
import RootNavigator from "./root-navigator";
import { BottomSheetParamList, NavigationRoutes } from "./types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";

import { TestSheet } from "../sheets/test";
import { SelectBankSheet } from "../sheets/select-bank";

const BottomSheet = createBottomSheetNavigator<BottomSheetParamList>();

const BottomSheetNavigator = () => {
  const { Navigator, Screen } = BottomSheet;

  const insets = useSafeAreaInsets();

  const renderBackdrop = React.useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior={"close"}
      />
    ),
    []
  );

  return (
    <Navigator>
      <Screen component={RootNavigator} name="RootNavigator" />
      <Screen
        component={TestSheet}
        name={NavigationRoutes.TestSheet}
        options={{
          backdropComponent: renderBackdrop,
          snapPoints: [220],
          index: 1,
          topInset: insets.top,
        }}
      />
      <Screen
        component={SelectBankSheet}
        name={NavigationRoutes.SelectBankSheet}
        options={{
          backdropComponent: renderBackdrop,
          snapPoints: [250],
          index: 1,
          topInset: insets.top,
        }}
      />
    </Navigator>
  );
};

export { BottomSheetNavigator };
