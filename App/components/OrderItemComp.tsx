import { Pressable, Text, View, Dimensions, StyleSheet } from "react-native";
import { OrderItem } from "@/constants/Types";
import { AntDesign } from "@expo/vector-icons";
import useFonts from "./useFonts";
import { useContext } from "react";
import { OrderContext } from "./Context/OrderContext";
import Product from "./Interface/Product";
import { Item } from "@/constants/Types";
import Toast from "react-native-toast-message";

const _height = Dimensions.get("screen").height;

export default function OrderItemComp({
  id,
  item,
  product,
  number,
}: OrderItem) {
  const orderContext = useContext(OrderContext);

  const addNumber = (product: Item) => {
    const newOrder = orderContext?.orders?.map((e) => {
      if (e.product == product) {
        if (product.stok > 1 + e.number) {
          e.number += 1;
        } else {
          Toast.show({ type: "error", text1: "Failed to add" });
        }
      }
      return e;
    });
    orderContext?.setOrders(newOrder);
  };

  const minNumber = (product: Item) => {
    const newOrder = orderContext?.orders?.filter((e) => {
      if (e.product == product) {
        e.number -= 1;
      }
      if (e.number > 0) {
        return e;
      }
    });
    if (newOrder !== undefined && newOrder?.length > 0) {
      orderContext?.setOrders(newOrder);
      // orderContext?.setOrders([]);
    } else {
      orderContext?.setOrders([]);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{product.name.slice(0, 12)}</Text>
      <View style={{ flexDirection: "row", gap: 4 }}>
        <Pressable
          onPress={() => {
            minNumber(product);
          }}
          style={styles.button}
        >
          <AntDesign name="minus" size={14} color="#759D7D" />
        </Pressable>
        <Text style={styles.number}>{number}</Text>
        <Pressable
          onPress={() => {
            addNumber(product);
          }}
          style={styles.button}
        >
          <AntDesign name="plus" size={14} color="#759D7D" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: _height * 0.05,
    backgroundColor: "",
    borderColor: "#759D7D",
    borderWidth: 2,
    marginVertical: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  name: {
    color: "#767676",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  button: {
    justifyContent: "center",
    height: 20,
    width: 20,
    paddingHorizontal: 2,
    backgroundColor: "#CAD9CD",
    borderRadius: 3,
    borderColor: "#759D7D",
    borderWidth: 1,
  },
  number: {
    color: "#759D7D",
    justifyContent: "center",
    height: 20,
    width: 40,
    paddingHorizontal: 2,
    backgroundColor: "#fafafa",
    borderRadius: 3,
    borderColor: "#759D7D",
    borderWidth: 1,
    textAlign: "center",
  },
});
