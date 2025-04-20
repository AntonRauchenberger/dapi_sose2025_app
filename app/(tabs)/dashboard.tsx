import React, { useEffect, useRef } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Animated,
} from "react-native";
import constants from "../consts";
import StatCards from "@/components/Tabs/dashboard/StatCards";
import { router } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function Dashboard() {
    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [fadeAnim]);

    const styles = StyleSheet.create({
        container: {
            height: 100,
        },
        background: {
            height: "80%",
            backgroundColor: constants.BACKGROUND_COLOR,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        headline: {
            color: constants.TEXT_COLOR,
            fontSize: 20,
            marginTop: 31,
        },
        tracker: {
            width: "97%",
            margin: "auto",
            height: 60,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 15,
            borderWidth: 3,
            borderColor: constants.TEXT_COLOR,
            marginTop: 10,
        },
        trackerText: {
            color: constants.TEXT_COLOR,
        },
        trackerContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
        },
    });

    return (
        <View style={{ backgroundColor: constants.FONT_COLOR }}>
            <View style={styles.container}>
                <View style={styles.background}>
                    <Text style={styles.headline}>Dashboard</Text>
                </View>
            </View>
            <StatCards />
            <TouchableOpacity
                style={styles.tracker}
                activeOpacity={0.8}
                onPress={() => router.navigate("/(tabs)/map")}
            >
                <View style={styles.trackerContainer}>
                    <Animated.View style={{ opacity: fadeAnim }}>
                        <FontAwesome6
                            name="map-location-dot"
                            size={24}
                            color={constants.TEXT_COLOR}
                        />
                    </Animated.View>
                    <Text style={styles.trackerText}>
                        <Text style={{ fontWeight: "bold" }}>{2} km</Text> von
                        dir entfernt
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
