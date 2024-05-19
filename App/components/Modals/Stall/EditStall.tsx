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
import OrderItem from "@/components/OrderItem";
import { OrderContext } from "@/components/Context/OrderContext";

const stalls = [1, 2, 3, 4, 5, 6, 7, 8];

export type orderItem = {
  product: Product;
  num: number;
};

type modalProp = {
  visible: boolean;
  close: () => void;
};

const _height = Dimensions.get("screen").height;
const fix_height = _height;

export default function EditStall({ visible, close }: modalProp) {
  const [name, setName] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [showListStatus, setShowListStatus] = useState(false);
  const [showListStall, setShowListStall] = useState(false);
  const [stall, setStall] = useState("Choose Stalls");
  const [status, setStatus] = useState<"Available" | "Booked">("Available");

  const addItem = (item: Product) => {};

  const isValid = name !== "" && price > 0;

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
            <Pressable
              onPress={() => setShowListStall(!showListStall)}
              style={styles.show_down}
            >
              <Text style={styles.placeholder}>{stall}</Text>
              <SimpleLineIcons
                name={showListStall ? "arrow-up" : "arrow-down"}
                size={18}
                color={"#767676"}
              />
            </Pressable>
            <FlatList
              style={
                showListStall
                  ? styles.show_flatlist_stall
                  : styles.not_show_flatlist
              }
              horizontal={false}
              data={stalls}
              scrollEnabled={true}
              renderItem={({ item }) => {
                if (showListStall) {
                  return (
                    <Pressable
                      style={styles.list_elemen}
                      onPress={() => {
                        setStall(String(`Stall ${item}`));
                        setShowListStall(false);
                      }}
                    >
                      <Text
                        style={{ color: "#767676", fontSize: 16, padding: 5 }}
                      >
                        {`Stall ${item}`}
                      </Text>
                    </Pressable>
                  );
                } else {
                  return <View></View>;
                }
              }}
            />
            <Text style={styles.sub_title}>Status</Text>
            <Pressable
              onPress={() => setShowListStatus(!showListStatus)}
              style={styles.show_down}
            >
              <Text style={styles.placeholder}>{status}</Text>
              <SimpleLineIcons
                name={showListStatus ? "arrow-up" : "arrow-down"}
                size={18}
                color={"#767676"}
              />
            </Pressable>
            <FlatList
              style={
                showListStatus
                  ? styles.show_flatlist_status
                  : styles.not_show_flatlist
              }
              horizontal={false}
              data={["Available", "Booked"]}
              scrollEnabled={true}
              renderItem={({ item }) => {
                if (showListStatus) {
                  return (
                    <Pressable
                      style={styles.list_elemen}
                      onPress={() => {
                        if (item == "Available") {
                          setStatus("Available");
                        } else {
                          setStatus("Booked");
                        }
                        setShowListStatus(false);
                      }}
                    >
                      <Text
                        style={{ color: "#767676", fontSize: 16, padding: 5 }}
                      >
                        {`${item}`}
                      </Text>
                    </Pressable>
                  );
                } else {
                  return <View></View>;
                }
              }}
            />
            <Text style={styles.sub_title}>Price</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => setName(value)}
              placeholder="Price"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.button_container}>
            <Button
              onPress={() => {
                setName("");
                setPrice(0);
                setStock(0);
                close();
              }}
              styles={
                name !== "" && price > 0
                  ? styles.buttonEnable
                  : styles.buttonDisabled
              }
              title="Edit Product"
              isLight={name !== "" && price > 0}
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
    fontSize: 18,
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
