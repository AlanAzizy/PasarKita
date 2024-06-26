import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  Button,
  Dimensions,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

const _height = Dimensions.get("screen").height;

type searchType = {
  clicked: boolean;
  searchPhrase: string;
  setSearchPhrase: (searchPhrase: string) => void;
  setClicked: (clicked: boolean) => void;
};

const SearchBar = ({
  clicked,
  searchPhrase,
  setSearchPhrase,
  setClicked,
}: searchType) => {
  return (
    <View style={styles.container}>
      <View
        style={
          clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
        }
      >
        {/* search Icon */}
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {clicked && (
          <Entypo
            name="cross"
            size={16}
            color="black"
            style={{ padding: 1 }}
            onPress={() => {
              setSearchPhrase("");
            }}
          />
        )}
      </View>
      {/* cancel button, depending on whether the search bar is clicked or not */}
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    margin: 0,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    height: _height * 0.05,
  },
  searchBar__unclicked: {
    padding: 2,
    paddingHorizontal: 5,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#F7F8F9",
    borderColor: "#E8ECF4",
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 2,
    paddingHorizontal: 12,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#F7F8F9",
    borderColor: "#E8ECF4",
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 16,
    marginLeft: 10,
    width: "90%",
  },
});
