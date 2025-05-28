import { Stack, Slot } from "expo-router";
import { LogBox } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import constants from "./consts";
import { SessionProvider } from "@/lib/Authentification/ctx";
import Firebase from "@/lib/Firebase/Firebase";
import { CurrentDataProvider } from "@/lib/Providers/CurrentDataProvider";
import AlarmNotification from "@/components/AlarmNotification";
import { ImageProvider } from "@/lib/Providers/ImageProvider";
import { StatisticsProvider } from "@/lib/Providers/StatisticsProvider";
import { RecordProvider } from "@/lib/Providers/RecordProvider";

LogBox.ignoreAllLogs(true);

export default function RootLayout() {
    Firebase.init();

    return (
        <RecordProvider>
            <StatisticsProvider>
                <CurrentDataProvider>
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
                </CurrentDataProvider>
            </StatisticsProvider>
        </RecordProvider>
    );
}
