import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Item, Stan } from "@/constants/Types";
import { getAllItem } from "@/services/ItemService";
import { UserContext } from "./Context/UserContext";
import { auth } from "firebase-admin";
import { OrderContext } from "./Context/OrderContext";
import { StanContext } from "./Context/StanContext";
import { useNavigation } from "expo-router";
import { getUnBookedStan } from "@/services/StanService";

type aState = {
  stalls: Stan[];
  setSelectedStall: (stan: Stan) => void;
};

const DropdownStall = ({ stalls, setSelectedStall }: aState) => {
  const [value, setValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (!(value !== "") || isFocus) {
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
        data={stalls.map((item) => {
          console.log("#####");
          console.log(item);
          return { label: `Stall ${item.id.slice(0, 7)}`, value: item };
        })}
        search
        maxHeight={250}
        labelField="label"
        valueField="value"
        placeholder={
          value == "" ? (!isFocus ? "Select Stall" : "") : `Stall ${value}`
        }
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value.id.slice(0, 6));
          setSelectedStall(item.value);
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

export default DropdownStall;

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
