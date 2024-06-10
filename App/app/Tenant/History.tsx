import { View, StyleSheet, Dimensions, Text, ScrollView } from "react-native";
import { useEffect, useState, useContext } from "react";
import { useNavigation, router } from "expo-router";
import useFonts from "@/components/useFonts";
import { Table, Rows, Row, TableWrapper } from "react-native-table-component";
import { Order } from "@/constants/Types";
import { StanContext } from "@/components/Context/StanContext";
import { formatToRupiah, getOrder } from "@/services/OrderService";

const _width = Dimensions.get("screen").width;
const _height = Dimensions.get("screen").height;

export default function Histroy() {
  const navigation = useNavigation();

  const tableHead = ["Order ID", "Date", "Cashier ID", "Total"];
  const [orders, setOrders] = useState<Order[] | null>(null);
  const stanContext = useContext(StanContext);

  const fetchOrder = async () => {
    const order = await getOrder(stanContext?.stan);
    setOrders(order);
  };
  useEffect(() => {
    fetchOrder();
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
      title: "Order Histroy",
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{new Date().toDateString()}</Text>
      <ScrollView style={styles.scroll_view}>
        <Table>
          <Row
            key={1}
            data={tableHead}
            style={styles.tableHead}
            textStyle={styles.text_head}
          ></Row>
          <TableWrapper>
            {orders &&
              orders.map((item, index) => (
                <Row
                  key={item.id}
                  data={[
                    item.id.slice(0, 6),
                    item.date.toDateString(),
                    item.cashierId.path.toString().slice(6, 12),
                    formatToRupiah(item.total),
                  ]}
                  style={
                    index % 2 == 1
                      ? { backgroundColor: "#F3F9ED", height: _height * 0.05 }
                      : { height: _height * 0.05 }
                  }
                  textStyle={styles.rowStyle}
                />
              ))}
          </TableWrapper>
        </Table>
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
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  tableHead: {
    height: _height * 0.05,
    borderWidth: 0,
    borderColor: "#111111",
    backgroundColor: "#DBECC7",
    textAlign: "center",
    justifyContent: "center",
  },
  rowStyle: {
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  date: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    marginTop: 15,
    marginBottom: 5,
  },
  scroll_view: {
    width: "95%",
    marginTop: 10,
    borderColor: "#ff0000",
    borderWidth: 0,
  },
  text_head: {
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    fontSize: 16,
  },
});
