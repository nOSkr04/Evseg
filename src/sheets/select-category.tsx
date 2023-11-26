import { StyleSheet, Text } from 'react-native'
import React, { memo, useCallback } from 'react'
import { ICategory } from '../interface/category'
import { BottomSheetParamList, NavigationRoutes } from '../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import useSWR from 'swr';
import { ProductApi } from '../api';
import { FlatList } from 'react-native-gesture-handler';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';

type Props = NativeStackScreenProps<BottomSheetParamList, NavigationRoutes.SelectCategory>;




const SelectCategory = memo(({ route }: Props) => {
  const { onChange } = route.params;
  const { id } = route.params;
  const navigation = useNavigation();

  const change = useCallback((type : ICategory) => {
    navigation.goBack();
    onChange(type);
  }, [])

  const { data } = useSWR<ICategory[]>(`${id}/subCategory`, async () => {
    const res = await ProductApi.category({ page: 1, limit: 10, })
    return res.data;
  })

  const renderItem = useCallback(({ item }: { item: ICategory }) => {
    return (
      <TouchableOpacity style={styles.container} onPress={() => change(item)}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    )
  }, [id])


  return (
    <FlatList
      data={data?.filter((filter: ICategory) => filter.parent === id) || []}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />
  )
})

SelectCategory.displayName = "SelectCategory";

export { SelectCategory }

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
})