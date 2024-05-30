import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Item } from "@/constants/Types";
import { getAllItem } from "@/services/OrderService";
import { UserContext } from "./Context/UserContext";
import { auth } from "firebase-admin";
import { OrderContext } from "./Context/OrderContext";

const DropdownComponent = () => {
  const [data, setData] = useState<Item[]>([]);
  const [value, setValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const orderContext = useContext(OrderContext);
  const userContext = useContext(UserContext);
  const getData = async () => {
    const result = await getAllItem(userContext?.user);
    setData(result);
  };
  useEffect(() => {
    try {
      getData();
    } catch (err) {
      console.log("cant get data");
    }
  }, []);

  const setOrder = (value: Item) => {
    let isNew = true;
    const order = [...orderContext?.orders];
    const updatedOrders = orderContext.orders.map((order) => {
      if (order.product.id == value.id) {
        // Assuming each order has an id
        // Create a new object with the updated attribute
        isNew = false;
        return { product: order.product, num: order.num + 1 };
      }
      return order; // Return unchanged objects
    });
    if (isNew) {
      updatedOrders?.push({ product: value, num: 1 });
    }
    orderContext?.setOrders(updatedOrders);
  };

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data.map((item) => {
          return { label: item.name, value: item };
        })}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select item" : "..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue("");
          setOrder(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? "blue" : "black"}
            name="Safety"
            size={20}
          />
        )}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 1,
  },
  dropdown: {
    height: 40,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#E8ECF4",
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#8391A1",
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
