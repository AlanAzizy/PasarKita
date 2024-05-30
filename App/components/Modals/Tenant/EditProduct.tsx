import SearchBar from "@/components/SearchBar";
import { AntDesign } from "@expo/vector-icons";
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
import { Item } from "@/constants/Types";
import { editItem } from "@/services/ItemService";
import { StanContext } from "@/components/Context/StanContext";

type modalProp = {
  visible: boolean;
  close: () => void;
  item: Item | null;
};

const _height = Dimensions.get("screen").height;
const fix_height = _height;

export default function EditProduct({ visible, close, item }: modalProp) {
  const [name, setName] = useState(item ? item.name : "");
  const [stock, setStock] = useState(item ? item.stok : 0);
  const [price, setPrice] = useState(item ? item.price : 0);

  const stanContext = useContext(StanContext);
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.title}>
            <Text style={styles.text_title}>Edit Product</Text>
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
            <Text style={styles.sub_title}>Product Name</Text>
            <TextInput
              style={styles.input}
              defaultValue={item?.name}
              onChangeText={(value) => setName(value)}
              placeholder="Product Name"
              keyboardType="default"
            />
            <Text style={styles.sub_title}>Stock</Text>
            <TextInput
              style={styles.input}
              defaultValue={item?.stok.toString()}
              onChangeText={(value) => setStock(Number(value))}
              placeholder="Product Stock"
              keyboardType="numeric"
            />
            <Text style={styles.sub_title}>Price</Text>
            <TextInput
              style={styles.input}
              defaultValue={item?.price.toString()}
              onChangeText={(value) => setPrice(Number(value))}
              placeholder="Product Price"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.button_container}>
            <Button
              onPress={() => {
                editItem(stanContext?.stan, {
                  id: item?.id,
                  name: name,
                  price: price,
                  stok: stock,
                  additional: stock - item?.stok,
                  image: item?.image,
                } as Item);
                setName("");
                setPrice(0);
                setStock(0);
                close();
              }}
              styles={
                name !== "" &&
                price > 0 &&
                (name !== item?.name ||
                  price !== item.price ||
                  stock !== item.stok)
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
});
