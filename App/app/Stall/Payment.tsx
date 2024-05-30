import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Pressable,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, router } from "expo-router";
import useFonts from "@/components/useFonts";
import {
  AntDesign,
  Feather,
  FontAwesome6,
  MaterialIcons,
} from "@expo/vector-icons";
import Button from "@/components/Button";
import { Table, Rows, Row, TableWrapper } from "react-native-table-component";
import { orderHistory } from "./(tabs)/Home";
import { getBookedStan } from "@/services/StanService";

const _width = Dimensions.get("screen").width;
const _height = Dimensions.get("screen").height;

export default function Payment() {
  const navigation = useNavigation();

  const tableHead = ["Stalls", "Date", "Price", "Status"];

  const [stalls, setStalls] = useState<Stan[] | null>(null);

  const fetchItems = async () => {
    const stall = await getBookedStan();
    setStalls(stall);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchItems();
    });

    return unsubscribe;
  }, [navigation]);

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
      title: "Payment Report",
    });
  }, [navigation]);
  const today = new Date();
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{today.toDateString()}</Text>
      <ScrollView style={styles.scroll_view}>
        <Table>
          <Row
            data={tableHead}
            style={styles.tableHead}
            textStyle={styles.text_head}
          ></Row>
          <TableWrapper>
            {stalls &&
              stalls.map((item, index) => (
                <Row
                  key={item.id}
                  data={[
                    item.id.slice(0, 6),
                    new Date(
                      item.until.seconds * 1000 + 43200000
                    ).toLocaleDateString(),
                    item.price,
                    item.paymentStatus ? "completed" : "in progress",
                  ]}
                  style={
                    index % 2 == 1
                      ? { backgroundColor: "#F3F9ED", height: _height * 0.04 }
                      : {}
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
