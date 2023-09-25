import { Dimensions, StyleSheet, } from 'react-native'
import React, { memo } from 'react'
import { LightBox } from '../../components/animate/light-box'
import { useNavigation } from '@react-navigation/native'
import Animated, { SharedTransition, withSpring } from 'react-native-reanimated';
import QRCode from 'react-native-qrcode-svg';
import { Colors } from '../../constants/colors';
import { IUser } from '../../interface/user';
import useSWR from 'swr';


const { width } = Dimensions.get("window")
const customTransition = SharedTransition.custom((values) => {
    "worklet";
    return {
        height: withSpring(values.targetHeight),
        width: withSpring(values.targetWidth),
        originX: withSpring(values.targetOriginX),
        originY: withSpring(values.targetOriginY,),
    };
});
const QrLightBox = memo(() => {
    const navigation = useNavigation();
    const { data } = useSWR<IUser>("swr.user.me");
    return (
        <LightBox onClosed={() => navigation.goBack()}>
            <Animated.View sharedTransitionTag="userQrCode" sharedTransitionStyle={customTransition} >
                <QRCode logo={require("../../../assets/img/evseg.png")} logoBackgroundColor={Colors.white} size={144} value={data?._id} />
            </Animated.View>
        </LightBox>
    )
})

QrLightBox.displayName = "QrLightBox"

export { QrLightBox }

const styles = StyleSheet.create({
    qrCode: {
        width: width * 0.9,
        alignSelf: "center",
        height: 400,
        marginVertical: 24
    },
})