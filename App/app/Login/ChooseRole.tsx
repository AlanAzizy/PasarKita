import { View, StyleSheet, Text, TextInput, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { Link, router, useNavigation } from "expo-router";
import useFonts from "@/components/useFonts";
import Button from "@/components/Button";

const _height = Dimensions.get("screen").height;

export default function ChooseRole() {
  const navigation = useNavigation();

  useEffect(() => {
    useFonts();
  });

  useEffect(() => {
    navigation.setOptions({ headerShown: true, title: "" });
  }, [navigation]);

  const [role, setRole] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.title_text}>Choose your role!</Text>
      </View>
      <View style={styles.role_container}>
        <Button
          onPress={() => {
            setRole("Market Owner");
          }}
          title="Market Owner"
          styles={role == "Market Owner" ? styles.roleClick : styles.roleButton}
          isLight={false}
          size={20}
        />
        <Button
          onPress={() => {
            setRole("Stall Owner");
          }}
          title="Stall Owner"
          styles={role == "Stall Owner" ? styles.roleClick : styles.roleButton}
          isLight={false}
          size={20}
        />
      </View>
      <View style={styles.button_container}>
        <Button
          onPress={() => {
            router.push({
              pathname: "/Login/RegisterScreen",
              params: { role: role },
            });
          }}
          title="Save"
          styles={styles.buttonLogin}
          isLight={true}
          size={16}
        />
      </View>
      <View style={styles.link_container}>
        <Link style={styles.link} push href="/">
          Already have an account? Login now
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    borderWidth: 0,
    borderColor: "#0ff000",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  buttonLogin: {
    backgroundColor: "#53845D",
    width: "90%",
    height: _height * 0.06,
    borderWidth: 0,
    borderColor: "#ff00f0",
    borderRadius: 5,
    textAlignVertical: "center",
    justifyContent: "center",
  },
  roleButton: {
    width: "100%",
    borderColor: "#E8ECF4",
    borderWidth: 2,
    height: "30%",
    backgroundColor: "#F7F8F9",
    borderRadius: 8,
    color: "#8391A1",
    padding: 10,
    paddingLeft: 20,
    paddingRight: "50%",
    marginVertical: 10,
    alignItems: "flex-start",
  },
  roleClick: {
    width: "100%",
    borderColor: "#8BC34A",
    borderWidth: 2,
    height: "30%",
    backgroundColor: "#F3F9ED",
    borderRadius: 8,
    color: "#8391A1",
    padding: 10,
    paddingLeft: 20,
    marginVertical: 10,
    alignItems: "flex-start",
  },
  title: {
    flex: 4.5,
    borderWidth: 0,
    borderColor: "#ff1111",
    width: "100%",
    justifyContent: "center",
    margin: 5,
    padding: 20,
  },
  title_text: {
    fontFamily: "Poppins-Regular",
    color: "#53845D",
    width: "80%",
    fontSize: 28,
    fontWeight: "bold",
  },
  role_container: {
    flex: 7,
    borderWidth: 0,
    borderColor: "#ff1111",
    width: "90%",
  },
  button_container: {
    flex: 3,
    borderWidth: 0,
    borderColor: "#ff1111",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  link_container: {
    flex: 11,
    borderWidth: 0,
    borderColor: "#ff1111",
    width: "100%",
  },
  link: {
    flex: 3,
    textAlignVertical: "bottom",
    marginBottom: 20,
    fontFamily: "Poppins-Regular",
    color: "#35C2C1",
    width: "100%",
    borderWidth: 0,
    borderColor: "#111111",
    textAlign: "center",
  },
});
