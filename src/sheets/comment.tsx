import { StyleSheet,  TouchableOpacity,  View,  } from "react-native";
import React, { memo, useCallback } from "react";
import { SheetHeader } from "../components/header/sheet";
import { ICommentData, PostInput } from "../components/post/post-input";
import { useForm } from "react-hook-form";
import { MonBold } from "../widgets/styled-text";
import { DefaultColors } from "../constants/default-colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomSheetParamList } from "../navigation/types";
import { PostApi } from "../api";
import Colors from "../constants/colors";
import useColorScheme from "../hooks/use-color-scheme";
import useSwr,{ useSWRConfig } from "swr";
import { useNavigation } from "@react-navigation/native";
import { IPost } from "../interface/post";

type Props = NativeStackScreenProps<BottomSheetParamList, "CommentSheet">;

const CommentSheet = memo(({ route }: Props) => {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    const { mutate } = useSWRConfig();
    const { id, userId, payload } = route.params;
    const { data } = useSwr<IPost>(`post.${payload._id}`,{ fallbackData: payload });
    const { handleSubmit, control, formState: { errors }, setError } = useForm<ICommentData>();
    const onSubmit = useCallback(async(values: ICommentData) => {
        try{
            await PostApi.postComment({ id: id, values: values });
        } catch(err:any){
            setError("root", {
                type: err.statusCode
            });
        } finally{
          navigation.goBack();
          mutate(`post.comment.${userId}`);
          data?.setComment({ mutate: mutate, commentCount: data.comment });
        }
    },[data, id, mutate, navigation, setError, userId]);
    return (
      <View>
        <SheetHeader color={Colors[colorScheme].text} title={"Коммэнт"} />
        <PostInput control={control} errors={errors} />
        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.loginContainer}>
          <MonBold style={styles.loginText}>Илгээх</MonBold>
        </TouchableOpacity>
      </View>
    );
  });

  CommentSheet.displayName = "CommentSheet";

export { CommentSheet };

const styles = StyleSheet.create({
    loginContainer: {
        flex            : 1,
        backgroundColor : DefaultColors.bgs,
        marginHorizontal: 16,
        borderRadius    : 16,
        paddingVertical : 12,
        justifyContent  : "center",
        alignItems      : "center"
      },
      loginText: {
        color: DefaultColors.white
      },
});