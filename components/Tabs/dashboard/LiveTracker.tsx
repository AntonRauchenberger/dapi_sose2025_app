import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
} from "react-native";
import constants from "@/app/consts";
import { router } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React, { useEffect, useRef, useState } from "react";
import { useDogLocation } from "@/lib/Providers/LocationProvider";
import LocationService from "@/lib/Services/LocationService";

export default function LiveTracker() {
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const { dogLocation } = useDogLocation();
    const [distance, setDistance] = useState<number>(0);

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 700,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 700,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [fadeAnim]);

    useEffect(() => {
        async function handle() {
            if (dogLocation) {
                const userLocation =
                    await LocationService.getCurrentUserLocation();
                if (!userLocation) {
                    return;
                }
                const dDistance = LocationService.getDistanceBetweenLocations(
                    userLocation,
                    dogLocation
                );
                setDistance(dDistance);
            }
        }

        handle();
    }, [dogLocation]);

    const styles = StyleSheet.create({
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
                    <Text style={{ fontWeight: "bold" }}>{distance} km</Text>{" "}
                    von dir entfernt
                </Text>
            </View>
        </TouchableOpacity>
    );
}
