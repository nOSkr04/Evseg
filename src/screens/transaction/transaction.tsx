import { StyleSheet, Text, View } from 'react-native'
import React, {memo} from 'react'
import { AppBar } from '../../components/app-bar'
import TransactionForm, { IFormData } from '../../components/auth/transaction-form'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import { Colors } from '../../constants/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Transaction = memo(() => {
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
        bank: data.bank,
        amount: data.amount,
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
      <AppBar leading title='Гүйлгээ хийх'/>
      <TransactionForm control={control} getValues={getValues} errors={errors}/>
      <View style={styles.h50} />
      <TouchableOpacity style={styles.button}>
         <Text style={styles.buttonText}>Гүйлгээ хийх</Text>
      </TouchableOpacity>
    </View>
  )
})

export {Transaction}

const styles = StyleSheet.create({
    root:{
        backgroundColor: Colors.white,
        flex: 1,
    },
    button:{
        height: 50,
        backgroundColor: Colors.bgs,
        marginHorizontal: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    h50:{
        height: 50,
    },
    buttonText:{
        fontFamily: "MonMedium",
        color: Colors.white,
    },
})