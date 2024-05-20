import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import useFonts from "@/components/useFonts";
import {
  AntDesign,
  Feather,
  FontAwesome6,
  MaterialIcons,
} from "@expo/vector-icons";
import Date from "@/components/Date";
import ReminderCard from "@/components/ReminderCard";

const _width = Dimensions.get("screen").width;
const _height = Dimensions.get("screen").height;

const schedule = [
  {
    user: "Mentuk",
    start: 10,
    end: 11,
  },
  {
    user: "Mentul",
    start: 13,
    end: 15,
  },
];

const dates = [
  {
    date: 18,
    day: "Mon",
  },
  {
    date: 19,
    day: "Tue",
  },
  {
    date: 20,
    day: "Wed",
  },
  {
    date: 21,
    day: "Thu",
  },
  {
    date: 22,
    day: "Fri",
  },
  {
    date: 23,
    day: "Sat",
  },
  {
    date: 24,
    day: "Sun",
  },
];

const waktu = [8, 9, 11, 15];

const time = ["08.00", "10.00", "12.00", "14.00", "16.00"];
export default function Schedule() {
  const navigation = useNavigation();

  const [selected, setSelected] = useState(21);
  useEffect(() => {
    useFonts();
  });

  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      headerTitleStyle: {
        color: "#53845D",
        fontWeight: "bold",
        fontFamily: "Poppins-Regular",
        fontSize: 24,
      },
      title: "Schedule",
    });
  }, [navigation]);

  let i = 0;

  type Schedule = {
    user: string;
    start: number;
    end: number;
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.greet}>Hello, Good Morning</Text>
        <Image
          source={require("../../assets/images/pasar.jpg")}
          style={styles.image}
        ></Image>
      </View>
      <View style={[styles.top_2, { justifyContent: "space-between" }]}>
        {dates.map((item, index) => (
          <Date
            key={index}
            date={item.date}
            day={item.day}
            selected={selected}
            isToday={item.date == 21}
            setSelected={setSelected}
          />
        ))}
      </View>
      <ScrollView style={styles.scroll}>
        <View>
          <Text style={[styles.greet, { fontSize: 20 }]}>
            Cleaning Schedule Today
          </Text>
          <View style={styles.time_schedule}>
            <View style={styles.time_container}>
              {time.map((item, index) => (
                <Text key={index} style={styles.time}>
                  {item}
                </Text>
              ))}
            </View>
            <View style={styles.blok_container}>
              {waktu.find((e) => e == 8) ? (
                <View style={[styles.blok]}></View>
              ) : (
                <View style={[styles.blok_none, ,]}></View>
              )}
              {waktu.find((e) => e == 9) ? (
                <View style={[styles.blok]}></View>
              ) : (
                <View style={[styles.blok_none]}></View>
              )}
              {waktu.find((e) => e == 10) ? (
                <View style={[styles.blok]}></View>
              ) : (
                <View style={[styles.blok_none]}></View>
              )}
              {waktu.find((e) => e == 11) ? (
                <View style={[styles.blok]}></View>
              ) : (
                <View style={[styles.blok_none]}></View>
              )}
              {waktu.find((e) => e == 12) ? (
                <View style={[styles.blok]}></View>
              ) : (
                <View style={[styles.blok_none]}></View>
              )}
              {waktu.find((e) => e == 13) ? (
                <View style={[styles.blok]}></View>
              ) : (
                <View style={[styles.blok_none]}></View>
              )}
              {waktu.find((e) => e == 14) ? (
                <View style={[styles.blok]}></View>
              ) : (
                <View style={[styles.blok_none]}></View>
              )}
              {waktu.find((e) => e == 15) ? (
                <View style={[styles.blok]}></View>
              ) : (
                <View style={[styles.blok_none]}></View>
              )}
            </View>
          </View>
        </View>
        <View>
          <Text style={[styles.greet, { fontSize: 20 }]}>Reminder</Text>
          <Text style={[styles.reminder]}>
            Don't Forget Schedule for Tomorrow
          </Text>
          {waktu.map((item, index) => (
            <ReminderCard key={index} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderWidth: 0,
    borderColor: "#0ff000",
    backgroundColor: "#fafafa",
    alignItems: "center",
  },
  top: {
    width: "90%",
    height: _height * 0.13,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  top_2: {
    width: "90%",
    height: _height * 0.12,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 10,
  },
  greet: {
    fontSize: 25,
    fontFamily: "Poppins-Regular",
    color: "#53845D",
    fontWeight: "bold",
    width: _width * 0.72,
  },
  image: {
    width: _height * 0.07,
    height: _height * 0.07,
    borderRadius: _height * 0.075,
  },
  scroll: {
    width: "90%",
  },
  time_schedule: {
    flexDirection: "row",
    height: _height * 0.33,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  time_container: {
    flex: 1,
    justifyContent: "space-between",
  },
  blok_container: {
    flex: 3,
    gap: 4,
    paddingVertical: _height * 0.007,
  },
  time: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#94A3B8",
  },
  blok: {
    backgroundColor: "#53845D",
    borderColor: "#00f0f0",
    borderWidth: 0,
    borderRadius: 4,
    height: _height * 0.032,
  },
  blok_none: {
    backgroundColor: "none",
    borderColor: "#53845D",
    borderWidth: 2,
    borderRadius: 4,
    height: _height * 0.032,
  },
  reminder: {
    fontFamily: "Poppins-Regular",
    color: "#575A61",
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
  },
});
