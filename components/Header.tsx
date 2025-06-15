import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import constants from "@/app/consts";
import { useCurrentData } from "@/lib/Providers/CurrentDataProvider";
import LocationService from "@/lib/Services/LocationService";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRecord } from "@/lib/Providers/RecordProvider";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

/**
 * Header-Komponente mit Standortanzeige, Distanz, Akku, Status und Aufnahme-Indikator.
 */
export default function Header() {
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const { dogLocation, currentData } = useCurrentData();
    const [distance, setDistance] = useState<number>(0);
    const { isRecording } = useRecord();
    const blinkAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(blinkAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(blinkAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

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
            zIndex: 2,
        },
        background: {
            height: "80%",
            backgroundColor: constants.BACKGROUND_COLOR,
        },
        tracker: {
            backgroundColor: constants.TEXT_COLOR,
            width: "97%",
            margin: "auto",
            borderRadius: 15,
            transform: "translateY(-44px)",
            padding: 8,
        },
        gpsContainer: {
            display: "flex",
            flexDirection: "row",
            gap: 9,
        },
        mapIconContainer: {
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            padding: 7,
            borderRadius: 8,
            width: 35,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        trackerTextValue: {
            color: constants.FONT_COLOR,
            fontSize: 13,
            fontWeight: 600,
        },
        trackerSubText: {
            color: constants.FONT_COLOR,
            fontSize: 11,
            opacity: 0.6,
        },
        cardContainer: {
            display: "flex",
            flexDirection: "row",
            gap: 10,
            marginTop: 6,
        },
        card: {
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            padding: 7,
            borderRadius: 8,
            width: "48.5%",
        },
        valueContainer: {
            display: "flex",
            flexDirection: "row",
            gap: 3,
            alignItems: "center",
        },
        valueText: {
            color: constants.FONT_COLOR,
            fontSize: 11,
            opacity: 0.8,
        },
        statusIcon: {
            backgroundColor:
                currentData?.status === "Läuft"
                    ? "#22c55e"
                    : currentData?.status === "Schüttelt sich"
                    ? "rgb(245, 158, 11)"
                    : "rgb(148, 163, 184)",
            width: 8,
            height: 8,
            borderRadius: "50%",
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.background}></View>
            <View style={styles.tracker}>
                <View style={styles.gpsContainer}>
                    <View style={styles.mapIconContainer}>
                        <FontAwesome5
                            name="map-marker-alt"
                            size={18}
                            color={constants.FONT_COLOR}
                        />
                    </View>
                    <View>
                        <Text style={styles.trackerTextValue}>
                            {distance} km
                        </Text>
                        <Text style={styles.trackerSubText}>
                            von dir entfernt
                        </Text>
                    </View>
                    {isRecording && (
                        <Animated.View
                            style={{
                                opacity: blinkAnim,
                                position: "absolute",
                                right: 0,
                                transform: [{ translateY: 2 }],
                            }}
                        >
                            <MaterialCommunityIcons
                                name="record-rec"
                                size={26}
                                color={constants.COMPLEMENTARY_COLOR}
                            />
                        </Animated.View>
                    )}
                </View>
                <View style={styles.cardContainer}>
                    <View style={styles.card}>
                        <View style={styles.valueContainer}>
                            <MaterialIcons
                                name="battery-full"
                                size={16}
                                color={constants.FONT_COLOR}
                            />
                            <Text style={styles.valueText}>
                                {currentData?.battery}%
                            </Text>
                        </View>
                    </View>
                    <View style={styles.card}>
                        <View
                            style={[
                                styles.valueContainer,
                                {
                                    transform: [
                                        { translateX: 2 },
                                        { translateY: 1.5 },
                                    ],
                                },
                            ]}
                        >
                            <View style={styles.statusIcon}></View>
                            <Text style={styles.valueText}>
                                {currentData?.status}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
