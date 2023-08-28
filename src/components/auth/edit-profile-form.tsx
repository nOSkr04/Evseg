import { StyleSheet, TextInput, View, Text } from "react-native";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Colors } from "../../constants/colors";
import useSwr from "swr"
import { IUser } from "../../interface/user";
export type IEditForm = {
  email: string;
  lastName: string;
  firstName: string;
};

type Props = {
  control: Control<IEditForm, any>;
  errors: FieldErrors<{
    email: string;
    lastName: string;
    firstName: string;
  }>;
};

const EditProfileForm = ({ control, errors }: Props) => {
  const { data: user } = useSwr<IUser>("swr.user.me")
  return (
    <View style={styles.container}>
      <Text style={styles.title}>И-мэйл</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder={user?.email ? user?.email: "И мэйл хаяг оруулна уу"}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            style={styles.input}
            value={value}
          />
        )}
        rules={{ required: true }}
      />
      {errors.email && (
        <Text style={styles.errorText}>Заавал оруулна уу</Text>
      )}
      <Text style={styles.title}>Овог</Text>
      <Controller
        control={control}
        name="lastName"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder={"Овог"}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            style={styles.input}
            value={value}
          />
        )}
        rules={{ required: true }}
      />
      {errors.lastName && (
        <Text style={styles.errorText}>Заавал оруулна уу</Text>
      )}
      <Text style={styles.title}>Нэр</Text>
      <Controller
        control={control}
        name="firstName"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder={"Нэр"}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            style={styles.input}
            value={value}
          />
        )}
        rules={{ required: true }}
      />
      {errors.firstName && (
        <Text style={styles.errorText}>Заавал оруулна уу</Text>
      )}
    </View>
  );
};

export default EditProfileForm;

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
