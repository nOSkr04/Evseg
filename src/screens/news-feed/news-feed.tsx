import { FlatList, RefreshControl, StyleSheet } from "react-native";
import React, { memo, useCallback } from "react";
import useSWRInfinite from "swr/infinite";
import { PostApi } from "../../api";
import { PostItem } from "../../components/post/post-item";
import { IPost } from "../../interface/post";
import { AppBar } from "../../components/header/app-bar";

const NewsFeedScreen = memo(() => {

    const { data, size,setSize, isLoading, } = useSWRInfinite(
        index => `post.${index}`,
        async index => {
            const page = index.split(".").pop();
            const res = await PostApi.getPosts(
                { page: parseInt(`${page || 1}`, 10) + 1, limit: 10 }
                
            );
            return res;
        },
    );
    console.log(data);

    const renderItem = useCallback(({ item }: {item: IPost}) => {
        return <PostItem item={item}   />;
    },[]);
    
    if(!data){
      return null;
    }
    return (
      <>
        <AppBar isAdd={true} title={"Хэлэлцүүлэг"}  />
        <FlatList data={(data || []).map(entry => entry.data).flat() as IPost[]}   onEndReached={() => setSize(size + 1)}
     onEndReachedThreshold={0.5}
     refreshControl={
       <RefreshControl
         onRefresh={() => {
           setSize(1);

         }}
         refreshing={isLoading}
         />
     }
     renderItem={renderItem}
     showsVerticalScrollIndicator={false} style={styles.root} />
      </>
    );
  });

  NewsFeedScreen.displayName = "NewsFeedScreen";

export { NewsFeedScreen };

const styles = StyleSheet.create({
    root: {
        flex: 1
    }
});