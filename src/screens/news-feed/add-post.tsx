import { ActivityIndicator,  Platform,StyleSheet,View } from "react-native";
import React, { memo, useCallback,useState  } from "react";
import { useForm } from "react-hook-form";
import { AddPostForm, IPostFormData } from "../../components/post/add-post-form";
import { AppBar } from "../../components/header/app-bar";
import { Button } from "../../widgets/button";
import { PostApi } from "../../api";
import useColorScheme from "../../hooks/use-color-scheme";
import Colors from "../../constants/colors";

const AddPostScreen = memo(() => {
  const [loading ,setLoading] = useState(false);
  const colorScheme = useColorScheme();
    const {
        control,
        handleSubmit,
        formState: { errors },
        clearErrors,
      } = useForm<any>();

      const onSubmit = useCallback(async(values:IPostFormData) => {
        setLoading(true);
        try{
          const res = await PostApi.postNewsFeed({ title: values.description });

          if(values.image){
            const photo = values.image;
            const fileExt = photo.substring(photo.lastIndexOf(".") + 1);
            const formData = new FormData();
            formData.append("file", {
              uri : photo,
              type: `image/${fileExt}`,
              name: Platform.OS === "ios" ? photo.replace("file://", "") : photo
            });
            await PostApi.postPhotoUpload({ id: res.article._id, data: formData } );
          }
        } catch(err){
          console.log(err);
        } finally{
          setLoading(false);
        }
      },[]);

      if(loading){
        return <ActivityIndicator color={colors[colorScheme].text} size={"large"}  />;
      }

    return (
      <>
        <AppBar isBack title={"Нийтлэл оруулах"}  />
        <View style={styles.container}>
          <AddPostForm clearErrors={clearErrors} control={control} errors={errors}     />
          <Button onPress={handleSubmit(onSubmit)} title="Нийтлэх"    />
        </View>
      </>
    );
  });

  AddPostScreen.displayName="AddPostScreen";

export { AddPostScreen };

const styles = StyleSheet.create({
    buttonTitle: {
        fontSize: 14
    },
    container: {
      marginHorizontal: 16
    }
});