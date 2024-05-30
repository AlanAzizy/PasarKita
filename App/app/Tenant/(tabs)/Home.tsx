import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  Pressable,
  FlatList,
} from "react-native";
import { router, useNavigation } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import useFonts from "@/components/useFonts";
import { AntDesign, Feather } from "@expo/vector-icons";
import HistoryItem, { history } from "@/components/HistoryItem";
import AddHistory from "@/components/AddHistory";
import StockCard from "@/components/StockCard";
import { PreventRemoveContext } from "@react-navigation/native";
import CreateOrder from "@/components/Modals/Tenant/CreateOrder";
import { Item, Order } from "@/constants/Types";
import { getOrder } from "@/services/OrderService";
import { StanContext } from "@/components/Context/StanContext";
import { DocumentReference } from "firebase/firestore";
import { getAllItem, moveItem } from "@/services/ItemService";

const _width = Dimensions.get("screen").width;
const _height = Dimensions.get("screen").height;

export const orderHistory = [
  {},
  {
    cashier_id: 112,
    date: "22-05-2024",
    id: 403,
    nominal: 45789,
    number: 8,
    status: "In Progress",
  },
  {
    cashier_id: 112,
    date: "22-05-2024",
    id: 402,
    nominal: 48897,
    number: 3,
    status: "Completed",
  },
  {
    cashier_id: 112,
    date: "22-05-2024",
    id: 400,
    nominal: 45789,
    number: 8,
    status: "In Progress",
  },
  {
    cashier_id: 112,
    date: "22-05-2024",
    id: 401,
    nominal: 48897,
    number: 3,
    status: "Completed",
  },
  {
    cashier_id: 112,
    date: "22-05-2024",
    id: 399,
    nominal: 45789,
    number: 8,
    status: "In Progress",
  },
  {
    cashier_id: 112,
    date: "22-05-2024",
    id: 405,
    nominal: 48897,
    number: 3,
    status: "Completed",
  },
  {
    cashier_id: 112,
    date: "22-05-2024",
    id: 390,
    nominal: 45789,
    number: 8,
    status: "In Progress",
  },
  {
    cashier_id: 112,
    date: "22-05-2024",
    id: 500,
    nominal: 48897,
    number: 3,
    status: "Completed",
  },
];

export const stocks = [
  {},
  {
    price: 150,
    id: 403,
    prev_number: 45789,
    current_number: 8,
    name: "In Progress",
  },
  {
    price: 150,
    id: 402,
    prev_number: 48897,
    current_number: 3,
    name: "Completed",
  },
  {
    price: 150,
    id: 400,
    prev_number: 45789,
    current_number: 8,
    name: "In Progress",
  },
  {
    price: 150,
    id: 401,
    prev_number: 48897,
    current_number: 3,
    name: "Completed",
  },
  {
    price: 150,
    id: 399,
    prev_number: 45789,
    current_number: 8,
    name: "In Progress",
  },
  {
    price: 150,
    id: 405,
    prev_number: 48897,
    current_number: 3,
    name: "Completed",
  },
  {
    price: 150,
    id: 390,
    prev_number: 45789,
    current_number: 8,
    name: "In Progress",
  },
  {
    price: 150,
    id: 500,
    prev_number: 48897,
    current_number: 3,
    name: "Completed",
  },
];

export default function Home() {
  const navigation = useNavigation();

  const [isCreateOrderModal, setIsCreateOrderModal] = useState(false);
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [stok, setStok] = useState<Item[] | null>(null);
  const stanContext = useContext(StanContext);

  const fetchOrder = async () => {
    const order = await getOrder(stanContext?.stan);
    const orderAdd = order.at(0);
    const id = "string";
    const name = "string";
    const date = new Date();
    const orderItem = orderAdd?.orderItem;
    const total = 10000;
    const status = true;
    const cashierId = orderAdd?.cashierId;
    order.push({
      id,
      name,
      date,
      orderItem,
      total,
      status,
      cashierId,
    } as Order);
    order.reverse();
    setOrders(order);
  };

  const fetchItems = async () => {
    const stokk = await getAllItem(stanContext?.stan);
    console.log(stokk);
    setStok(stokk);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // The screen is focused
      // Call any action
      fetchOrder();
      fetchItems();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    // The screen is focused
    // Call any action
    fetchOrder();
    fetchItems();
  }, [isCreateOrderModal, navigation]);

  useEffect(() => {
    useFonts();
  });

  useEffect(() => {
    navigation.setOptions({ title: "Home" });
  }, [navigation]);

  const closeModals = () => {
    setIsCreateOrderModal(false);
  };

  return (
    <>
      <CreateOrder visible={isCreateOrderModal} close={closeModals} />
      <ScrollView
        style={isCreateOrderModal ? styles.fake_container : styles.container}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <LinearGradient colors={["#7EB143", "#A2CF6E"]} style={styles.banner}>
          <Text style={styles.banner_1}>January Profit</Text>
          <Text style={styles.banner_2}>Rp21.300.000</Text>
          <View style={styles.banner_3}>
            <Text style={[styles.banner_text, styles.banner_text_1]}>
              Today
            </Text>
            <Text style={[styles.banner_text, styles.banner_text_1]}>2.5%</Text>
            <Text style={[styles.banner_text, styles.banner_text_2]}>
              Rp575.25
            </Text>
            <Text style={[styles.banner_text, styles.banner_text_1]}>
              Details
            </Text>
          </View>
        </LinearGradient>
        <Pressable style={styles.print} onPress={() => {}}>
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
            onPress={() =>
              router.push({
                pathname: "/Tenant/History",
              })
            }
            style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
          >
            <Text style={styles.text_orderHistory}>Order History</Text>
            <AntDesign
              name="right"
              style={{ marginLeft: 4 }}
              size={_height * 0.022}
            ></AntDesign>
          </Pressable>
          <FlatList
            style={styles.flatlist}
            horizontal={true}
            data={orders}
            renderItem={({ item, index }) => {
              return index == 0 ? (
                <AddHistory
                  key={index}
                  add={() => setIsCreateOrderModal(true)}
                />
              ) : (
                <HistoryItem
                  key={item.id}
                  id={item.id.slice(0, 3)}
                  nominal={item.total}
                  number={item?.orderItem.length}
                  status={item?.status}
                />
              );
            }}
          />
        </View>
        <View style={[styles.stocks_container]}>
          <Text style={styles.stocks}>My Stocks</Text>
          {stok &&
            stok.map((item, index) => (
              <StockCard
                key={index}
                id={item.id.slice(0, 10)}
                name={item.name}
                stok={item.stok}
                additional={item.additional}
                price={item.price}
                image={item.image}
              />
            ))}
        </View>
      </ScrollView>
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
  },
  fake_container: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderWidth: 0,
    borderColor: "#0ff000",
    backgroundColor: "rgb(202,202,202,0.4)",
  },
  banner: {
    flex: 1,
    height: 0.22 * _height,
    width: "92%",
    borderWidth: 2,
    borderColor: "#fff0f0",
    marginHorizontal: "auto",
    borderRadius: 10,
    padding: "5%",
    marginTop: 10,
  },
  banner_1: {
    flex: 2,
    color: "#F5F5F5",
    fontSize: 20,
    fontFamily: "Poppins-Regular",
  },
  banner_2: {
    flex: 6,
    color: "#F5F5F5",
    fontSize: 25,
    fontFamily: "Poppins-Regular",
    fontWeight: "bold",
  },
  banner_3: {
    flex: 1.5,
    color: "#F5F5F5",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  print: {
    flex: 1,
    height: 0.08 * _height,
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
