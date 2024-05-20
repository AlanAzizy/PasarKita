import { Entypo } from "@expo/vector-icons";
import { StyleSheet, View, Text, Pressable } from "react-native";

type date = {
  date: number;
  day: string;
  selected: number;
  isToday: boolean;
  setSelected: (date: number) => void;
};

type selected = {
  selected: number;
};

export default function Date({
  date,
  day,
  selected,
  isToday,
  setSelected,
}: date) {
  const today = 21;
  return (
    <Pressable
      style={[
        styles.container,
        selected == date ? { backgroundColor: "#DBECC7" } : {},
      ]}
      onPress={() => setSelected(date)}
    >
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.day}>{day}</Text>
      {isToday && <Entypo name="dot-single" size={20} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "12%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 5,
    borderColor: "#ff0f0f",
    borderWidth: 0,
  },
  date: {
    fontSize: 20,
    fontFamily: "Poppins-Regular",
    fontWeight: "bold",
  },
  day: {
    fontSize: 10,
    fontFamily: "Poppins-Regular",
    color: "#94A3B8",
  },
});
