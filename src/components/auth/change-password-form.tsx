import { StyleSheet, TextInput, View, Text } from "react-native";
import React from "react";
import { Control, Controller, FieldErrors, UseFormGetValues } from "react-hook-form";
import { Colors } from "../../constants/colors";

export type IFormData = {
  passwordVerify: string;
  password: string;
  oldPassword: string;
};

type Props = {
  control: Control<IFormData, any>;
  errors: FieldErrors<{
    passwordVerify: string;
    password: string;
    oldPassword: string;
  }>;
  getValues: UseFormGetValues<IFormData>
};

const ChangePasswordForm = ({ control, errors, getValues }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Хуучин нууц үг</Text>
      <Controller
        control={control}
        name="oldPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Нууц үг"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            secureTextEntry
            style={[styles.input, errors.password && styles.errorBorder]}
            value={value}
          />
        )}
      />
      {errors.password && (
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
            style={[styles.input, errors.password && styles.errorBorder]}
            value={value}
          />
        )}
        rules={{ required: {value: true, message: "Заавал оруулна уу"}, minLength: {value: 8, message: "Багадаа 8-н орон байх ёстой"} }}
      />
      {errors.password && (
        <Text style={styles.errorText}>Заавал оруулна уу</Text>
      )}
      <Text style={styles.title}>Нууц үгээ давтан оруулна уу</Text>
      <Controller
        control={control}
        name="passwordVerify"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Нууц үгээ давтан оруулна уу"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            secureTextEntry
            style={[styles.input, errors.passwordVerify && styles.errorBorder]}
            value={value}
          />
        )}
        rules={{
          required: { message: "Заавал оруулна уу", value: true },
          validate: (value) => {
            const { password } = getValues();
            return value === password || "Нууц үг таарахгүй байна"
          }

        }}
      />
      {errors.passwordVerify && (
        <Text style={styles.errorText}>{errors.passwordVerify.message}</Text>
      )}
    </View>
  );
};

export default ChangePasswordForm;

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
  errorBorder: {
    borderWidth: 1,
    borderColor: Colors.danger,
  },
  errorText: {
    color: Colors.danger,
    fontSize: 12,
    marginBottom: 5,
    textAlign: "right",
    marginRight: 16,
  },
});
