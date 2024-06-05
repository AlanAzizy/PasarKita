import { Entypo } from "@expo/vector-icons";
import { StyleSheet, View, Text, Pressable } from "react-native";

type date = {
  date: Date;
  day: string;
  selected: Date;
  isToday: boolean;
  setSelected: (date: Date) => void;
};

type selected = {
  selected: number;
};

export default function DateCard({ date, day, isToday }: date) {
  return (
    <Pressable
      style={[styles.container, isToday ? { backgroundColor: "#DBECC7" } : {}]}
    >
      <Text style={styles.date}>{date.getDate()}</Text>
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
