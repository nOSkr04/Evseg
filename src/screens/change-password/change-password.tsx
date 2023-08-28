import { StyleSheet, Text, View } from 'react-native'
import React, {memo} from 'react'
import { AppBar } from '../../components/app-bar'
import { Colors } from '../../constants/colors'
import ChangePasswordForm, { IFormData } from '../../components/auth/change-password-form'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ChangePassword = memo(() => {
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
    navigation.goBack()
    const sendData = {
      oldPassword: data.oldPassword,
      password: data.password,
    }

    try {
      // const res = await AuthApi.signUp(sendData);
      // dispatch(authLogin(res));
    
    } catch (err: any) {
      setError("root", {
        type: err.statusCode,
      });
    }
  };
  return (
    <View style={styles.root}>
      <AppBar leading title='Нууц үг солих'/>
      <ChangePasswordForm control={control} errors={errors} getValues={getValues}/>
      <View style={styles.h50}/>
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
         <Text style={styles.buttonText}>Солих</Text>
      </TouchableOpacity>
    </View>
  )
})

export {ChangePassword}

const styles = StyleSheet.create({
    root:{
        flex: 1,
        backgroundColor: Colors.white,
    },
    h50:{
      height: 50,
    },
    buttonText:{
      fontFamily: 'MonThin',
      fontSize: 16,
      color: Colors.white,
    },
    button:{
      marginHorizontal: 15,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.bgs,
      borderRadius: 10,
    },
})