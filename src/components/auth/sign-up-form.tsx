import { StyleSheet, TextInput, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Colors } from "../../constants/colors";
import Checkbox from "../check-box";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation/types";

export type IFormData = {
  lastname: string;
  firstname: string;
  password: string;
  name: string;
  regNumber: string;
  bankAccountNumber: string;
  bankAccount: string;
};

type Props = {
  control: Control<IFormData, any>;
  errors: FieldErrors<{
    name: string;
    password: string;
  }>;
};

const SignUpForm = ({ control, errors }: Props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Овог</Text>
      <Controller
        control={control}
        name="lastname"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Овог"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            style={styles.input}
            value={value}
          />
        )}
        rules={{ required: true }}
      />
      {errors.name && (
        <Text style={styles.errorText}>Заавал оруулна уу</Text>
      )}
      <Text style={styles.title}>Нэр</Text>
      <Controller
        control={control}
        name="firstname"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Нэр"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            style={styles.input}
            value={value}
          />
        )}
        rules={{ required: true }}
      />
      {errors.name && (
        <Text style={styles.errorText}>Заавал оруулна уу</Text>
      )}
      <Text style={styles.title}>Регистерийн дугаар</Text>
      <Controller
        control={control}
        name="regNumber"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Регстер №"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            style={styles.input}
            value={value}
          />
        )}
        rules={{ required: true }}
      />
      {errors.name && (
        <Text style={styles.errorText}>Заавал оруулна уу</Text>
      )}
      <Text style={styles.title}>Банк</Text>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value = "Банк сонгоно уу" } }) => (
          <TouchableOpacity style={styles.input}
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
      {errors.name && (
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
            style={styles.input}
            value={value}
          />
        )}
        rules={{ required: true }}
      />
      {errors.name && (
        <Text style={styles.errorText}>Заавал оруулна уу</Text>
      )}
      <Text style={styles.title}>Шинэ нууц үг</Text>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Шинэ нууц үг"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            secureTextEntry
            style={styles.input}
            value={value}
          />
        )}
        rules={{ required: true }}
      />
      {errors.password && (
        <Text style={styles.errorText}>Заавал оруулна уу</Text>
      )}
      <Text style={styles.title}>Нууц үгээ давтан оруулна уу</Text>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Нууц үгээ давтан оруулна уу"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            secureTextEntry
            style={styles.input}
            value={value}
          />
        )}
        rules={{ required: true }}
      />
      {errors.password && (
        <Text style={styles.errorText}>Заавал оруулна уу</Text>
      )}

    </View>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({
  textColor:{
    color: Colors.grey,
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
