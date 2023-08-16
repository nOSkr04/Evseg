import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import React, { memo, useCallback,  } from "react";
import useSwr, { useSWRConfig } from "swr";
import { PostApi } from "../../api";
import { NavigationRoutes, RootStackParamList } from "../../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image } from "expo-image";
import { IPost } from "../../interface/post";
import { MonMedium, MonThin } from "../../widgets/styled-text";
import { View } from "../../widgets/themed";
import { DefaultColors } from "../../constants/default-colors";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import useColorScheme from "../../hooks/use-color-scheme";
import { UserContainer } from "../../components/post/user-container";
import { useNavigation } from "@react-navigation/native";
import { IComment } from "../../interface/comment";
import { AppBar } from "../../components/header/app-bar";
type Props = NativeStackScreenProps<RootStackParamList, "PostDetailScreen">;

const PostDetail = memo(({ route }: Props) => {
  const { id } = route.params;
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const { mutate } = useSWRConfig();
  const { data } = useSwr<IPost>(`post.${id}`, async () => {
    const res = await PostApi.getPost(id);
    return res;
  });

  
  const { data: commentData } = useSwr<IComment[]>(`post.comment.${id}`, async () => {
    const res = await PostApi.getComments(id);
    return res;
  });

  const onLikeAction = useCallback(() => {
    if (data?.isLiked) {
      data?.setUnlike({ mutate: mutate, likeCount: data!.like, });
      PostApi.postUnLike(data!._id);
    } else {
      data?.setLike({ mutate: mutate, likeCount: data!.like,  });
      PostApi.postLike(data!._id);
    }

  }, [data, mutate]);

  const likeActions = useCallback(() => {
    return (
      <TouchableOpacity onPress={onLikeAction} style={styles.action}>
        {data?.isLiked ?
          <AntDesign color={Colors[colorScheme].tint} name="heart" size={24} />
          :
          <AntDesign color={Colors[colorScheme].tint} name="hearto" size={24} />
        }
        <MonThin style={styles.actionText}>{data!.like}</MonThin>
      </TouchableOpacity>
    );
  }, [colorScheme, data, onLikeAction]);

  const commentAction = useCallback(() => {
    return (
      <TouchableOpacity style={styles.action}>
        <AntDesign color={Colors[colorScheme].tint} name="message1" size={24} />
        <MonThin style={styles.actionText}>{data!.comment}</MonThin>
      </TouchableOpacity>
    );
  }, [colorScheme, data]);

  const renderHeader = useCallback(() => {
    return (
      <>
        <Image source={require("../../assets/img/cover.png")} style={styles.image} />
        <MonMedium style={styles.title}>{data!.title}</MonMedium>
        <View style={styles.h12} />
        <View style={styles.actionRow}>
          {likeActions()}
          {commentAction()}
        </View>
      </>
    );
  }, [commentAction, data, likeActions]);

  const renderItem = useCallback(({ item }: { item: IComment }) => {
    return (
      <View>
        <UserContainer  createdAt={item!.createdAt} name={item!.name} right={
          <TouchableOpacity style={styles.iconButton}>
            <Entypo color={Colors[colorScheme].tint} name="dots-three-horizontal" size={24} />
          </TouchableOpacity>
          } />
        <MonMedium style={styles.dataText}>{item.description}</MonMedium>
        <View style={styles.border} />
      </View>
    );

  }, [colorScheme]);

  const onComment = useCallback(() => {
    navigation.navigate(NavigationRoutes.CommentSheet, { id: data!._id, userId: id, payload: data! } );
  },[data, id, navigation]);

  if (!data) {
    return null;
  }
  return (
    <View style={styles.root}>
      <AppBar isBack title={data.name} />
      <FlatList
      ListHeaderComponent={renderHeader}
      data={commentData}
      renderItem={renderItem}
      style={styles.root} 
      />
      <TouchableOpacity onPress={onComment} style={styles.comment}>
        <MonMedium style={styles.commentText}>Коммэнт...</MonMedium>
      </TouchableOpacity>
    </View>
  );
});

PostDetail.displayName = "PostDetail";

export { PostDetail };

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  image: {
    width : "100%",
    height: 300
  },
  title: {
    fontSize        : 18,
    marginHorizontal: 16,
    marginTop       : 8
  },
  border: {
    borderWidth   : 1,
    marginVertical: 8,
    borderColor   : DefaultColors.border
  },
  actionRow: {
    flexDirection   : "row",
    marginHorizontal: 16,
    marginBottom    : 8,
    justifyContent  : "space-around"
  },
  action: {
    flexDirection: "row",
    alignItems   : "center",
    padding      : 4
  },
  actionText: {
    marginLeft: 4
  },
  input: {
    marginBottom: 20,
    padding     : 16
  },
  comment: {
    padding         : 16,
    marginBottom    : 10,
    borderWidth     : 1,
    borderColor     : DefaultColors.border,
    borderRadius    : 4,
    marginHorizontal: 16
  },
  commentText: {
    fontSize: 12
  },
  dataText: {
    fontSize        : 16,
    marginHorizontal: 24,
    marginTop       : 8,
  },
  h12: {
    height: 12
  },
  iconButton: { padding: 8 }
});