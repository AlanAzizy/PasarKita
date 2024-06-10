import { Pressable, ScrollView, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "expo-router";
import { useEffect, useState, useContext } from "react";
import { Text, View } from "@/components/Themed";
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
  const [itemSelected, setItemSelected] = useState<Item | null>(null);
  const stanContext = useContext(StanContext);

  const fetchItems = async () => {
    const stokk = await getAllItem(stanContext?.stan);
    setStok(stokk);
    setLokalStok(stokk);
  };
  useEffect(() => {
    fetchItems();
  }, [modalEditProduct, modalAddProduct, modalDeleteProduct]);

  useEffect(() => {
    if (phrase !== "") {
      const newStok = localStok?.filter((item) => {
        if (
          item.name.toLocaleLowerCase().includes(phrase.toLocaleLowerCase())
        ) {
          return item;
        }
      });
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
    const unsubscribe = navigation.addListener("focus", () => {
      fetchItems();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <AddProduct
        visible={modalAddProduct}
        close={() => {
          setModalAddProduct(false);
          fetchItems();
        }}
      />
      <EditProduct
        visible={modalEditProduct}
        close={() => {
          setModalEditProduct(false);
          setItemSelected(null);
          fetchItems();
        }}
        item={itemSelected}
      />
      <DeleteProduct
        visible={modalDeleteProduct}
        close={() => {
          setModalDeleteProduct(false);
          setItemSelected(null);
          fetchItems();
        }}
        id={itemSelected?.id}
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
          {stok && stok.length > 0 ? (
            stok.map((item) => (
              <StockCardEdit
                key={item.id}
                stock={item}
                openEdit={(stock) => {
                  setModalEditProduct(true);
                  setItemSelected(stock);
                }}
                openDelete={(stock) => {
                  setModalDeleteProduct(true);
                  setItemSelected(stock as Item);
                }}
              />
            ))
          ) : (
            <Text style={styles.attention}>
              {stanContext?.stan
                ? "Add Item To Your Stan"
                : "Contact The Market Manager To Get A Stan"}
            </Text>
          )}
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
  attention: {
    fontFamily: "Poppins-Regular",
    fontSize: 30,
    fontWeight: "bold",
    color: "#cacaca",
    textAlign: "center",
  },
});
