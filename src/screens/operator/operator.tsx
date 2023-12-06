import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { AppBar } from '../../components/app-bar'
import { Colors } from '../../constants/colors'
import useSWR from 'swr'
import { IUser } from '../../interface/user'
import { AuthApi } from '../../api'
import { useNavigation } from '@react-navigation/native'
import { NavigationRoutes } from '../../navigation/types'
import { useDispatch } from 'react-redux'
import { authLogout } from '../../store/auth-slice'

const OperatorScreen = memo(() => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const { data } = useSWR<IUser>("swr.user.me", async () => {
        return await AuthApi.me();
    });

    const logout = async () => {
        try {
          await AuthApi.logout();
          dispatch(authLogout());
        } catch (err) {
          console.log(err);
        }
      };
    return (
        <>
            <AppBar />
            <View style={styles.container}>
                <Text style={styles.title}>{data?.lastName} {data?.firstName} - </Text>
                <Text style={styles.storeTitle}>Их дэлгүүр салбар</Text>
            </View>
            <TouchableOpacity style={styles.transactionButton} onPress={logout}>
              <Text style={styles.registerButtonText}>Гарах</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.transactionButton} onPress={() => navigation.navigate(NavigationRoutes.ScanQrScreen)}>
              <Text style={styles.registerButtonText}>Qr уншуулах</Text>
            </TouchableOpacity>
        </>
    )
})

OperatorScreen.displayName = "OperatorScreen"

export { OperatorScreen }

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        fontSize: 16,
        fontFamily: "MonBold",
    },
    storeTitle: {
        fontSize: 14,
        fontFamily: "MonSemiBold",
        color: Colors.grey
    },
    transactionButton: {
        marginHorizontal: 15,
        marginTop: 50,
        backgroundColor: Colors.bgs,
        height: 50,
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 25,
        alignItems: "center",
      },
      registerButtonText: {
        fontFamily: 'MonThin',
        textAlign: "center",
        fontSize: 16,
        color: Colors.white,
      },
})