import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { AppBar } from '../../components/app-bar'
import QRCode from 'react-native-qrcode-svg'
import { Colors } from '../../constants/colors'

const PaymentScreen = memo(() => {
  return (
    <>
      <AppBar title='Төлбөр төлөх' leading/>
      <QRCode logoBackgroundColor={Colors.white} size={280} value={'asdfasdf'} />
    </>
  )
})

PaymentScreen.displayName = 'PaymentScreen'

export { PaymentScreen }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  qrContainer: {
    alignSelf: 'center',
    backgroundColor: Colors.danger,
    height: 80,
    width: 80,
  },
})