import SearchBar from "@/components/SearchBar";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import {
  Modal,
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import Button from "@/components/Button";
import Product, { products } from "@/components/Interface/Product";
import OrderItem from "@/components/OrderItem";
import { OrderContext } from "@/components/Context/OrderContext";

export type orderItem = {
  product: Product;
  num: number;
};

type modalProp = {
  visible: boolean;
  close: () => void;
};

const stalls = [1, 2, 3, 4, 5, 6, 7, 8];

const _height = Dimensions.get("screen").height;
const fix_height = _height;

export default function AddBooking({ visible, close }: modalProp) {
  const [filter, setFilter] = useState("All Stalls");

  return (
    <Modal
      visible={visible}
      transparent={true}
      onDismiss={close}
      onRequestClose={close}
    >
      <TouchableHighlight
        style={styles.container}
        onPress={close}
        underlayColor={"rgba(200,200,200,0.2)"}
      >
        <View style={styles.modal}>
          <View style={styles.title}>
            <AntDesign
              name="filter"
              iconStyle={{ width: 30 }}
              size={20}
              color={"#53845D"}
              backgroundColor={"#ffffff"}
            />
            <Text style={styles.text_title}>Filter</Text>
          </View>
          <View style={styles.input_container}>
            <Pressable
              style={
                filter == "All Stalls" ? styles.input_clicked : styles.input
              }
              onPress={() => setFilter("All Stalls")}
            >
              <Text style={styles.button}>All Stalls</Text>
            </Pressable>
            <Pressable
              style={
                filter == "Booked Stalls" ? styles.input_clicked : styles.input
              }
              onPress={() => setFilter("Booked Stalls")}
            >
              <Text style={styles.button}>Booked Stalls</Text>
            </Pressable>
            <Pressable
              style={
                filter == "Available Stalls"
                  ? styles.input_clicked
                  : styles.input
              }
              onPress={() => setFilter("Available Stalls")}
            >
              <Text style={styles.button}>Available Stalls</Text>
            </Pressable>
          </View>
        </View>
      </TouchableHighlight>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderWidth: 0,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    position: "absolute",
    backgroundColor: "rgba(202,202,202,0.4)",
    zIndex: 10,
    borderRadius: 0,
    borderColor: "#123456",
  },
  modal: {
    minHeight: 100,
    height: "100%",
    width: "50%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
  },
  buttonEnable: {
    backgroundColor: "#FFC008",
    width: "100%",
    height: _height * 0.05,
    borderWidth: 0,
    borderColor: "#ff00f0",
    borderRadius: 5,
    textAlignVertical: "center",
    justifyContent: "center",
    zIndex: 0,
  },
  buttonDisabled: {
    backgroundColor: "#CACACA",
    width: "100%",
    height: _height * 0.05,
    borderWidth: 0,
    borderColor: "#ff00f0",
    borderRadius: 5,
    textAlignVertical: "center",
    justifyContent: "center",
    zIndex: 0,
  },
  title: {
    height: _height * 0.05,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0,
    borderColor: "#0f0ff0",
  },
  text_title: {
    fontSize: 20,
    color: "#53845D",
    fontFamily: "Poppins-Regular",
    fontWeight: "bold",
  },
  input_container: {
    height: "auto",
    zIndex: 2,
    justifyContent: "space-around",
    flexDirection: "column",
    borderColor: "#fff00f",
    borderWidth: 0,
    marginVertical: 10,
  },
  sub_title: {
    fontSize: 18,
    color: "#767676",
    fontFamily: "Poppins-Regular",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    borderColor: "#E8ECF4",
    borderWidth: 2,
    height: _height * 0.04,
    backgroundColor: "#F7F8F9",
    justifyContent: "center",
    paddingHorizontal: 5,
    borderRadius: 8,
    color: "#8391A1",
    marginVertical: 5,
  },
  show_down: {
    width: "100%",
    borderColor: "#E8ECF4",
    borderWidth: 2,
    height: _height * 0.05,
    backgroundColor: "#F7F8F9",
    padding: 10,
    borderRadius: 8,
    color: "#8391A1",
    marginVertical: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  button_container: {
    maxHeight: _height * 0.2,
    height: _height * 0.08,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    borderColor: "#fff000",
    borderWidth: 0,
  },
  show_flatlist: {
    paddingHorizontal: 10,
    marginVertical: 2,
    zIndex: 100,
    maxHeight: 200,
    position: "absolute",
    backgroundColor: "#ffffff",
    width: "100%",
    top: 140,
    borderWidth: 1,
    borderColor: "#53845D",
    borderRadius: 10,
  },
  not_show_flatlist: {
    marginVertical: 2,
    zIndex: 5,
    flex: 1,
    borderWidth: 0,
    borderColor: "#00000f",
  },
  show_order: {
    marginVertical: 2,
    zIndex: 5,
    maxHeight: 0.12 * fix_height,
    backgroundColor: "#ffffff",
    width: "100%",
    borderWidth: 0,
    borderColor: "#1100ff",
    marginTop: 5,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 0,
    color: "#767676",
  },
  input_clicked: {
    width: "100%",
    borderColor: "#8BC34A",
    borderWidth: 2,
    height: _height * 0.04,
    backgroundColor: "#F7F8F9",
    justifyContent: "center",
    paddingHorizontal: 5,
    borderRadius: 8,
    color: "#8391A1",
    marginVertical: 5,
  },
  placeholder: {
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    color: "#999999",
  },
  list_elemen: {
    borderColor: "#bfbfbf",
    borderBottomWidth: 2,
    padding: 2,
  },
});
