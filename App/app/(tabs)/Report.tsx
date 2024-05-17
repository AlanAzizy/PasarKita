import {
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { stocks } from "./Home";
import StockCardEdit from "@/components/StockCardEdit";
import SearchBar from "@/components/SearchBar";
import { Feather, Entypo, FontAwesome6, FontAwesome } from "@expo/vector-icons";

const _width = Dimensions.get("screen").width;
const _height = Dimensions.get("screen").height;

export default function Stocks() {
  const navigation = useNavigation();

  const [phrase, setPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      headerTitleStyle: {
        color: "#53845D",
        fontWeight: "bold",
        fontFamily: "Poppins-Regular",
        fontSize: 24,
      },
    });
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setPhrase("");
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.stat_container}>
        <Text style={styles.sub_title}>Statistic</Text>
        <Image
          source={require("../../assets/images/Stat.png")}
          resizeMode="contain"
          style={styles.image}
        ></Image>
      </View>
      <View style={styles.stat_menu}>
        <View style={styles.menu_container}>
          <Pressable style={styles.menu_press_1}>
            <View
              style={[styles.icon_container, { backgroundColor: "#A2CF6E" }]}
            >
              <FontAwesome
                name="line-chart"
                size={_height * 0.035}
                color={"#ffffff"}
              />
            </View>
            <Text style={[styles.text_menu, { marginHorizontal: 20 }]}>
              Profit
            </Text>
          </Pressable>
          <Pressable style={styles.menu_press_1}>
            <View
              style={[styles.icon_container, { backgroundColor: "#4BAEE6" }]}
            >
              <Feather name="box" size={_height * 0.035} color={"#ffffff"} />
            </View>
            <Text style={[styles.text_menu, { marginHorizontal: 20 }]}>
              Product Performance
            </Text>
          </Pressable>
          <Pressable style={styles.menu_press_1}>
            <View
              style={[styles.icon_container, { backgroundColor: "#FFC008" }]}
            >
              <Feather name="user" size={_height * 0.035} color={"#ffffff"} />
            </View>
            <Text style={[styles.text_menu, { marginHorizontal: 20 }]}>
              Customer Traffic
            </Text>
          </Pressable>
          <Pressable style={styles.menu_press_1}>
            <View
              style={[styles.icon_container, { backgroundColor: "#F24D1F" }]}
            >
              <Feather name="book" size={_height * 0.035} color={"#ffffff"} />
            </View>
            <Text style={[styles.text_menu, { marginHorizontal: 20 }]}>
              Order Quantity
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.export_container}>
        <Text style={styles.sub_title}>Export</Text>
        <View style={styles.menu_container_2}>
          <Pressable style={styles.menu_press_2}>
            <View
              style={[styles.icon_container, { backgroundColor: "#4BAEE6" }]}
            >
              <Feather
                name="printer"
                color={"#ffffff"}
                size={_height * 0.04}
                style={{ borderWidth: 0, borderColor: "#ff0000" }}
              ></Feather>
            </View>
            <Text style={styles.text_menu}>Print</Text>
          </Pressable>
          <Pressable style={styles.menu_press_2}>
            <View
              style={[styles.icon_container, { backgroundColor: "#A2CF6E" }]}
            >
              <Entypo
                name="spreadsheet"
                color={"#ffffff"}
                size={_height * 0.04}
                style={{ borderWidth: 0, borderColor: "#ff0000" }}
              />
            </View>
            <Text style={styles.text_menu}>Excel</Text>
          </Pressable>
          <Pressable style={styles.menu_press_2}>
            <View
              style={[styles.icon_container, { backgroundColor: "#F24D1F" }]}
            >
              <FontAwesome6
                name="file-pdf"
                color={"#ffffff"}
                size={_height * 0.04}
                style={{ borderWidth: 0, borderColor: "#ff0000" }}
              ></FontAwesome6>
            </View>
            <Text style={styles.text_menu}>Pdf</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
    flex: 1,
    borderColor: "#111111",
    borderWidth: 0,
    backgroundColor: "#FAFAFA",
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  stat_container: {
    flex: 2.5,
    width: "90%",
    alignItems: "center",
    borderWidth: 0,
    borderColor: "#f000ff",
    marginTop: 20,
  },
  sub_title: {
    alignSelf: "flex-start",
    fontSize: 20,
    fontFamily: "Poppins-Regular",
    color: "#767676",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: "90%",
    borderColor: "#000ff0",
    borderWidth: 0,
  },
  stat_menu: {
    flex: 2,
    width: "90%",
    alignItems: "center",
    borderWidth: 0,
    borderColor: "#f000ff",
    backgroundColor: "#FAFAFA",
  },
  menu_container: {
    flex: 2,
    width: "90%",
    alignItems: "center",
    borderWidth: 0,
    borderColor: "#f000ff",
    backgroundColor: "#FAFAFA",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
  },
  menu_press_1: {
    borderRadius: 10,
    width: "45%",
    height: "35%",
    backgroundColor: "#ffffff",
    borderWidth: 0,
    borderColor: "#aa00ff",
    alignItems: "center",
    padding: 10,
    flexDirection: "row",
  },
  icon_container: {
    height: _height * 0.05,
    width: _height * 0.05,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  export_container: {
    flex: 2.5,
    width: "90%",
    alignItems: "center",
    borderWidth: 0,
    borderColor: "#f000ff",
    backgroundColor: "#FAFAFA",
    gap: 10,
  },
  menu_container_2: {
    flex: 3,
    gap: 25,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    padding: 20,
    borderWidth: 0,
    borderColor: "#111111",
    backgroundColor: "#fafafa",
  },
  menu_press_2: {
    flex: 3,
    gap: 25,
    flexWrap: "nowrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 0,
    borderColor: "#111111",
    borderRadius: 10,
  },
  text_menu: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#767676",
    fontWeight: "700",
  },
});
