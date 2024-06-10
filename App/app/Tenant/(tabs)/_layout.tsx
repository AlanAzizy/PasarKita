import React from "react";
import { FontAwesome, FontAwesome5, Feather, Entypo } from "@expo/vector-icons";
import { Link, Tabs } from "expo-router";
import { Pressable, View } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#629372",
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          headerTitleStyle: {
            color: "#53845D",
            fontWeight: "bold",
            fontFamily: "Poppins-Regular",
            fontSize: 24,
          },
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Entypo name="home" color={color} size={25} />
          ),
          headerRight: () => (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link href="/Home/Profile" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome5
                      name="user-circle"
                      size={30}
                      color={
                        Colors[colorScheme ?? "light"].text
                          ? Colors[colorScheme ?? "light"].text
                          : "black"
                      }
                      style={{ marginRight: "6%", opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
              <Link href="/Home/Setting" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <Feather
                      name="settings"
                      size={30}
                      color={
                        Colors[colorScheme ?? "light"].text
                          ? Colors[colorScheme ?? "light"].text
                          : "black"
                      }
                      style={{ marginRight: "8%", opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Stocks"
        options={{
          title: "Stocks",
          tabBarIcon: ({ color }) => (
            <Feather name="box" color={color} size={25} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="Report"
        options={{
          title: "Report",
          tabBarIcon: ({ color }) => (
            <Entypo name="text-document" color={color} size={25} />
          ),
        }}
      /> */}
    </Tabs>
  );
}
