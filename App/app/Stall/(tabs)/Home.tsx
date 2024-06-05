import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Pressable,
  FlatList,
} from "react-native";
import { router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import useFonts from "@/components/useFonts";
import { AntDesign, Feather } from "@expo/vector-icons";
import HistoryItem, { history } from "@/components/HistoryItem";
import AddHistory from "@/components/AddHistory";
import StallBooking from "@/components/StallBooking";
import AddBookingMenu from "@/components/AddBookingMenu";
import AddBooking from "@/components/Modals/Stall/AddBooking";
import AddMaintenance from "@/components/AddMaintenance";
import Maintenance from "@/components/Maintenance";
import AddMaintenanceModals from "@/components/Modals/Stall/AddMaintenanceModals";
import {
  countBookStanPercentage,
  getBookedStan,
  updateStanOwner,
} from "@/services/StanService";
import { Stan, schedule } from "@/constants/Types";
import { getAllSchedule } from "@/services/ScheduleService";

const _width = Dimensions.get("screen").width;
const _height = Dimensions.get("screen").height;
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Home() {
  const navigation = useNavigation();

  const [isAddBookingModal, setIsAddBookingModal] = useState(false);
  const [isAddMaintenanceModal, setIsAddMaintenanceModal] = useState(false);
  const [workSchedule, setWorkSchedule] = useState<schedule[] | null>();
  const [stalls, setStalls] = useState<Stan[] | null>(null);
  const [bookedStanPercentage, setBookStanPercentage] = useState<number>();

  const fetchSchedule = async () => {
    const id = "randomstring";
    const status = false;
    const blockNumber = 999;
    const type = "bad";
    const worker = "none";
    const startTime = new Date(9999999);
    const cleaning = await getAllSchedule();
    cleaning?.push({
      id,
      status,
      blockNumber,
      type,
      worker,
      startTime,
    } as schedule);
    cleaning?.reverse();
    setWorkSchedule(cleaning);
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchItems = async () => {
    const stall = await getBookedStan();
    const id = "randomstring";
    const availability = true;
    const paymentStatus = false;
    const blockNumber = 999;
    const owner = "none";
    const price = 0;
    const size = 0;
    const type = "bad";
    const until = new Date();
    stall?.push({
      id,
      availability,
      paymentStatus,
      blockNumber,
      owner,
      price,
      size,
      type,
      until,
    } as Stan);
    stall?.reverse();
    setStalls(stall);
    const numberOfStan = await countBookStanPercentage();
    setBookStanPercentage(numberOfStan);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchItems();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    fetchItems();
  }, [isAddBookingModal, isAddMaintenanceModal]);

  useEffect(() => {
    useFonts();
  });

  useEffect(() => {
    navigation.setOptions({ title: "Home" });
  }, [navigation]);

  const closeBooking = () => {
    setIsAddBookingModal(false);
  };

  const closeMaintenance = () => {
    setIsAddMaintenanceModal(false);
  };

  return (
    <>
      <AddBooking visible={isAddBookingModal} close={closeBooking} />
      <AddMaintenanceModals
        visible={isAddMaintenanceModal}
        close={closeMaintenance}
      />
      <View style={styles.container}>
        <LinearGradient colors={["#7EB143", "#A2CF6E"]} style={styles.banner}>
          <Text style={styles.banner_1}>
            {monthNames[new Date().getMonth()]}
          </Text>
          <View style={styles.banner_container}>
            <Text style={styles.banner_big}>{`${(bookedStanPercentage * 100)
              .toString()
              .slice(0, 2)}%`}</Text>
            <Text style={styles.banner_2}>Stalls Booked</Text>
          </View>
          <View style={styles.banner_3}>
            <Text style={[styles.banner_text, styles.banner_text_1]}>
              Today
            </Text>
            <Text style={[styles.banner_text, styles.banner_text_1]}>2.5%</Text>
            <Text style={[styles.banner_text, styles.banner_text_2]}>
              Rp57.500.000
            </Text>
            <Text style={[styles.banner_text, styles.banner_text_1]}>
              Details
            </Text>
          </View>
        </LinearGradient>
        <Pressable
          style={styles.print}
          onPress={() => console.log("awkowkwowkok")}
        >
          <View style={styles.print_icon}>
            <Feather
              name="printer"
              color={"#ffffff"}
              size={_height * 0.045}
              style={{ borderWidth: 0, borderColor: "#ff0000" }}
            ></Feather>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={styles.text_print}>Print report</Text>
            <Text
              style={{
                color: "#767676",
                fontSize: 15,
                fontFamily: "Poppins-Regular",
              }}
            >
              Today
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "flex-end",
              paddingRight: 20,
            }}
          >
            <AntDesign name="right" size={_height * 0.025}></AntDesign>
          </View>
        </Pressable>
        <View style={styles.history}>
          <Pressable
            onPress={() => router.push("/Stall/Payment")}
            style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
          >
            <Text style={styles.text_orderHistory}>Stalls Booking</Text>
            <AntDesign
              name="right"
              style={{ marginLeft: 4 }}
              size={_height * 0.022}
            ></AntDesign>
          </Pressable>
          <FlatList
            style={styles.flatlist}
            horizontal={true}
            data={stalls}
            renderItem={({ item, index }) => {
              return index == 0 ? (
                <AddBookingMenu add={() => setIsAddBookingModal(true)} />
              ) : (
                <StallBooking
                  id={item.id}
                  paymentStatus={item.paymentStatus}
                  price={item.price}
                  availability={item.availability}
                  until={item.until}
                  blockNumber={item.blockNumber}
                  size={item.size}
                  type={item.type}
                  owner={item.owner}
                />
              );
            }}
          />
        </View>
        <View style={styles.history}>
          <Pressable
            onPress={() => router.push("../Schedule")}
            style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
          >
            <Text style={styles.text_orderHistory}>Market Maintenance</Text>
            <AntDesign
              name="right"
              style={{ marginLeft: 4 }}
              size={_height * 0.022}
            ></AntDesign>
          </Pressable>
          <FlatList
            style={styles.flatlist}
            horizontal={true}
            data={workSchedule}
            renderItem={({ item, index }) => {
              return item.type == "bad" ? (
                <AddMaintenance add={() => setIsAddMaintenanceModal(true)} />
              ) : (
                <Maintenance
                  id={item.id}
                  time={item.startTime}
                  number={item.blockNumber}
                  status={item.status}
                  name={item.type}
                />
              );
            }}
          />
        </View>
      </View>
    </>
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
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  fake_container: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderWidth: 0,
    borderColor: "#0ff000",
    backgroundColor: "rgb(202,202,202,0.4)",
    justifyContent: "center",
  },
  banner: {
    height: 0.22 * _height,
    width: "92%",
    borderWidth: 0,
    borderColor: "#1af0f0",
    marginHorizontal: "auto",
    borderRadius: 10,
    padding: "5%",
    marginTop: 10,
    justifyContent: "space-between",
  },
  banner_big: {
    flex: 1.5,
    color: "#FFDD67",
    fontSize: 45,
    fontFamily: "Poppins-Regular",
    fontWeight: "bold",
    borderColor: "#ff00ff",
    borderWidth: 0,
    textAlign: "left",
  },
  banner_container: {
    flex: 6,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#f0f0ff",
    borderWidth: 0,
  },
  banner_1: {
    flex: 2,
    color: "#F5F5F5",
    fontSize: 20,
    fontFamily: "Poppins-Regular",
  },
  banner_2: {
    flex: 3,
    color: "#F5F5F5",
    fontSize: 25,
    fontFamily: "Poppins-Regular",
    fontWeight: "bold",
    borderColor: "#ff00ff",
    borderWidth: 0,
    textAlign: "left",
  },
  banner_3: {
    flex: 1.5,
    color: "#F5F5F5",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  print: {
    height: 0.1 * _height,
    width: "92%",
    backgroundColor: "#ffffff",
    borderWidth: 0,
    borderColor: "",
    borderRadius: 12,
    padding: "3%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "3%",
  },
  history: {
    height: _height * 0.2,
    width: "90%",
    borderWidth: 0,
    borderColor: "#fff000",
    justifyContent: "flex-end",
  },
  stocks_container: {
    flex: 1,
    borderWidth: 0,
    borderColor: "#111111",
    width: "90%",
    borderRadius: 12,
    marginHorizontal: 10,
    padding: 5,
    justifyContent: "space-between",
  },
  print_icon: {
    flex: 1,
    backgroundColor: "#4BAEE6",
    height: _height * 0.06,
    width: _height * 0.06,
    marginRight: "3%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  text_orderHistory: {
    fontSize: 24,
    fontFamily: "Poppins-Regular",
    color: "#53845D",
    fontWeight: "bold",
    textAlign: "left",
    borderColor: "#ff0000",
    borderWidth: 0,
  },
  flatlist: {
    marginVertical: 0,
    borderWidth: 0,
    borderColor: "#11111",
    height: _height * 0.08,
  },
  banner_text: {
    color: "#f5f5f5",
    fontSize: 15,
    fontFamily: "Poppins-Regular",
  },
  banner_text_1: {
    flex: 1,
  },
  banner_text_2: {
    flex: 2,
  },
  text_print: {
    color: "#767676",
    fontSize: 20,
    fontFamily: "Poppins-Regular",
    fontWeight: "bold",
  },
  stocks: {
    fontSize: 24,
    fontFamily: "Poppins-Regular",
    color: "#53845D",
    fontWeight: "bold",
    textAlign: "left",
    borderColor: "#ff0000",
    borderWidth: 0,
  },
});
