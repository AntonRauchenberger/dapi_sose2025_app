import { Stack } from "expo-router";
import { LogBox } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
                </Stack>
            </GestureHandlerRootView>
        </>
    );
}
