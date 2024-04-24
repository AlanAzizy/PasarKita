import React from 'react';
import { Text, Pressable } from 'react-native';

type OnPressFunction = () => void;

type buttonProps = {
    onPress : OnPressFunction;
    title : string;
    styles : any
    isLight : boolean
    size : number
}

export default function Button(props : buttonProps) {
  const { onPress, title = 'Save', styles, isLight, size } = props;
  return (
    <Pressable style={styles} onPress={onPress}>
      <Text style={isLight ? {textAlign :'center', color:'#ffffff', fontSize : size, fontFamily:'Poppins-Regular', textAlignVertical:'center', fontWeight:'bold'} : {textAlign :'center', color:'#8C8C8C', fontSize:size, fontFamily:'Poppins-Regular', borderWidth:0, borderColor:"#ff00f0", textAlignVertical:'center', fontWeight:'bold'}}>{title}</Text>
    </Pressable>
  );
}
