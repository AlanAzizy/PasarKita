import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Pressable,
  TextInput,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { useNavigation, router } from "expo-router";
import useFonts from "@/components/useFonts";
import Button from "@/components/Button";
import { UserContext } from "@/components/Context/UserContext";

const _width = Dimensions.get("screen").width;
const _height = Dimensions.get("screen").height;
const fix_height = _height;

type image = {
  name: string;
};

export default function Profile() {
  const navigation = useNavigation();

  const userContext = useContext(UserContext);
  const [name, setName] = useState(userContext?.user.username);
  const [email, setEmail] = useState(userContext?.user.email);
  const [password, setPassword] = useState("******");
  const [number, setNumber] = useState(userContext?.user.phoneNumber);
  const [photoUrl, setPhotoUrl] = useState(userContext?.user.photoUrl);

  useEffect(() => {
    useFonts();
  });

  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      headerTitleStyle: {
        color: "#53845D",
        fontWeight: "bold",
        fontFamily: "Poppins-Regular",
        fontSize: 24,
      },
      title: "Edit Profile",
    });
  }, [navigation]);

  // const submitData = () => {
  //   const storageRef = ref(storage, "Images/" + image.name);

  //   uploadBytes(storageRef, image).then((snapshot)=>{
  //     getDownloadURL().then((url)=>{

  //     }).catch((error)=>{
  //       console.log(error.message)
  //     })
  //     console.log('upload a file')
  //   }).catch((error)=>{
  //     console.log(error.message);
  //   })
  // };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={100}
        style={styles.avoid_keyboard}
      >
        <View style={styles.image_container}>
          <Pressable
            onPress={() => {
              console.log("awkowkwowkok");
            }}
            style={styles.image_clicker}
          >
            <Image src={photoUrl} style={styles.image}></Image>
          </Pressable>
        </View>
        <View style={styles.input_container}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input_text}
            value={name}
            onChangeText={(value) => {
              setName(value);
            }}
            placeholder="Enter Your Email Address"
            keyboardType="default"
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input_text}
            value={email}
            onChangeText={(value) => {
              setEmail(value);
            }}
            placeholder="Enter Your Email"
            keyboardType="default"
          />
          <Text style={styles.label}>Number</Text>
          <TextInput
            style={styles.input_text}
            value={number}
            onChangeText={(value) => {
              setNumber(value);
            }}
            placeholder="Enter Your Email Address"
            keyboardType="numeric"
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input_text}
            value={password}
            onChangeText={(value) => {
              setPassword(value);
            }}
            placeholder="Enter Your Password"
            keyboardType="default"
          />
        </View>
      </KeyboardAvoidingView>
      <View style={styles.save_container}>
        <Button
          onPress={() => {
            console.log("jaran");
            console.log(password);
          }}
          title="Save Changes"
          styles={styles.save}
          isLight={true}
          size={18}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderWidth: 0,
    borderColor: "#0ff000",
    backgroundColor: "#ffffff",
    alignItems: "center",
    minHeight: 0.8 * fix_height,
  },
  account: {
    width: "90%",
    height: _height * 0.22,
    marginVertical: 5,
    marginTop: 20,
    borderWidth: 0,
    borderColor: "#00ff00",
  },
  image: {
    width: _height * 0.15,
    height: _height * 0.15,
    borderRadius: _height * 0.075,
    borderWidth: 2,
    borderColor: "#1f1f1f",
  },
  about: {
    width: "90%",
    height: _height * 0.2,
    marginVertical: 5,
    borderWidth: 0,
    borderColor: "#00ff00",
  },
  action: {
    width: "90%",
    height: _height * 0.14,
    marginVertical: 5,
  },
  label: {
    fontSize: 20,
    color: "#53845D",
    marginLeft: 5,
    marginTop: 1,
    fontWeight: "bold",
    height: fix_height * 0.03,
  },
  account_2: {
    backgroundColor: "rgba(39,39,96,0.05)",
    width: "100%",
    height: "100%",
    flex: 1,
    borderWidth: 0,
    borderColor: "#ff0000",
    borderRadius: 5,
    padding: 8,
    justifyContent: "center",
  },
  menu: {
    height: _height * 0.04,
    borderWidth: 0,
    borderColor: "#000000",
    backgroundColor: "none",
    marginVertical: 2,
    flex: 1,
    flexDirection: "row",
    marginLeft: "5%",
    alignItems: "center",
  },
  menuText: {
    color: "#000000",
    opacity: 2,
    marginLeft: "10%",
    fontSize: 18,
  },
  save: {
    backgroundColor: "#53845D",
    width: "90%",
    height: _height * 0.06,
    borderWidth: 0,
    borderColor: "#ff00f0",
    borderRadius: 15,
    textAlignVertical: "center",
    justifyContent: "center",
  },
  avoid_keyboard: {
    flex: 13,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0,
    borderColor: "#00ffff",
  },
  image_container: {
    flex: 5,
    borderWidth: 0,
    borderColor: "#ff1111",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  image_clicker: {
    flex: 1,
    height: "auto",
    borderWidth: 0,
    borderColor: "#ff1111",
    width: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  input_container: {
    flex: 7,
    borderWidth: 0,
    borderColor: "#ff1111",
    width: "90%",
    justifyContent: "center",
    zIndex: 2,
    backgroundColor: "#ffffff",
    minHeight: fix_height * 0.22,
  },
  input_text: {
    width: "100%",
    borderColor: "#000ff0",
    borderWidth: 0,
    height: fix_height * 0.06,
    backgroundColor: "#F7F8F9",
    borderRadius: 8,
    color: "#8391A1",
    padding: 10,
    marginVertical: 10,
  },
  save_container: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
  },
});
