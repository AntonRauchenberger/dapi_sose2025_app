import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import constants from "@/app/consts";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useDogLocation } from "@/lib/Providers/LocationProvider";
import LocationService from "@/lib/Services/LocationService";

export default function Header({ animate = true }: { animate?: boolean }) {
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
        container: {
            height: 100,
            marginBottom: 21,
        },
        background: {
            height: "80%",
            backgroundColor: constants.BACKGROUND_COLOR,
        },
        tracker: {
            backgroundColor: constants.TEXT_COLOR,
            width: "89%",
            margin: "auto",
            height: 60,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 15,
            transform: "translateY(-30px)",
            gap: 8,
        },
        trackerText: {
            color: constants.FONT_COLOR,
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.background}></View>
            <View style={styles.tracker}>
                {animate ? (
                    <Animated.View style={{ opacity: fadeAnim }}>
                        <FontAwesome6
                            name="map-location-dot"
                            size={24}
                            color={constants.FONT_COLOR}
                        />
                    </Animated.View>
                ) : (
                    <FontAwesome6
                        name="map-location-dot"
                        size={24}
                        color={constants.FONT_COLOR}
                    />
                )}

                <Text style={styles.trackerText}>
                    <Text style={{ fontWeight: "bold" }}>{distance} km</Text>{" "}
                    von dir entfernt
                </Text>
            </View>
        </View>
    );
}
