import { StyleSheet, TextInput, View, Text } from "react-native";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Colors } from "../../constants/colors";

export type IFormData = {
  name: string;
  password: string;
};

type Props = {
  control: Control<IFormData, any>;
  errors: FieldErrors<{
    name: string;
    password: string;
  }>;
};

const LoginForm = ({ control, errors }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Нэвтрэх нэр</Text>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Нэвтрэх нэр"
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
      <Text style={styles.title}>Нууц үг</Text>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Нууц үг"
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

export default LoginForm;

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: Colors.lightGrey,
    height: 50,
    paddingLeft: 10,
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
