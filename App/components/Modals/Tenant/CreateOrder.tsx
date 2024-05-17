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

const _height = Dimensions.get("screen").height;
const fix_height = _height;

export default function CreateOrder({ visible, close }: modalProp) {
  const [phrase, setPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const orderContext = useContext(OrderContext);

  const addItem = (item: Product) => {
    if (orderContext !== null) {
      if (orderContext.orders?.length == 0) {
        orderContext?.setOrders([{ product: item, num: 1 }]);
      } else if (orderContext?.orders !== null) {
        orderContext?.setOrders([
          ...orderContext.orders,
          { product: item, num: 1 },
        ]);
      }
    }
  };

  const calculate = () => {
    let num = 0;
    orderContext?.orders?.forEach((e) => {
      num += e.product.price * e.num;
    });
    return num;
  };

  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.title}>
            <Text style={styles.text_title}>Create New Order</Text>
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
            <Text style={styles.sub_title}>Cashier ID</Text>
            <TextInput
              style={styles.input}
              placeholder="insert your ID"
              keyboardType="default"
            />
            <Text style={styles.sub_title}>Search Product</Text>
            <SearchBar
              clicked={clicked}
              searchPhrase={phrase}
              setClicked={setClicked}
              setSearchPhrase={setPhrase}
            />
            <FlatList
              style={
                phrase !== "" ? styles.show_flatlist : styles.not_show_flatlist
              }
              horizontal={false}
              data={products as Product[]}
              renderItem={({ item }) => {
                if (phrase !== "") {
                  return (
                    <Pressable
                      style={{ zIndex: 5 }}
                      onPress={() => addItem(item)}
                    >
                      <Text
                        style={{ color: "#767676", fontSize: 16, padding: 5 }}
                      >
                        {item.name}
                      </Text>
                    </Pressable>
                  );
                } else {
                  return <View></View>;
                }
              }}
            />
            <View style={{ maxHeight: 500 }}>
              <FlatList
                style={
                  orderContext?.orders !== null
                    ? styles.show_order
                    : { flex: 0, maxHeight: 10, height: 0 }
                }
                horizontal={false}
                data={orderContext?.orders as orderItem[]}
                renderItem={({ item, index }) => {
                  return <OrderItem product={item.product} num={item.num} />;
                }}
              />
            </View>
          </View>
          <View style={styles.button_container}>
            {orderContext?.orders && orderContext.orders.length > 0 && (
              <View style={styles.total}>
                <Text style={styles.total_text}>Total</Text>
                <Text style={styles.total_text}>Rp{calculate()}</Text>
              </View>
            )}
            <Button
              onPress={() => {
                if (orderContext?.orders && orderContext?.orders.length > 0) {
                  orderContext.setOrders([]);
                  close();
                }
              }}
              styles={
                orderContext?.orders && orderContext?.orders.length > 0
                  ? styles.buttonEnable
                  : styles.buttonDisabled
              }
              title="Create Order"
              isLight={
                orderContext?.orders !== undefined &&
                orderContext?.orders !== null &&
                orderContext?.orders.length > 0
              }
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
  show_flatlist: {
    paddingVertical: 5,
    marginVertical: 2,
    zIndex: 100,
    height: "auto",
    position: "absolute",
    backgroundColor: "#ffffff",
    width: "100%",
    top: 160,
    borderWidth: 2,
    borderColor: "#e0e0e0",
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
  total_text: {
    fontSize: 20,
    fontFamily: "Poppins-Regular",
    color: "#767676",
    fontWeight: "bold",
  },
});
