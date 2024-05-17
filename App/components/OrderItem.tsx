import { Pressable, Text, View, Dimensions, StyleSheet } from "react-native";
import { orderItem } from "./Modals/Tenant/CreateOrder";
import { AntDesign } from "@expo/vector-icons";
import useFonts from "./useFonts";
import { useContext } from "react";
import { OrderContext } from "./Context/OrderContext";
import Product from "./Interface/Product";

const _height = Dimensions.get("screen").height;

export default function OrderItem({ product, num }: orderItem) {
  const orderContext = useContext(OrderContext);

  const addNumber = (product: Product) => {
    const newOrder = orderContext?.orders?.map((e) => {
      if (e.product == product) {
        e.num += 1;
      }
      return e;
    });
    orderContext?.setOrders(newOrder);
  };

  const minNumber = (product: Product) => {
    const newOrder = orderContext?.orders?.filter((e) => {
      if (e.product == product) {
        e.num -= 1;
      }
      if (e.num > 0) {
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
      <Text style={styles.name}>{product.name}</Text>
      <View style={{ flexDirection: "row", gap: 4 }}>
        <Pressable
          onPress={() => {
            minNumber(product);
          }}
          style={styles.button}
        >
          <AntDesign name="minus" size={14} color="#759D7D" />
        </Pressable>
        <Text style={styles.number}>{num}</Text>
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
