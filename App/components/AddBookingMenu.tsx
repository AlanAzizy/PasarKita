import { Feather } from "@expo/vector-icons";
import { StyleSheet, View, Dimensions, Text, Pressable } from "react-native";

const _width = Dimensions.get("screen").width;
const _height = Dimensions.get("screen").height;

type addHistoryProp = {
  add: () => void;
};

export default function AddBookingMenu({ add }: addHistoryProp) {
  return (
    <Pressable style={styles.container} onPress={() => add()}>
      <Text style={styles.text_style}>Add New Booking</Text>
      <View style={styles.button}>
        <Feather name="plus-square" color={"#ffffff"} size={18} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 0,
    borderColor: "#111111",
    width: _width * 0.32,
    height: _height * 0.12,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginHorizontal: 10,
    padding: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  text_style: {
    flex: 2,
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#8C8C8C",
  },
  button: {
    width: "80%",
    height: "28%",
    backgroundColor: "#FFC008",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
});
