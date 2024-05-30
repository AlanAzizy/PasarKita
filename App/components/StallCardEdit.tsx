import { Feather, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
  Pressable,
} from "react-native";
import { Stocks } from "./StockCard";
import { Stan } from "@/constants/Types";

type addModalType = {
  stock: Stan;
  openEdit: () => void;
  openDelete: () => void;
};

const _width = Dimensions.get("screen").width;
const _height = Dimensions.get("screen").height;

export default function StallCardEdit({
  stock,
  openEdit,
  openDelete,
}: addModalType) {
  const { id, price, paymentStatus, until, availibility } = stock;
  const date = new Date(until.seconds * 1000 + 43200000);
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.number_container,
          availibility ? {} : { backgroundColor: "#DBECC7" },
        ]}
      >
        <Text style={[styles.number]}>{id.slice(0, 3)}</Text>
      </View>
      <View style={[styles.non_image, { alignItems: "flex-start" }]}>
        <View style={styles.key}>
          <Text style={[styles.text_key, { fontSize: 16, fontWeight: "bold" }]}>
            {`Stall ${id.slice(0, 3)}`}
          </Text>
          <Text style={styles.text_key}>Status</Text>
          <Text style={styles.text_key}>Price</Text>
        </View>
        <View
          style={[
            styles.val,
            {
              alignItems: "center",
              flex: 4,
            },
          ]}
        >
          <Text style={[styles.text_key, { fontSize: 14 }]}>
            {availibility
              ? ""
              : `${date.getMonth() - new Date().getMonth() + 1} Months left `}
          </Text>
        </View>
        <View style={styles.val}>
          <View style={styles.button_container}>
            <Pressable
              style={{
                width: "auto",
                height: "auto",
              }}
              onPress={openEdit}
            >
              <FontAwesome6 name="pen-to-square" size={18} color={"#469ED0"} />
            </Pressable>
            <Pressable
              style={{ width: "auto", height: "auto" }}
              onPress={openDelete}
            >
              <Feather name="trash-2" size={18} color={"#ff1111"} />
            </Pressable>
          </View>
          <Text style={[styles.text_key, { fontWeight: "bold" }]}>
            {paymentStatus ? "paid" : "unpaid"}
          </Text>
          <Text style={[styles.text_key, { fontWeight: "bold" }]}>{price}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 0,
    borderColor: "#CACACA",
    width: "100%",
    height: _height * 0.12,
    backgroundColor: "#ffffff",
    borderRadius: 1,
    marginVertical: 2,
    padding: 10,
    justifyContent: "space-between",
    borderBottomWidth: 2,
    alignItems: "center",
  },
  number_container: {
    flexDirection: "row",
    borderWidth: 3,
    borderColor: "#A2CF6E",
    flex: 1,
    width: _height * 0.1,
    height: _height * 0.1,
    padding: 2,
    alignItems: "center",
    borderRadius: 15,
    justifyContent: "center",
    fontWeight: "bold",
  },
  non_image: {
    flex: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  key: {
    flexDirection: "column",
    borderWidth: 0,
    borderColor: "#ffff00",
    backgroundColor: "#FFFFFF",
    height: "100%",
    flex: 3,
    padding: 2,
    paddingHorizontal: 8,
    alignItems: "stretch",
    borderRadius: 5,
    justifyContent: "space-between",
  },
  text_key: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#8C8C8C",
    flex: 1,
  },
  button_container: {
    flexDirection: "row",
    borderWidth: 0,
    borderColor: "#ff00ff",
    backgroundColor: "#FFFFFF",
    height: "100%",
    flex: 1,
    padding: 0,
    marginTop: 2,
    paddingHorizontal: 0,
    alignItems: "flex-start",
    alignSelf: "flex-start",
    justifyContent: "flex-end",
    borderRadius: 5,
    marginRight: 0,
    width: "100%",
  },
  val: {
    flexDirection: "column",
    borderWidth: 0,
    borderColor: "#ffff00",
    backgroundColor: "#FFFFFF",
    height: "100%",
    flex: 2.5,
    padding: 0,
    paddingLeft: 8,
    alignItems: "flex-end",
    borderRadius: 5,
    justifyContent: "space-between",
  },
  number: {
    fontFamily: "Poppins-Regular",
    fontSize: 30,
    textAlign: "center",
    textAlignVertical: "center",
    color: "#53845D",
  },
});
