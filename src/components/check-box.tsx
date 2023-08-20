import { StyleSheet} from "react-native";
import React, { useCallback } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "../constants/colors";
import { TouchableOpacity } from "react-native-gesture-handler";



type Props = {
 isSelected: boolean;
 onClick?:any
};

const Checkbox = ({isSelected, onClick}: Props) => {
    console.log(isSelected)
    const backGroundColor = useCallback(() => {
       return {backgroundColor :isSelected == true ? Colors.bgs : 'transparent'}
    }, [isSelected])
  return (
    <TouchableOpacity style={[styles.container,backGroundColor()]} onPress={() => onClick(isSelected!)}>
        <AntDesign name="check" size={isSelected == true ?  18 : 0} color={Colors.white}/>
    </TouchableOpacity>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  container:{
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
    width: 24, 
    borderWidth: 1,
    borderRadius: 5,
  },
});
