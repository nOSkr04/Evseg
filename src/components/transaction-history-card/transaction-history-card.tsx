import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import { Colors } from '../../constants/colors'

type Props = {
    type?: string,
    amount: number,
}

const TransactionHIstoryCard = ({ type, amount }: Props) => {
    const types = useCallback(
        () => {
            return {
                backgroundColor: type === "ХҮЛЭЭГДЭЖ БУЙ" ? Colors.grey : "ЦУЦАЛСАН" ? Colors.danger : "АМЖИЛТТАЙ" ? Colors.green : 'transparent',
            }
        },
        [],
    )
    const textColor = useCallback(
        () => {
            return {
                color: type === "ХҮЛЭЭГДЭЖ БУЙ" ? Colors.grey : "ЦУЦАЛСАН" ? Colors.danger : "АМЖИЛТТАЙ" ? Colors.green : 'transparent',
            }
        },
        [],
    )

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={[styles.dot, types()]} />
                <Text style={[textColor(), styles.type]}>{type}</Text>
            </View>
            {amount && 
            <Text style={styles.amount}>{amount?.toLocaleString()}₮</Text>
            }
        </View>
    )
}

export default TransactionHIstoryCard

const styles = StyleSheet.create({
    type:{
        fontFamily: 'MonThin',
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 100,
    },
    amount:{
        fontFamily: "MonThin",
        fontSize: 15,
    },
    row:{
        gap: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderRadius: 10,
        padding: 15,
        marginHorizontal: 15,
        backgroundColor: Colors.lightGrey,
    },
})