import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import useFonts from "./useFonts";
import { Timestamp } from "firebase/firestore";

const _width = Dimensions.get("screen").width;
const _height = Dimensions.get("screen").height;

export type stall = {
  id: string;
  name: string;
  time: Date;
  number: number;
  status: boolean;
};

export default function Maintenance({ id, name, time, number, status }: stall) {
  const date = (time as Timestamp).toDate();
  return (
    <View style={styles.container}>
      <Text style={styles.nominal}>{name}</Text>
      <Text style={styles.number}>{date.toDateString()}</Text>
      <View
        style={[
          styles.status,
          {
            backgroundColor: status ? "#E0EBFF" : "#FFBABA",
          },
        ]}
      >
        {status ? (
          <Feather name="check-square" />
        ) : (
          <FontAwesome5 name="clock" size={12} />
        )}
        <Text style={styles.status_text}>
          {status ? "Completed" : "Not Completed"}
        </Text>
      </View>
      <Text style={styles.id}>{`Block ${number}`}</Text>
    </View>
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
    padding: 5,
    justifyContent: "space-between",
  },
  nominal: {
    color: "#5C5C5C",
    borderWidth: 0,
    borderColor: "#00fff0",
    fontFamily: "Poppins-Regular",
    fontWeight: "bold",
  },
  number: {
    color: "#8C8C8C",
    borderWidth: 0,
    borderColor: "#00fff0",
    fontFamily: "Poppins-Regular",
    fontSize: 11,
  },
  status: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 0,
    borderColor: "#00fff0",
    height: "24%",
    width: "auto",
    padding: 2,
    alignItems: "center",
    borderRadius: 5,
  },
  status_text: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#8C8C8C",
    marginLeft: 3,
    textAlignVertical: "center",
    width: "auto",
  },
  id: {
    color: "#FDFDFD",
    borderWidth: 0,
    borderColor: "#00fff0",
    fontFamily: "Poppins-Regular",
    fontWeight: "bold",
    padding: 2,
    backgroundColor: "#8BC34A",
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    textAlign: "center",
  },
});
