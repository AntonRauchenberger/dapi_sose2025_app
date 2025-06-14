import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import constants from "@/app/consts";
import { useCurrentData } from "@/lib/Providers/CurrentDataProvider";
import LocationService from "@/lib/Services/LocationService";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRecord } from "@/lib/Providers/RecordProvider";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type MoodMeterProps = {
    activityStats: any;
};

export default function MoodMeter({ activityStats }: MoodMeterProps) {
    const [activityLevel, setActivityLevel] = useState("Mittel");

    useEffect(() => {
        switch (activityStats?.status) {
            case "Aktiv":
                setActivityLevel("Hoch");
                break;
            case "Erholt":
                setActivityLevel("Mittel");
                break;
            case "Sehr erholt":
                setActivityLevel("Niedrig");
                break;
            case "Erschöpft":
                setActivityLevel("Sehr niedrig");
                break;
            default:
                setActivityLevel("Mittel");
                break;
        }
    }, [activityStats]);

    const styles = StyleSheet.create({
        wrapper: {
            backgroundColor:
                activityStats?.status === "Aktiv"
                    ? "rgb(22, 170, 76)"
                    : activityStats?.status === "Erschöpft"
                    ? "rgb(207, 88, 24)"
                    : "rgba(52, 73, 94, 0.9)",
            width: "97%",
            margin: "auto",
            borderRadius: 15,
            padding: 12,
        },
        statusContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 11,
        },
        statusIcon: {
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            padding: 7,
            borderRadius: "50%",
            width: 11,
            height: 11,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        cardContainer: {
            display: "flex",
            flexDirection: "row",
            gap: 10,
            marginTop: 6,
        },
        card: {
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            padding: 12,
            borderRadius: 8,
            width: "48.5%",
            display: "flex",
            alignItems: "center",
            gap: 5,
        },
        statusText: {
            color: constants.FONT_COLOR,
            fontWeight: "500",
            fontSize: 22,
        },
        statusDescription: {
            color: constants.FONT_COLOR,
            fontWeight: "300",
            fontSize: 12,
            opacity: 0.8,
        },
        valueDescription: {
            color: constants.FONT_COLOR,
            fontSize: 11,
            opacity: 0.6,
        },
        valueText: {
            color: constants.FONT_COLOR,
            fontWeight: "500",
            fontSize: 18,
        },
    });

    return (
        <View style={[styles.wrapper, constants.SHADOW_STYLE]}>
            <View style={styles.statusContainer}>
                <View style={styles.statusIcon}></View>
                <View>
                    <Text style={styles.statusText}>
                        {activityStats?.status}
                    </Text>
                    <Text style={styles.statusDescription}>
                        Basierend auf Aktivitätsdaten
                    </Text>
                </View>
            </View>
            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    <Text style={styles.valueDescription}>Ø Ruhezeit</Text>
                    <Text style={styles.valueText}>
                        {activityStats?.restingTime} h
                    </Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.valueDescription}>Aktivitätslevel</Text>
                    <Text style={styles.valueText}>{activityLevel}</Text>
                </View>
            </View>
        </View>
    );
}
