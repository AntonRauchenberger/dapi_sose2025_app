import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "'ffd33d",
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
                    tabBarLabel: "Feed",
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
            <Tabs.Screen
                name="account"
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <Ionicons
                            name={
                                focused ? "settings-sharp" : "settings-outline"
                            }
                            size={30}
                            color={color}
                        />
                    ),
                    headerShown: false,
                    tabBarLabel: "Account",
                }}
            />
        </Tabs>
    );
}
