import { Pressable, ScrollView, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "expo-router";
import { useEffect, useState, useContext } from "react";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { stocks } from "./Home";
import StockCardEdit from "@/components/StockCardEdit";
import SearchBar from "@/components/SearchBar";
import AddProduct from "@/components/Modals/Tenant/AddProduct";
import { AntDesign } from "@expo/vector-icons";
import EditProduct from "@/components/Modals/Tenant/EditProduct";
import DeleteProduct from "@/components/Modals/Tenant/DeleteProduct";
import { getAllItem } from "@/services/ItemService";
import { Item } from "@/constants/Types";
import { StanContext } from "@/components/Context/StanContext";

const _height = Dimensions.get("screen").height;

export default function Stocks() {
  const navigation = useNavigation();

  const [phrase, setPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [modalAddProduct, setModalAddProduct] = useState(false);
  const [modalEditProduct, setModalEditProduct] = useState(false);
  const [modalDeleteProduct, setModalDeleteProduct] = useState(false);
  const [stok, setStok] = useState<Item[] | null>(null);
  const [localStok, setLokalStok] = useState<Item[] | null>(null);
  const stanContext = useContext(StanContext);

  const fetchItems = async () => {
    const stokk = await getAllItem(stanContext?.stan);
    setStok(stokk);
    setLokalStok(stokk);
  };
  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (phrase !== "") {
      console.log("konnnn");
      const newStok = stok?.filter((item) => {
        if (
          item.name.toLocaleLowerCase().includes(phrase.toLocaleLowerCase())
        ) {
          return item;
        }
      });
      console.log("---------");
      console.log(newStok);
      setStok(newStok);
    } else {
      setStok(localStok);
    }
  }, [phrase]);

  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "left",
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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <AddProduct
        visible={modalAddProduct}
        close={() => setModalAddProduct(false)}
      />
      <EditProduct
        visible={modalEditProduct}
        close={() => setModalEditProduct(false)}
      />
      <DeleteProduct
        visible={modalDeleteProduct}
        close={() => setModalDeleteProduct(false)}
      />
      <View style={{ width: "90%", margin: 15 }}>
        <SearchBar
          clicked={clicked}
          searchPhrase={phrase}
          setClicked={setClicked}
          setSearchPhrase={setPhrase}
        />
      </View>
      <ScrollView style={styles.container}>
        <View style={{ width: "95%", marginHorizontal: "2.5%" }}>
          {stok &&
            stok.map((item) => (
              <StockCardEdit
                key={item.id}
                stock={item}
                openEdit={() => setModalEditProduct(true)}
                openDelete={() => {
                  setModalDeleteProduct(true);
                }}
              />
            ))}
        </View>
      </ScrollView>
      <Pressable
        style={styles.add_stock}
        onPress={() => setModalAddProduct(true)}
      >
        <AntDesign name="plus" size={_height * 0.05} color={"#fafafa"} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
    flex: 1,
    borderColor: "#111111",
    borderWidth: 0,
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
  add_stock: {
    position: "absolute",
    bottom: _height * 0.02,
    right: _height * 0.02,
    width: _height * 0.08,
    height: _height * 0.08,
    backgroundColor: "#53845D",
    borderRadius: _height * 0.04,
    justifyContent: "center",
    alignItems: "center",
  },
});
