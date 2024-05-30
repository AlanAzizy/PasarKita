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
} from "react-native";
import { useContext, useEffect, useState } from "react";
import Button from "@/components/Button";
import Product, { products } from "@/components/Interface/Product";
import OrderItem from "@/components/OrderItemComp";
import { OrderContext } from "@/components/Context/OrderContext";
import { Item, Stan } from "@/constants/Types";
import DropdownStall from "@/components/DropDownStall";
import { editStan, getAllStan } from "@/services/StanService";
import DropdownBinary from "@/components/DropDownBinary";
import Toast from "react-native-toast-message";

const stalls = [1, 2, 3, 4, 5, 6, 7, 8];

type modalProp = {
  visible: boolean;
  close: () => void;
  stan: Stan | null;
};

const _height = Dimensions.get("screen").height;
const fix_height = _height;

export default function EditStall({ visible, close, stan }: modalProp) {
  const [name, setName] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [showListStatus, setShowListStatus] = useState(false);
  const [showListStall, setShowListStall] = useState(false);
  const [status, setStatus] = useState<string>("Available");
  const [payment, setPayment] = useState<string>("in progress");
  const [stalls, setStalls] = useState<Stan[]>([]);

  const fetchItems = async () => {
    const stall = await getAllStan();
    setStalls(stall);
  };

  useEffect(() => {
    fetchItems();
  }, [visible]);

  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.title}>
            <Text style={styles.text_title}>Edit Stall</Text>
            <AntDesign.Button
              name="close"
              iconStyle={{ width: 16 }}
              size={20}
              color={"#B0B0B0"}
              backgroundColor={"#ffffff"}
              onPress={close}
            />
          </View>
          <View style={styles.input_container}>
            <Text style={styles.sub_title}>Stall</Text>
            <TextInput
              style={styles.input}
              defaultValue={stan?.id}
              keyboardType="numeric"
              editable={false}
            />
            <Text style={styles.sub_title}>Status</Text>
            <DropdownBinary
              status={["available", "booked"]}
              setStatus={setStatus}
            />
            <Text style={styles.sub_title}>Payment Status</Text>
            <DropdownBinary
              status={["completed", "in progress"]}
              setStatus={setPayment}
            />
            <Text style={styles.sub_title}>Price</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => setPrice(Number(value))}
              placeholder="Price"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.button_container}>
            <Button
              onPress={() => {
                console.log(payment, status);
                if (stan !== null) {
                  editStan(
                    stan,
                    price,
                    payment == "completed",
                    status == "available"
                  );
                  Toast.show({
                    type: "success",
                    text1: "Success to edit stall",
                  });
                }
                setPrice(0);
                setStock(0);
                close();
              }}
              styles={
                stan !== null && price > 0
                  ? styles.buttonEnable
                  : styles.buttonDisabled
              }
              title="Edit Stall"
              isLight={stan !== null && price > 0}
              size={16}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderWidth: 4,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "rgba(202,202,202,0.4)",
    zIndex: 1,
  },
  modal: {
    minHeight: 100,
    height: "auto",
    width: "65%",
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
  show_flatlist_stall: {
    paddingHorizontal: 10,
    marginVertical: 2,
    zIndex: 100,
    maxHeight: 200,
    position: "absolute",
    backgroundColor: "#ffffff",
    width: "100%",
    top: 70,
    borderWidth: 1,
    borderColor: "#53845D",
    borderRadius: 10,
  },
  show_flatlist_status: {
    paddingHorizontal: 10,
    marginVertical: 2,
    zIndex: 100,
    maxHeight: 200,
    position: "absolute",
    backgroundColor: "#ffffff",
    width: "100%",
    top: 145,
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
  list_elemen: {
    borderColor: "#bfbfbf",
    borderBottomWidth: 2,
    padding: 2,
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
  },
  sub_title: {
    fontSize: 16,
    color: "#767676",
    fontFamily: "Poppins-Regular",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    borderColor: "#E8ECF4",
    borderWidth: 2,
    height: _height * 0.05,
    backgroundColor: "#F7F8F9",
    padding: 10,
    borderRadius: 8,
    color: "#8391A1",
    marginVertical: 1,
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
  placeholder: {
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    color: "#999999",
  },
});
