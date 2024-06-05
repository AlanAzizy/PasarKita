import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import useFonts from "@/components/useFonts";
import {
  AntDesign,
  Feather,
  FontAwesome6,
  MaterialIcons,
} from "@expo/vector-icons";
import DateCard from "@/components/DateCard";
import ReminderCard from "@/components/ReminderCard";
import { schedule } from "@/constants/Types";
import { getScheduleByDate, getAllSchedule } from "@/services/ScheduleService";
import { Timestamp } from "firebase/firestore";
import { UserContext } from "@/components/Context/UserContext";

const _width = Dimensions.get("screen").width;
const _height = Dimensions.get("screen").height;

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
  const userContext = useContext(UserContext);
  const today = new Date();
  const navigation = useNavigation();
  const [workSchedule, setWorkSchedule] = useState<schedule[] | null>();
  const [workScheduleNext, setWorkScheduleNext] = useState<schedule[] | null>();
  const [workHour, setWorkHour] = useState<number[] | undefined>();
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [photoUrl, setPhotoUrl] = useState(userContext?.user.photoUrl);

  const h_3 = new Date(today);
  const h_2 = new Date(today);
  const h_1 = new Date(today);
  const h3 = new Date(today);
  const h2 = new Date(today);
  const h1 = new Date(today);

  h_3.setDate(h_3.getDate() - 3);
  h_2.setDate(h_2.getDate() - 2);
  h_1.setDate(h_1.getDate() - 1);
  h3.setDate(h3.getDate() + 3);
  h2.setDate(h2.getDate() + 2);
  h1.setDate(h1.getDate() + 1);

  const dateOption = [h_3, h_2, h_1, today, h1, h2, h3];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const fetchSchedule = async () => {
    const cleaning = await getScheduleByDate(today);
    setWorkSchedule(cleaning);
    const nextDay = today;
    nextDay.setDate(nextDay.getDate() + 1);
    const cleaningNext = await getScheduleByDate(nextDay);
    setWorkScheduleNext(cleaningNext);
    const work = cleaning?.map((e) => {
      return (e.startTime as Timestamp).toDate().getHours() - 7;
    });
    setWorkHour(work);
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

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
        <Image src={photoUrl} style={styles.image}></Image>
      </View>
      <View style={[styles.top_2, { justifyContent: "space-between" }]}>
        {dateOption.map((item, index) => (
          <DateCard
            key={index}
            date={item}
            day={days.at(item.getDay())?.toString().slice(0, 3)}
            isToday={today.getDate() == item.getDate()}
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
              {workHour && workHour.find((e) => e == 8) ? (
                <View style={[styles.blok]}></View>
              ) : (
                <View style={[styles.blok_none, ,]}></View>
              )}
              {workHour && workHour.find((e) => e == 9) ? (
                <View style={[styles.blok]}></View>
              ) : (
                <View style={[styles.blok_none]}></View>
              )}
              {workHour && workHour.find((e) => e == 10) ? (
                <View style={[styles.blok]}></View>
              ) : (
                <View style={[styles.blok_none]}></View>
              )}
              {workHour && workHour.find((e) => e == 11) ? (
                <View style={[styles.blok]}></View>
              ) : (
                <View style={[styles.blok_none]}></View>
              )}
              {workHour && workHour.find((e) => e == 12) ? (
                <View style={[styles.blok]}></View>
              ) : (
                <View style={[styles.blok_none]}></View>
              )}
              {workHour && workHour.find((e) => e == 13) ? (
                <View style={[styles.blok]}></View>
              ) : (
                <View style={[styles.blok_none]}></View>
              )}
              {workHour && workHour.find((e) => e == 14) ? (
                <View style={[styles.blok]}></View>
              ) : (
                <View style={[styles.blok_none]}></View>
              )}
              {workHour && workHour.find((e) => e == 15) ? (
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
          {workScheduleNext &&
            workScheduleNext.map((item, index) => (
              <ReminderCard
                key={index}
                startTime={item.startTime}
                blockNumber={item.blockNumber}
                type={item.type}
              />
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
