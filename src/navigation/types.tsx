/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";


export enum NavigationRoutes {
  Root = "Root",
  LoginScreen = "LoginScreen",
  SignUpScreen = "SignUpScreen",
  RootNavigator = "RootStackNavigator",
  HomeScreen = "HomeScreen",
  ProfileScreen = "ProfileScreen",
  TestSheet = "TestSheet",
  SelectBankSheet = "SelectBankSheet",
  SelectAlphabet = "SelectAlphabet",
  SelectUserType = "SelectUserType",
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  LoginScreen: undefined;
  SignUpScreen: undefined;
};

export type RootTabParamList = {
  HomeScreen: undefined;
  ProfileScreen: undefined;


};

export type BottomSheetParamList = {
  RootNavigator: undefined;
  TestSheet: undefined;
  SelectBankSheet: {onChange: (bank: string) => void}
  SelectAlphabet: {onChange: (alphabet: string) => void}
  SelectUserType: {onChange: (type: string) => void}
};

// export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, Screen>;
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
export type BottomSheetScreenProps<T extends keyof BottomSheetParamList> =
  NativeStackScreenProps<BottomSheetParamList, T>;
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
    interface RootParamList extends BottomSheetParamList { }
    interface RootParamList extends RootTabParamList { }
  }
}
