import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import constants from "@/app/consts";
import { Redirect, Stack } from "expo-router";
import { useSession } from "@/lib/Authentification/ctx";
import { ActivityIndicator, Text, View } from "react-native";

/**
 * Tab-Navigationslayout für die Hauptbereiche der App mit Authentifizierungs-Check.
 */
export default function TabsLayout() {
    const { session, isLoading } = useSession();

    if (isLoading) {
        return (
            <View
                style={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator />
            </View>
        );
    }

    if (!session) {
        return <Redirect href="/start" />;
    }

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: constants.TEXT_COLOR,
                tabBarStyle: { backgroundColor: constants.BACKGROUND_COLOR },
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <Ionicons
                            name={focused ? "home-sharp" : "home-outline"}
                            size={30}
                            color={color}
                        />
                    ),
                    headerShown: false,
                    tabBarLabel: "Start",
                }}
            />
            <Tabs.Screen
                name="map"
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <Ionicons
                            name={focused ? "map-sharp" : "map-outline"}
                            size={30}
                            color={color}
                        />
                    ),
                    headerShown: false,
                    tabBarLabel: "Map",
                }}
            />
            <Tabs.Screen
                name="dashboard"
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <Ionicons
                            name={
                                focused
                                    ? "analytics-sharp"
                                    : "analytics-outline"
                            }
                            size={30}
                            color={color}
                        />
                    ),
                    headerShown: false,
                    tabBarLabel: "Dashboard",
                }}
            />
            <Tabs.Screen
                name="camera"
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <Ionicons
                            name={focused ? "camera-sharp" : "camera-outline"}
                            size={30}
                            color={color}
                        />
                    ),
                    headerShown: false,
                    tabBarLabel: "Camera",
                }}
            />
        </Tabs>
    );
}
