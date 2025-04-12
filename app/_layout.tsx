import { Stack } from "expo-router";
import { LogBox } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import constants from "./consts";

LogBox.ignoreAllLogs(true);

export default function RootLayout() {
    return (
        <>
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
                                backgroundColor: constants.BACKGROUND_COLOR,
                            },
                            headerTitleStyle: {
                                color: constants.TEXT_COLOR,
                                fontSize: 20,
                            },
                        }}
                    />
                </Stack>
            </GestureHandlerRootView>
        </>
    );
}
