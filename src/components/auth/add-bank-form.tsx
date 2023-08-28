import { StyleSheet, TextInput, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Control, Controller, FieldErrors, UseFormGetValues, UseFormSetError } from "react-hook-form";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation/types";

export type IFormData = {
  lastname: string,
  firstname: string,
  password: string,
  name: string,
  passwordVerify: string,
  regNumber: string,
  bankAccountNumber: string,
  bankAccount: string,
  alphabet: string,
  alphabet1: string,
  phone: string,
  userType: string,
};

type Props = {
  control: Control<IFormData, any>;
  errors: FieldErrors<{
    lastname: string,
    firstname: string,
    password: string,
    name: string,
    regNumber: string,
    bankAccountNumber: string,
    bankAccount: string,
    alphabet: string,
    alphabet1: string,
    passwordVerify: string,
    phone: string,
    userType: string,
  }>;
  getValues: UseFormGetValues<IFormData>
};

const AddBankForm = ({ control, errors, getValues }: Props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Банк</Text>
      <Controller
        control={control}
        name="bankAccount"
        render={({ field: { onChange, value = "Банк сонгоно уу" } }) => (
          <TouchableOpacity style={[styles.input, errors.bankAccount && styles.errorBorder]}
            onPress={() => navigation.navigate(NavigationRoutes.SelectBankSheet, {
              onChange: (bank: string) => {
                onChange(bank)
              }
            })}
          >
            <Text style={styles.textColor}>{value}</Text>
          </TouchableOpacity>
        )}
        rules={{ required: true }}
      />
      {errors.bankAccount && (
        <Text style={styles.errorText}>Заавал оруулна уу</Text>
      )}
      <Text style={styles.title}>Дансны дугаар</Text>
      <Controller
        control={control}
        name="bankAccountNumber"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Дансны дугаар"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            style={[styles.input, errors.bankAccountNumber && styles.errorBorder]}
            value={value}
          />
        )}
        rules={{ required: true }}
      />
      {errors.regNumber && (
        <Text style={styles.errorText}>Заавал оруулна уу</Text>
      )}
    </View>
  );
};

export default AddBankForm;

const styles = StyleSheet.create({
  textColor: {
    color: Colors.grey,
  },
  row: {
    flexDirection: 'row',
  },
  errorBorder: {
    borderWidth: 1,
    borderColor: Colors.danger,
  },
  input: {
    marginHorizontal: 15,
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: Colors.lightGrey,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  title: {
    marginHorizontal: 15,
    marginBottom: 5,
    color: Colors.black,
  },
  container: {
  },
  errorText: {
    color: Colors.danger,
    fontSize: 12,
    marginBottom: 5,
    textAlign: "right",
    marginRight: 16,
  },
});
