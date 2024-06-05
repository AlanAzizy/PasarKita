import { View, Text, StyleSheet, Dimensions } from "react-native";
import { FontAwesome6, Feather } from "@expo/vector-icons";
import { schedule } from "@/constants/Types";
import { Timestamp } from "firebase/firestore";

const _height = Dimensions.get("screen").height;

export default function ReminderCard({
  blockNumber,
  type,
  startTime,
}: schedule) {
  const time = (startTime as Timestamp).toDate();
  return (
    <View style={[styles.time_schedule, { height: "auto" }]}>
      <View style={styles.reminder_card}>
        <View style={styles.icon_container}>
          <FontAwesome6 name="calendar" size={40} color={"#ffffff"} />
        </View>
        <View style={styles.text_container}>
          <Text style={styles.text}>{`block ${blockNumber} ${type}`}</Text>
          <View style={styles.ket}>
            <Feather
              name="clock"
              color={"#ffffff"}
              size={16}
              style={{ marginHorizontal: 2 }}
            />
            <Text style={[styles.text, { marginHorizontal: 10 }]}>
              {`${time.getHours() - 7}.00 - ${time.getHours() - 6}.00`}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  reminder_card: {
    width: "100%",
    backgroundColor: "#8BC34A",
    height: _height * 0.08,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: "space-between",
  },
  icon_container: {
    backgroundColor: "#53845D",
    height: _height * 0.06,
    width: _height * 0.06,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
  },
  text_container: {
    height: _height * 0.06,
    width: "70%",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Poppins-Regular",
    color: "#ffffff",
  },
  ket: {
    height: "50%",
    flexDirection: "row",
    width: "100%",
    marginVertical: 1,
  },
  time_schedule: {
    flexDirection: "row",
    height: _height * 0.33,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
});
