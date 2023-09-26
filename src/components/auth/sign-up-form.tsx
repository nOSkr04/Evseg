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

const SignUpForm = ({ control, errors, getValues }: Props) => {
  const navigation = useNavigation();
  const { userType } = getValues();

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
            style={[styles.input, errors.lastname && styles.errorBorder]}
            value={value}
          />
        )}
        rules={{ required: true }}
      />
      {errors.lastname && (
        <Text style={styles.errorText}>{errors.lastname.message}</Text>
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
            style={[styles.input, errors.firstname && styles.errorBorder]}
            value={value}
          />
        )}
        rules={{ required: true }}
      />
      {errors.firstname && (
        <Text style={styles.errorText}>Заавал оруулна уу</Text>
      )}
      <Text style={styles.title}>Утасны дугаар</Text>
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            keyboardType="decimal-pad"
            placeholder="Утасны дугаар"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            style={[styles.input, errors.phone && styles.errorBorder]}
            value={value}
          />
        )}
        rules={{ required: true }}
      />
      {errors.phone && (
        <Text style={styles.errorText}>Заавал оруулна уу</Text>
      )}
      <Text style={styles.title}>Регистерийн дугаар</Text>
      <View style={styles.row}>
        <Controller
          control={control}
          name="alphabet"
          render={({ field: { onChange, value = "А" } }) => (
            <TouchableOpacity style={[styles.alphabet, errors.alphabet && styles.errorBorder]}
              onPress={() => navigation.navigate(NavigationRoutes.SelectAlphabet, {
                onChange: (alphabet: string) => {
                  onChange(alphabet);
                }
              })}>
              <Text style={styles.textColor}>{value}</Text>
            </TouchableOpacity>
          )}
          rules={{ required: true }}
        />
        <Controller
          control={control}
          name="alphabet1"
          render={({ field: { onChange, value = "А" } }) => (
            <TouchableOpacity style={[styles.alphabet, errors.alphabet1 && styles.errorBorder]}
              onPress={() => navigation.navigate(NavigationRoutes.SelectAlphabet, {
                onChange: (alphabet1: string) => {
                  onChange(alphabet1);
                }
              })}>
              <Text style={styles.textColor}>{value}</Text>
            </TouchableOpacity>
          )}
          rules={{ required: true }}
        />

        <Controller
          control={control}
          name="regNumber"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              keyboardType="decimal-pad"
              placeholder="Регстер №"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              style={[styles.input, errors.regNumber && styles.errorBorder]}
              value={value}
            />
          )}
          rules={{ required: { value: true, message: "Заавал оруулна уу" }, minLength: { value: 8, message: "Регистерийн дугаараа шалгана уу" } }}
        />
      </View>
      {errors.regNumber && (
        <Text style={styles.errorText}>Заавал оруулна уу</Text>
      )}
      <Text style={styles.title}>Хэрэглэгчийн төрөл сонгох</Text>
      <Controller
        control={control}
        name="userType"
        render={({ field: { onChange, value = "Хэрэглэгчийн төрөл сонгоно уу" } }) => (
          <TouchableOpacity style={[styles.input, errors.userType && styles.errorBorder]}
            onPress={() => navigation.navigate(NavigationRoutes.SelectUserType, {
              onChange: (type: string) => {
                onChange(type)
              }
            })}
          >
            <Text style={styles.textColor}>{value}</Text>
          </TouchableOpacity>
        )}
        rules={{ required: true }}
      />
      {errors.userType && (
        <Text style={styles.errorText}>Заавал сонгоно уу</Text>
      )}
      {userType === "Жолооч" ? 
        <>
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
        </>
        : userType === "Хөтөч" ?  <>
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
      </> : null
      }
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
        rules={{ required: { value: true, message: "Заавал оруулна уу" }, minLength: { value: 8, message: "Багадаа 8-н орон байх ёстой" } }}
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

export default SignUpForm;

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
    flex: 1,
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
