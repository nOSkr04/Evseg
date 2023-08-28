import { StyleSheet, Text, View,ScrollView } from 'react-native'
import React, { memo } from 'react'
import { AppBar } from '../../components/app-bar'
import { Colors } from '../../constants/colors'
import EditProfileForm, { IEditForm,  } from '../../components/auth/edit-profile-form'
import { useForm } from 'react-hook-form'
import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import { AuthApi } from '../../api'
import useSwr, { useSWRConfig } from "swr"
import { IUser } from '../../interface/user'
const EditProfile = memo(() => {
  const {mutate} = useSWRConfig()
  const { data: user } = useSwr<IUser>("swr.user.me")
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<IEditForm>({
    defaultValues: {
      email: user!.email,
      lastName: user!.lastName,
      firstName: user!.firstName,
    }
  });
 
  const onSubmit = async (data: IEditForm) => {
    try {
      await AuthApi.editProfile({data, id: user!._id });
      navigation.goBack();
      mutate("swr.user.me")
    } catch (err: any) {
      setError("root", {
        type: err.statusCode,
      });
    }
  };
  const navigation = useNavigation();
  return (
    <View >
      <ScrollView>
        <AppBar leading title='Тохиргоо' />
        <View>
          <View style={styles.circleAvatar} />
          <Text style={styles.username}>{user?.lastName} {user?.firstName}</Text>
          <Text style={styles.userType}>{user?.userType}</Text>
        </View>
        <View style={styles.formContainer}>
          <EditProfileForm control={control} errors={errors}/>
        </View>
        <TouchableOpacity style={styles.button}  onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Солих</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
})

export { EditProfile }

const styles = StyleSheet.create({
  input:{
    marginHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: Colors.lightGrey,
    height: 50,
    paddingLeft: 10,
  },
  buttonText:{
    color: Colors.white,
    fontSize: 15,
    fontFamily: 'MonThin',
  },
  button:{
    marginTop: 50,
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 50,
    backgroundColor: Colors.bgs,
  },
  formContainer:{
    marginTop: 50,
  },
  circleAvatar: {
    marginTop: 50,
    alignSelf: 'center',
    height: 80,
    width: 80,
    borderRadius: 100,
    backgroundColor: Colors.border,
  },
  username:{
    marginTop: 10,
    fontSize: 17,
    fontFamily: "MonSemiBold",
    textAlign: 'center',
  },
  userType: {
    textAlign: 'center',
    fontFamily: 'MonThin',
  },
})