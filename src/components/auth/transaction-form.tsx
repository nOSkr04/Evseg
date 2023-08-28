import { StyleSheet, TextInput, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Control, Controller, FieldErrors, UseFormGetValues, UseFormSetError } from "react-hook-form";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation/types";

export type IFormData = {
  
  bank: string,
  amount: string,

};

type Props = {
  control: Control<IFormData, any>;
  errors: FieldErrors<{
    bank: string,
    amount: string,
  }>;
  getValues: UseFormGetValues<IFormData>
};

const TransactionForm = ({ control, errors, getValues }: Props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Данс сонгох</Text>
      <Controller
        control={control}
        name="amount"
        render={({ field: { onChange, value = "Данс сонгоно уу" } }) => (
          <TouchableOpacity style={[styles.input, errors.amount && styles.errorBorder]}
            onPress={() => navigation.navigate(NavigationRoutes.SelectOwnBankAccount, {
              onChange: (bank: string, accountNumber: number, img :string) => {
                onChange(img, bank, accountNumber)
              }
            })}
          >
            <Text style={styles.textColor}>{value}</Text>
          </TouchableOpacity>
        )}
        rules={{ required: true }}
      />
      {errors.amount && (
        <Text style={styles.errorText}>Заавал оруулна уу</Text>
      )}
      <Text style={styles.title}>Дансны дугаар</Text>
      <Controller
        control={control}
        name="bank"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Дансны дугаар"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            style={[styles.input, errors.bank && styles.errorBorder]}
            value={value}
          />
        )}
        rules={{ required: true }}
      />
    </View>
  );
};

export default TransactionForm;

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
  alphabet: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    backgroundColor: Colors.lightGrey,
    height: 50,
    width: 50,
    borderRadius: 10,
  },
  input: {
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: Colors.lightGrey,
    height: 50,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 5,
    color: Colors.black,
  },
  container: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  errorText: {
    color: Colors.danger,
    fontSize: 12,
    marginBottom: 5,
    textAlign: "right",
    marginRight: 16,
  },
});
