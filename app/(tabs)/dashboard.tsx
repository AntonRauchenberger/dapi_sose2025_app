import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import constants from "../consts";
import StatCards from "@/components/Tabs/dashboard/StatCards";
import LiveTracker from "@/components/Tabs/dashboard/LiveTracker";
import Diagram from "@/components/Tabs/dashboard/Diagram";

export default function Dashboard() {
    const styles = StyleSheet.create({
        container: {
            height: 80,
        },
        background: {
            height: "100%",
            backgroundColor: constants.BACKGROUND_COLOR,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        header: {
            color: constants.TEXT_COLOR,
            fontSize: 20,
            marginTop: 31,
        },
        headline: {
            fontSize: 19,
            fontWeight: "500",
            color: constants.TEXT_COLOR,
            width: "95%",
            margin: "auto",
            marginTop: 13,
        },
        descText: {
            fontSize: 12,
            opacity: 0.4,
            width: "95%",
            margin: "auto",
            marginBottom: 4,
        },
    });

    return (
        <>
            <View style={[styles.container, constants.SHADOW_STYLE]}>
                <View style={styles.background}>
                    <Text style={styles.header}>Dashboard</Text>
                </View>
            </View>
            <ScrollView style={{ backgroundColor: constants.FONT_COLOR }}>
                <Text style={styles.headline}>Aktueller Überblick</Text>
                <Text style={styles.descText}>
                    Infos zu Meldungen, Aktivitäten & mehr.
                </Text>
                <StatCards />
                <Text style={styles.headline}>Live-Tracker</Text>
                <Text style={styles.descText}>
                    Distanz zwischen dir und deinem Hund.
                </Text>
                <LiveTracker />
                <Text style={styles.headline}>Bewegungsverlauf</Text>
                <Text style={styles.descText}>
                    Wie weit ihr in den letzten 14 Tagen gelaufen seid.
                </Text>
                <Diagram />
            </ScrollView>
        </>
    );
}
