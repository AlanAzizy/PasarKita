import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { Link, router, useNavigation } from "expo-router";
import useFonts from "@/components/useFonts";
import Button from "@/components/Button";
import { FontAwesome } from "@expo/vector-icons";
// import Toast from "react-native-toast-message";
import {
  GetUserData,
  GetUserDataOnce,
  LoginServices,
} from "@/services/AuthService";
import Toast from "react-native-toast-message";
import { UserContext } from "@/components/Context/UserContext";
import { StanContext } from "@/components/Context/StanContext";
import { getCurrentStan, updateStanStatus } from "@/services/StanService";

const _height = Dimensions.get("screen").height;
const fix_height = _height;
export default function LoginScreen() {
  const navigation = useNavigation();
  const [isObscure, setObscure] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userContext = useContext(UserContext);
  const stanContext = useContext(StanContext);

  async function login() {
    setLoading(true);
    try {
      const response = await LoginServices({ email, password });
      const user = await GetUserDataOnce();
      userContext?.setUser(user);
      const stan = await getCurrentStan(user);
      stanContext?.setStan(stan);
      await updateStanStatus();
      Toast.show({
        type: "success",
        text1: "Login Successful",
        text2: `Welcome back to PasarKita!`,
      });
      user?.role == "Market Owner"
        ? router.replace("../Stall/Home")
        : router.replace("../Tenant/Home");
    } catch (error) {
      console.log("err");
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error as string,
      });
    }
    setLoading(false);
  }

  useEffect(() => {
    useFonts();
  });

  useEffect(() => {
    navigation.setOptions({ headerShown: true, title: "" });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.title_text}>
          Welcome back! Please login to your account
        </Text>
      </View>
      <View style={styles.input_container}>
        <TextInput
          value={email}
          style={styles.input_style}
          placeholder="Enter Your Email Address"
          keyboardType="default"
          onChangeText={(value) => setEmail(value)}
        />
        <TextInput
          value={password}
          style={styles.input_style}
          placeholder="Enter Your Password"
          keyboardType="default"
          onChangeText={(value) => setPassword(value)}
        />
        <Link
          style={[styles.link, { color: "#8391A1" }]}
          href="/Login/LoginScreen"
        >
          Forgot password?
        </Link>
      </View>
      <View
        style={{
          flex: 3,
          borderWidth: 0,
          borderColor: "#ff1111",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          onPress={() => {
            login();
          }}
          title="Login"
          styles={styles.buttonLogin}
          isLight={true}
          size={18}
        />
      </View>
      <View
        style={{
          flex: 4,
          borderWidth: 0,
          borderColor: "#ff1111",
          width: "90%",
        }}
      >
        <View
          style={{
            flex: 1,
            borderWidth: 0,
            borderColor: "#ff1111",
            width: "100%",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 1,
              borderWidth: 0,
              borderColor: "#ff1111",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: "#E8ECF4",
                width: "100%",
                height: 0,
              }}
            ></View>
          </View>
          <View
            style={{
              flex: 1,
              borderWidth: 0,
              borderColor: "#ff1111",
              width: "100%",
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                textAlign: "center",
                color: "#121212",
              }}
            >
              Or Login with
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              borderWidth: 0,
              borderColor: "#ff111",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: "#E8ECF4",
                width: "100%",
                height: 0,
              }}
            ></View>
          </View>
        </View>
        <View
          style={{
            flex: 4,
            borderWidth: 0,
            borderColor: "#ff1111",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 12,
          }}
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: "#E8ECF4",
              width: "30%",
              height: "70%",
              borderRadius: 6,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome name="facebook-f" size={32} color={"#4092FF"} />
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#E8ECF4",
              width: "30%",
              height: "70%",
              borderRadius: 6,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                height: 32,
                width: 32,
                borderColor: "#ff0000",
                borderWidth: 0,
              }}
              source={require("../../assets/images/google.png")}
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#E8ECF4",
              width: "30%",
              height: "70%",
              borderRadius: 6,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome name="apple" size={32} color="black" />
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 7,
          borderWidth: 0,
          borderColor: "#ff1111",
          width: "100%",
        }}
      >
        <Link style={styles.link_2} push href="/">
          Don't have an account? Register now
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: _height,
    alignItems: "center",
    borderWidth: 0,
    borderColor: "#0ff000",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    minHeight: fix_height * 0.8,
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
  input_container: {
    flex: 7,
    borderWidth: 0,
    borderColor: "#ff1111",
    width: "90%",
  },
  input_style: {
    width: "100%",
    borderColor: "#E8ECF4",
    borderWidth: 2,
    height: _height * 0.07,
    backgroundColor: "#F7F8F9",
    borderRadius: 8,
    color: "#8391A1",
    padding: 10,
    marginVertical: 10,
  },
  link: {
    textAlignVertical: "bottom",
    fontFamily: "Poppins-Regular",
    width: "100%",
    borderWidth: 0,
    borderColor: "#111111",
    textAlign: "right",
  },
  link_2: {
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
