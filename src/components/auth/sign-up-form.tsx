import { StyleSheet, TextInput, View,Text } from "react-native";
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

const SignUpForm = ({ control, errors }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Бүртгүүлэх нэр</Text>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
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
      <Text style={styles.title}>Пин код (4 оронтой тоо):</Text>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
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
  input: {
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    height: 40,
    paddingLeft: 10,
  },
  title: {
    marginBottom: 5,
    paddingLeft: 10,
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
