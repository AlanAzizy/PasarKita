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

type addModalType = {
  stock: Stocks;
  openEdit: () => void;
  openDelete: () => void;
};

const _width = Dimensions.get("screen").width;
const _height = Dimensions.get("screen").height;

export default function StockCardEdit({
  stock,
  openEdit,
  openDelete,
}: addModalType) {
  const { name, id, current_number, price } = stock;

  return (
    <View style={styles.container}>
      <View style={styles.image_container}>
        <Image
          style={{ resizeMode: "contain", width: "100%" }}
          source={require("../assets/images/splash-icon.png")}
        />
      </View>
      <View style={styles.non_image}>
        <View style={styles.key}>
          <Text style={[styles.text_key, { fontSize: 16, fontWeight: "bold" }]}>
            {name}
          </Text>
          <Text style={styles.text_key}>Stok</Text>
          <Text style={styles.text_key}>Price</Text>
        </View>
        <View style={styles.button_container}>
          <Pressable
            style={{ width: "auto", height: "auto" }}
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
        <View style={styles.val}>
          <Text
            style={[
              styles.text_key,
              { fontSize: 16, color: "#53845D", fontWeight: "bold" },
            ]}
          >
            {id}
          </Text>
          <Text style={[styles.text_key]}>{current_number}</Text>
          <Text style={[styles.text_key, { color: "#63B59A" }]}>{price}</Text>
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
    padding: 5,
    justifyContent: "space-between",
    borderBottomWidth: 2,
    alignItems: "center",
  },
  image_container: {
    flexDirection: "row",
    borderWidth: 0,
    borderColor: "#00fff0",
    flex: 1,
    width: "auto",
    padding: 2,
    alignItems: "center",
    borderRadius: 15,
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
    alignItems: "flex-start",
    borderRadius: 5,
  },
  text_key: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#8C8C8C",
  },
  button_container: {
    flexDirection: "row",
    borderWidth: 0,
    borderColor: "#ff00ff",
    backgroundColor: "#FFFFFF",
    height: "100%",
    flex: 1,
    padding: 2,
    marginTop: 5,
    paddingHorizontal: 8,
    alignItems: "flex-start",
    alignSelf: "flex-start",
    justifyContent: "space-evenly",
    borderRadius: 5,
  },
  val: {
    flexDirection: "column",
    borderWidth: 0,
    borderColor: "#ffff00",
    backgroundColor: "#FFFFFF",
    height: "100%",
    flex: 2,
    padding: 2,
    paddingHorizontal: 8,
    alignItems: "flex-end",
    borderRadius: 5,
  },
});
