import React from "react";
import { Text, View, StyleSheet } from "react-native";
import constants from "../consts";
import StatCards from "@/components/Tabs/dashboard/StatCards";
import LiveTracker from "@/components/Tabs/dashboard/LiveTracker";
import Diagram from "@/components/Tabs/dashboard/Diagram";

export default function Dashboard() {
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
    });

    return (
        <View style={{ backgroundColor: constants.FONT_COLOR }}>
            <View style={styles.container}>
                <View style={styles.background}>
                    <Text style={styles.headline}>Dashboard</Text>
                </View>
            </View>
            <StatCards />
            <LiveTracker />
            <Diagram />
        </View>
    );
}
