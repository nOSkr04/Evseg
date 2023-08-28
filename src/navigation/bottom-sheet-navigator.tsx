import React from "react";
import { createBottomSheetNavigator } from "@th3rdwave/react-navigation-bottom-sheet";
import RootNavigator from "./root-navigator";
import { BottomSheetParamList, NavigationRoutes } from "./types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";

import { SelectBankSheet } from "../sheets/select-bank";
import { SelectAlphabet } from "../sheets/selec-alphabet";
import { SelectUserType } from "../sheets/select-user-type";
import { SelectOwnBankAccount } from "../sheets/select-own-bank-account";

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
        component={SelectBankSheet}
        name={NavigationRoutes.SelectBankSheet}
        options={{
          backdropComponent: renderBackdrop,
          snapPoints: [250],
          index: 1,
          topInset: insets.top,
        }}
      />
       <Screen
        component={SelectAlphabet}
        name={NavigationRoutes.SelectAlphabet}
        options={{
          backdropComponent: renderBackdrop,
          snapPoints: [350],
          index: 1,
          topInset: insets.top,
        }}
      />
       <Screen
        component={SelectUserType}
        name={NavigationRoutes.SelectUserType}
        options={{
          backdropComponent: renderBackdrop,
          snapPoints: [180],
          index: 1,
          topInset: insets.top,
        }}
      />
       <Screen
        component={SelectOwnBankAccount}
        name={NavigationRoutes.SelectOwnBankAccount}
        options={{
          backdropComponent: renderBackdrop,
          snapPoints: [300],
          index: 1,
          topInset: insets.top,
        }}
      />
    </Navigator>
  );
};

export { BottomSheetNavigator };
