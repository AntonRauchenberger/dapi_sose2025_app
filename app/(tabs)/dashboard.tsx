import React, { useRef, useEffect, useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Animated,
    RefreshControl,
} from "react-native";
import constants from "../consts";
import StatCards from "@/components/Tabs/dashboard/StatCards";
import LiveTracker from "@/components/Tabs/dashboard/LiveTracker";
import Diagram from "@/components/Tabs/dashboard/Diagram";
import { useRecord } from "@/lib/Providers/RecordProvider";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MoodMeter from "@/components/Tabs/dashboard/MoodMeter";
import StatisticsService from "@/lib/Services/StatisticsService";
import { useStatistics } from "@/lib/Providers/StatisticsProvider";

export default function Dashboard() {
    const { isRecording } = useRecord();
    const blinkAnim = useRef(new Animated.Value(1)).current;
    const [refreshing, setRefreshing] = useState(false);
    const [diagramData, setDiagramData] = useState<number[]>([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]);
    const [activityStats, setActivityStats] = useState();
    const { refreshStatistics } = useStatistics();

    const fetchData = async () => {
        setRefreshing(true);
        const fetchedDiagramData = await StatisticsService.getDiagramData();
        if (fetchedDiagramData) {
            setDiagramData(fetchedDiagramData);
        } else {
            console.error("Fehler beim Abrufen der Diagrammdaten");
        }
        const fetchedActivityStats = await StatisticsService.getActivityStats();
        if (fetchedActivityStats) {
            setActivityStats(fetchedActivityStats);
        } else {
            console.error("Fehler beim Abrufen des Aktivitäts-Status");
        }
        await refreshStatistics();
        setRefreshing(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

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

    const onRefresh = async () => {
        setRefreshing(true);
        fetchData();
        setRefreshing(false);
    };

    const styles = StyleSheet.create({
        container: {
            height: 80,
        },
        background: {
            height: "100%",
            backgroundColor: constants.BACKGROUND_COLOR,
            display: "flex",
            flexDirection: "row",
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
                    {isRecording && (
                        <Animated.View
                            style={{
                                transform: [{ translateY: 15 }],
                                opacity: blinkAnim,
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
            </View>
            <ScrollView
                style={{ backgroundColor: constants.FONT_COLOR }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <Text style={styles.headline}>Aktueller Überblick</Text>
                <Text style={styles.descText}>
                    Infos zu Meldungen, Aktivitäten & mehr.
                </Text>
                <StatCards />
                <Text style={styles.headline}>Mood-Meter</Text>
                <Text style={styles.descText}>
                    Wie geht es deinem Hund zur Zeit?
                </Text>
                <MoodMeter activityStats={activityStats} />
                <Text style={styles.headline}>Live-Tracker</Text>
                <Text style={styles.descText}>
                    Distanz zwischen dir und deinem Hund.
                </Text>
                <LiveTracker />
                <Text style={styles.headline}>Bewegungsverlauf</Text>
                <Text style={styles.descText}>
                    Wie weit ihr in den letzten 14 Tagen gelaufen seid.
                </Text>
                <Diagram diagramData={diagramData} isLoading={refreshing} />
            </ScrollView>
        </>
    );
}
