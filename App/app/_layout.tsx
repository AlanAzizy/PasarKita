import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "expo-dev-client";
import { useColorScheme } from "@/components/useColorScheme";
import OrderProvider, { OrderContext } from "@/components/Context/OrderContext";
import UserProvider, { UserContext } from "@/components/Context/UserContext";
import Toast from "react-native-toast-message";
import StanProvider from "@/components/Context/StanContext";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <OrderProvider>
        <UserProvider>
          <StanProvider>
            <Stack>
              <Stack.Screen
                name="Login/Welcome"
                options={{ headerShown: false }}
              />
              {/* <Stack.Screen name="modal" options={{}} /> */}
              <Stack.Screen
                name="Stall/(tabs)"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Tenant/(tabs)"
                options={{ headerShown: false }}
              />
            </Stack>
            <Toast />
          </StanProvider>
        </UserProvider>
      </OrderProvider>
    </ThemeProvider>
  );
}
