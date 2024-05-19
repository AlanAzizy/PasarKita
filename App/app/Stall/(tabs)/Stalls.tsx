import { Pressable, ScrollView, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { stocks } from "../../Tenant/(tabs)/Home";
import StallCardEdit from "@/components/StallCardEdit";
import SearchBar from "@/components/SearchBar";
import AddProduct from "@/components/Modals/Tenant/AddProduct";
import { AntDesign } from "@expo/vector-icons";
import EditProduct from "@/components/Modals/Tenant/EditProduct";
import DeleteProduct from "@/components/Modals/Tenant/DeleteProduct";
import Filter from "../../../components/Modals/Stall/Filter";
import AddStall from "@/components/Modals/Stall/AddStall";
import EditStall from "@/components/Modals/Stall/EditStall";
import DeleteStall from "@/components/Modals/Stall/DeleteStall";

const _height = Dimensions.get("screen").height;

export default function Stocks() {
  const navigation = useNavigation();

  const [phrase, setPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [modalAddStall, setModalAddStall] = useState(false);
  const [modalEditStall, setModalEditStall] = useState(false);
  const [modalDeleteStall, setModalDeleteStall] = useState(false);
  const [filterModal, setFilterModal] = useState(false);

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
      <Filter visible={filterModal} close={() => setFilterModal(false)} />
      <AddStall visible={modalAddStall} close={() => setModalAddStall(false)} />
      <EditStall
        visible={modalEditStall}
        close={() => setModalEditStall(false)}
      />
      <DeleteStall
        visible={modalDeleteStall}
        close={() => setModalDeleteStall(false)}
      />
      <View
        style={{
          width: "90%",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <View style={{ flex: 9, margin: 5 }}>
          <SearchBar
            clicked={clicked}
            searchPhrase={phrase}
            setClicked={setClicked}
            setSearchPhrase={setPhrase}
          />
        </View>
        <Pressable style={styles.filter} onPress={() => setFilterModal(true)}>
          <AntDesign name="filter" size={30} color={"#8A8A8A"} />
        </Pressable>
      </View>
      <ScrollView style={styles.container}>
        <View style={{ width: "95%", marginHorizontal: "2.5%" }}>
          {stocks.map((item) =>
            item.id ? (
              <StallCardEdit
                key={item.id}
                stock={item}
                openEdit={() => setModalEditStall(true)}
                openDelete={() => {
                  setModalDeleteStall(true);
                }}
              />
            ) : (
              ""
            )
          )}
        </View>
      </ScrollView>
      <Pressable
        style={styles.add_stock}
        onPress={() => setModalAddStall(true)}
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
  filter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
