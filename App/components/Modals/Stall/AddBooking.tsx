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
import { bookStan, getUnBookedStan } from "@/services/StanService";
import { useNavigation } from "expo-router";
import DropdownComponent from "@/components/DropDownStall";
import Toast from "react-native-toast-message";

type modalProp = {
  visible: boolean;
  close: () => void;
};

const _height = Dimensions.get("screen").height;
const fix_height = _height;

export default function AddBooking({ visible, close }: modalProp) {
  const [showList, setShowList] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [selectedStall, setSelectedStall] = useState<null | Stan>(null);
  const [custName, setCustName] = useState("");
  const [duration, setDuration] = useState(0);
  const [stalls, setStalls] = useState<Stan[]>([]);

  const fetchItems = async () => {
    const stall = await getUnBookedStan();
    setStalls(stall);
  };

  useEffect(() => {
    fetchItems();
  }, [visible]);

  const removeAll = () => {
    setCustName("");
    setDuration(0);
    setSelectedStall(null);
    close();
  };

  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.title}>
            <Text style={styles.text_title}>Add Booking</Text>
            <AntDesign.Button
              name="close"
              iconStyle={{ width: 16 }}
              size={20}
              color={"#B0B0B0"}
              backgroundColor={"#ffffff"}
              onPress={() => {
                removeAll();
              }}
            />
          </View>
          <View style={styles.input_container}>
            <Text style={styles.sub_title}>Customer/Business Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Customer Name"
              keyboardType="default"
              value={custName}
              onChangeText={(value) => setCustName(value)}
            />
            <Text style={styles.sub_title}>Stalls</Text>
            <DropdownComponent
              stalls={stalls}
              setSelectedStall={setSelectedStall}
            />
            <Text style={styles.sub_title}>Duration</Text>
            <TextInput
              style={styles.input}
              value={duration.toString()}
              placeholder="Duration"
              keyboardType="numeric"
              onChangeText={(value) => setDuration(Number(value))}
            />
            <FlatList
              style={showList ? styles.show_flatlist : styles.not_show_flatlist}
              horizontal={false}
              data={stalls}
              scrollEnabled={true}
              renderItem={({ item }) => {
                if (showList) {
                  return (
                    <Pressable
                      style={styles.list_elemen}
                      onPress={() => {
                        setSelectedStall(item);
                        setShowList(false);
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
          </View>
          <View style={styles.button_container}>
            <Button
              onPress={() => {
                if (selectedStall !== null && duration > 0) {
                  bookStan(selectedStall, duration);
                  Toast.show({
                    type: "success",
                    text1: "Success to add booking",
                  });
                }
                removeAll();
                close();
              }}
              styles={
                custName !== "" &&
                !isNaN(Number(duration)) &&
                selectedStall !== null &&
                duration > 0
                  ? styles.buttonEnable
                  : styles.buttonDisabled
              }
              title="Create Order"
              isLight={custName !== "" && stalls !== null && duration > 0}
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
    top: "66%",
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
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 4,
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
