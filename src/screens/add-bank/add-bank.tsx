import { StyleSheet, Text, View } from 'react-native'
import React, {memo} from 'react'
import { AppBar } from '../../components/app-bar';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import AddBankForm, { IFormData } from '../../components/auth/add-bank-form';
import { Colors } from '../../constants/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AddBank = memo(() => {
    const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    getValues
  } = useForm<IFormData>();

  const onSubmit = async (data: IFormData) => {
    const sendData = {
      firstName: data.firstname,
      regNumber: `${data.alphabet}${data.alphabet1}${data.regNumber}`,
      phone: data.phone,
      lastName: data.lastname,
      bankAccount: data.bankAccount,
      bankAccountNumber: data.bankAccountNumber,
      password: data.password,
      userType: data.userType,
    }
    try {
    //   const res = await AuthApi.signUp(sendData);
    //   dispatch(authLogin(res));
    } catch (err: any) {
      setError("root", {
        type: err.statusCode,
      });
    }
  };
  return (
    <View style={styles.root}>
      <AppBar leading title='Данс нэмэх'/>
      <View style={styles.h50}/>
      <AddBankForm control={control} errors={errors} getValues={getValues}/>
      <View style={styles.h50}/>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
         <Text style={styles.buttonText}>Нэмэх</Text>
      </TouchableOpacity>
    </View>
  )
});

export {AddBank}

const styles = StyleSheet.create({
    root:{
        flex: 1,
        backgroundColor: Colors.white,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 16,
        fontFamily: 'MonMedium',
    },
    button:{
        marginHorizontal: 15,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: Colors.bgs,
    },
    h50:{
        height: 50,
    },
})