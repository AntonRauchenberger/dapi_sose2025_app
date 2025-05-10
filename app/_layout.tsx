import { Stack, Slot } from "expo-router";
import { LogBox } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import constants from "./consts";
import { SessionProvider } from "@/lib/Authentification/ctx";
import Firebase from "@/lib/Firebase/Firebase";
import { DogLocationProvider } from "@/lib/Providers/LocationProvider";
import AlarmNotification from "@/components/AlarmNotification";
import { ImageProvider } from "@/lib/Providers/ImageProvider";

LogBox.ignoreAllLogs(true);

export default function RootLayout() {
    Firebase.init();

    return (
        <DogLocationProvider>
            <SessionProvider>
                <ImageProvider>
                    <AlarmNotification />
                    <GestureHandlerRootView>
                        <StatusBar style="dark" />
                        <Stack>
                            <Stack.Screen
                                name="(tabs)"
                                options={{
                                    headerShown: false,
                                }}
                            />
                            <Stack.Screen
                                name="Routes"
                                options={{
                                    headerBackTitle: "Zurück",
                                    title: "Einstellungen",
                                    headerStyle: {
                                        backgroundColor:
                                            constants.BACKGROUND_COLOR,
                                    },
                                    headerTitleStyle: {
                                        color: constants.TEXT_COLOR,
                                        fontSize: 20,
                                    },
                                }}
                            />
                            <Stack.Screen
                                name="CameraRoute"
                                options={{
                                    headerBackTitle: "Zurück",
                                    title: "Kamera",
                                    headerShown: false,
                                }}
                            />
                            <Stack.Screen
                                name="RouteRoute"
                                options={{
                                    headerBackTitle: "Zurück",
                                    title: "Route",
                                    headerShown: false,
                                }}
                            />
                            <Stack.Screen
                                name="signIn"
                                options={{
                                    headerShown: false,
                                }}
                            />
                            <Stack.Screen
                                name="signUp"
                                options={{
                                    headerShown: false,
                                }}
                            />
                            <Stack.Screen
                                name="start"
                                options={{
                                    headerShown: false,
                                }}
                            />
                        </Stack>
                    </GestureHandlerRootView>
                </ImageProvider>
            </SessionProvider>
        </DogLocationProvider>
    );
}
