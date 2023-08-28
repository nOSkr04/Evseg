import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text } from 'react-native'
import React, { memo, useCallback } from 'react'
import { AppBar } from '../../components/app-bar'
import { Colors } from '../../constants/colors'
import useSWRInfinite from "swr/infinite";
import useSwr from "swr"
import { TransactionApi } from '../../api'
import { IUser } from '../../interface/user'
import { ITransaction } from '../../interface/transaction'
import TransactionHIstoryCard from '../../components/transaction-history-card/transaction-history-card';
const TransactionHistory = memo(() => {
  const { data: user } = useSwr<IUser>("swr.user.me")
  const {data} = useSwr<ITransaction[]>("transaction.history", async () => {
    return await TransactionApi.getTransactions({id: user!._id})
  })

  const renderItem = useCallback(({ item }: { item: ITransaction }) => {
    if (item.type === "Success") {
      return <TransactionHIstoryCard type='АМЖИЛТТАЙ' amount={item.bonusAmount || 0} />
    }
    if (item.type === "Cancelled") {
      return <TransactionHIstoryCard type='ЦУЦАЛСАН' amount={item.bonusAmount || 0} />
    }
    return <TransactionHIstoryCard type='ХҮЛЭЭГДЭЖ БУЙ' amount={item.bonusAmount || 0} />
  }, [])




  return (
    <>
      <AppBar leading title='Гүйлгээний түүх' />
         <FlatList
        // ListEmptyComponent={
        //   isLoading ? <ActivityIndicator size={"large"}  /> : <></>
        // }
        // data={(data || []).map(entry => entry.data).flat() as ITransaction[]}
        // onEndReached={() => setSize(size + 1)}
        // onEndReachedThreshold={0.5}
        // refreshControl={
        //   <RefreshControl
        //     onRefresh={() => {
        //       setSize(1);
        //     }}
        //     refreshing={isLoading}
        //   />
        // }
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={styles.root}
      />
    </>
  )
})

export { TransactionHistory }

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.white,
  },
  description: {
    marginTop: 25,
    marginBottom: 15,
    marginLeft: 15,
    fontFamily: 'MonThin',
  },
})