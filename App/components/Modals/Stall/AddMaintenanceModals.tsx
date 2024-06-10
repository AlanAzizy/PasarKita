import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import {
  Modal,
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  Platform,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import Button from "@/components/Button";
import { OrderContext } from "@/components/Context/OrderContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Item, schedule } from "@/constants/Types";
import { addSchedule } from "@/services/ScheduleService";

type modalProp = {
  visible: boolean;
  close: () => void;
};

const stalls = [1, 2, 3, 4, 5, 6, 7, 8];

const _height = Dimensions.get("screen").height;
const fix_height = _height;

export default function AddBooking({ visible, close }: modalProp) {
  const orderContext = useContext(OrderContext);
  const [pic, setPIC] = useState("");
  const [area, setArea] = useState(0);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");

  const removeAll = () => {
    setPIC("");
    setArea(0);
    setDate(new Date());
  };

  const [time, setTime] = useState(new Date());
  //...
  const onChange = (event: Event, selectedValue: Date) => {
    setShow(Platform.OS === "ios");
    if (mode == "date") {
      const currentDate = selectedValue || new Date();
      setDate(currentDate);
      setMode("time");
      setShow(Platform.OS !== "ios"); // to show the picker again in time mode
    } else {
      const selectedTime = selectedValue || new Date();
      setTime(selectedTime);
      const newdate = date;
      newdate.setHours(
        selectedTime.getHours(),
        selectedTime.getMinutes(),
        selectedTime.getSeconds(),
        selectedTime.getMilliseconds()
      );
      setDate(newdate);
      setShow(Platform.OS === "ios");
      setMode("date");
    }
  };

  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.title}>
            <Text style={styles.text_title}>Add Cleaning Duty</Text>
            <AntDesign.Button
              name="close"
              iconStyle={{ width: 16 }}
              size={20}
              color={"#B0B0B0"}
              backgroundColor={"#ffffff"}
              onPress={() => {
                close();
              }}
            />
          </View>
          <View style={styles.input_container}>
            <Text style={styles.sub_title}>PIC</Text>
            <TextInput
              style={styles.input}
              placeholder="Officer Name"
              keyboardType="default"
              value={pic}
              onChangeText={(value) => setPIC(value)}
            />
            <Text style={styles.sub_title}>Cleaning Area</Text>
            <TextInput
              style={styles.input}
              value={area.toString()}
              placeholder="Cleaning Area"
              keyboardType="default"
              onChangeText={(value) => setArea(Number(value))}
            />
            <Text style={styles.sub_title}>Schedule</Text>
            <Pressable
              onPress={() => {
                setShow(true);
              }}
              style={[
                styles.input,
                { paddingVertical: 1, justifyContent: "center" },
              ]}
            >
              <Text style={styles.placeholder}>{date.toDateString()}</Text>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  timeZoneOffsetInMinutes={0}
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
            </Pressable>
          </View>
          <View style={styles.button_container}>
            <Button
              onPress={() => {
                addSchedule({
                  worker: pic,
                  blockNumber: area,
                  startTime: date,
                  type: "cleaning",
                } as schedule);
                removeAll();
                close();
              }}
              styles={
                pic !== "" && area !== 0 && date !== undefined
                  ? styles.buttonEnable
                  : styles.buttonDisabled
              }
              title="Create Order"
              isLight={pic !== "" && area !== 0 && date !== undefined}
              size={16}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderWidth: 4,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "rgba(202,202,202,0.4)",
    zIndex: 1,
  },
  modal: {
    minHeight: 100,
    height: "auto",
    width: "65%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
  },
  buttonEnable: {
    backgroundColor: "#FFC008",
    width: "100%",
    height: _height * 0.05,
    borderWidth: 0,
    borderColor: "#ff00f0",
    borderRadius: 5,
    textAlignVertical: "center",
    justifyContent: "center",
    zIndex: 0,
  },
  buttonDisabled: {
    backgroundColor: "#CACACA",
    width: "100%",
    height: _height * 0.05,
    borderWidth: 0,
    borderColor: "#ff00f0",
    borderRadius: 5,
    textAlignVertical: "center",
    justifyContent: "center",
    zIndex: 0,
  },
  title: {
    height: _height * 0.05,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0,
    borderColor: "#0f0ff0",
  },
  text_title: {
    fontSize: 20,
    color: "#53845D",
    fontFamily: "Poppins-Regular",
    fontWeight: "bold",
  },
  input_container: {
    height: "auto",
    zIndex: 2,
    justifyContent: "space-around",
    flexDirection: "column",
    borderColor: "#fff00f",
    borderWidth: 0,
  },
  sub_title: {
    fontSize: 16,
    color: "#767676",
    fontFamily: "Poppins-Regular",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    borderColor: "#E8ECF4",
    borderWidth: 2,
    height: _height * 0.05,
    backgroundColor: "#F7F8F9",
    padding: 10,
    borderRadius: 8,
    color: "#8391A1",
    marginVertical: 1,
  },
  show_down: {
    width: "100%",
    borderColor: "#E8ECF4",
    borderWidth: 2,
    height: _height * 0.05,
    backgroundColor: "#F7F8F9",
    padding: 10,
    borderRadius: 8,
    color: "#8391A1",
    marginVertical: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  button_container: {
    maxHeight: _height * 0.2,
    height: _height * 0.08,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    borderColor: "#fff000",
    borderWidth: 0,
  },
  show_flatlist: {
    paddingHorizontal: 10,
    marginVertical: 2,
    zIndex: 100,
    maxHeight: 200,
    position: "absolute",
    backgroundColor: "#ffffff",
    width: "100%",
    top: 140,
    borderWidth: 1,
    borderColor: "#53845D",
    borderRadius: 10,
  },
  not_show_flatlist: {
    marginVertical: 2,
    zIndex: 5,
    flex: 1,
    borderWidth: 0,
    borderColor: "#00000f",
  },
  show_order: {
    marginVertical: 2,
    zIndex: 5,
    maxHeight: 0.12 * fix_height,
    backgroundColor: "#ffffff",
    width: "100%",
    borderWidth: 0,
    borderColor: "#1100ff",
    marginTop: 5,
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    color: "#888888",
  },
  placeholder: {
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    color: "#999999",
  },
  list_elemen: {
    borderColor: "#bfbfbf",
    borderBottomWidth: 2,
    padding: 2,
  },
});
