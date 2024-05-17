import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";

type OnPressFunction = () => void;

type buttonProps = {
  onPress: OnPressFunction;
  title: string;
  styles: any;
  isLight: boolean;
  size: number;
};

export default function Button(props: buttonProps) {
  const { onPress, title = "Save", styles, isLight, size } = props;
  return (
    <Pressable style={styles} onPress={onPress}>
      <Text
        style={[
          style.textStyle,
          { fontSize: size },
          isLight ? { color: "#ffffff" } : { color: "#8C8C8C" },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const style = StyleSheet.create({
  textStyle: {
    textAlign: "center",
    color: "#ffffff",
    fontFamily: "Poppins-Regular",
    textAlignVertical: "center",
    fontWeight: "bold",
  },
});
