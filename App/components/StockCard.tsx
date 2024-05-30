import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, View, Dimensions, Text, Image } from "react-native";
import { Item } from "@/constants/Types";
import { defaultPhoto } from "@/app/Login/RegisterScreen";

const _width = Dimensions.get("screen").width;
const _height = Dimensions.get("screen").height;

export default function StockCard({ id, name, stok, additional, image }: Item) {
  console.log(image);
  return (
    <View style={styles.container}>
      <View style={styles.image_container}>
        <Image
          style={{ height: "100%", width: "100%" }}
          src={image ? image : defaultPhoto}
        />
      </View>
      <View style={styles.key}>
        <Text style={styles.name}>{name}</Text>
        <Text>{id}</Text>
      </View>
      <View style={styles.number}>
        <Text
          style={[
            styles.number_text,
            { color: additional > 0 ? "#8BC34A" : "#EA5C2F" },
          ]}
        >
          {additional}
        </Text>
        {additional > 0 ? (
          <Feather name="arrow-up" size={18} color={"#8BC34A"} />
        ) : (
          <Feather name="arrow-down" size={18} color={"#EA5C2F"} />
        )}
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
    height: _width * 0.2,
    width: _width * 0.2,
    padding: 2,
    alignItems: "center",
    borderRadius: 15,
  },
  key: {
    flexDirection: "column",
    borderWidth: 0,
    borderColor: "#000000",
    backgroundColor: "#FFFFFF",
    height: _width * 0.15,
    width: _width * 0.4,
    padding: 2,
    paddingHorizontal: 8,
    alignItems: "flex-start",
    borderRadius: 5,
  },
  name: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#8C8C8C",
  },
  number: {
    flexDirection: "row",
    borderWidth: 0,
    borderColor: "#ffffff",
    backgroundColor: "#FFFFFF",
    height: _width * 0.12,
    width: _width * 0.2,
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  number_text: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    marginHorizontal: 4,
    textAlignVertical: "center",
  },
});
