import constants from "@/app/consts";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Animated,
    Easing,
} from "react-native";
import { Audio } from "expo-av";
import Foundation from "@expo/vector-icons/Foundation";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
import * as Haptics from "expo-haptics";
import { useState, useRef, useEffect } from "react";
import LottieView from "lottie-react-native";
import particles from "@/assets/animations/particles.json";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Dialog from "react-native-dialog";
import PoopService from "@/lib/Services/PoopService";
import RouteService from "@/lib/Services/RouteService";
import StatisticsService from "@/lib/Services/StatisticsService";
import { useStatistics } from "@/lib/Providers/StatisticsProvider";
import { useRecord } from "@/lib/Providers/RecordProvider";
import { useCurrentData } from "@/lib/Providers/CurrentDataProvider";

/**
 * Record-Button-Komponente zum Starten/Stoppen der Routenaufnahme und Poop-Button mit Tageslimit.
 */
export default function RecordButton({ setReloadSlider, loadData }) {
    const [finishedRoute, setFinishedRoute] = useState(false);
    const [poopButtonEnabled, setPoopButtonEnabled] = useState(true);
    const [pooped, setPooped] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [currentRouteId, setCurrentRouteId] = useState<string | null>(null);
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const particleRef = useRef(null);
    const { refreshStatistics } = useStatistics();
    const { isRecording, setIsRecording } = useRecord();
    const { dogLocation } = useCurrentData();

    const playSound = async () => {
        const { sound } = await Audio.Sound.createAsync(
            require("../../../assets/sounds/smallPoop.mp3")
        );
        await sound.playAsync();
    };

    const startRoute = async () => {
        setIsRecording(true);
        const routeId = await RouteService.startRoute();
        if (!routeId) {
            setIsRecording(false);
        } else {
            setCurrentRouteId(routeId);
        }
    };

    const stopRoute = async () => {
        setFinishedRoute(true);
        particleRef.current?.play();
        if (currentRouteId) {
            await RouteService.stopRoute(currentRouteId);
            await refreshStatistics();
            setReloadSlider(true);
        }
        setFinishedRoute(false);
        setIsRecording(!isRecording);
    };

    const handleClick = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        if (isRecording) {
            stopRoute();
        } else {
            startRoute();
        }
    };

    const handlePoopButton = async () => {
        playSound();
        setPooped(true);
        await PoopService.savePoop(dogLocation);
        await StatisticsService.addPoop();
        await refreshStatistics();
        await loadData();

        setTimeout(() => {
            setPooped(false);
            setPoopButtonEnabled(false);
        }, 1000);
    };

    useEffect(() => {
        if (isRecording) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(scaleAnim, {
                        toValue: 1.3,
                        duration: 700,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(scaleAnim, {
                        toValue: 1,
                        duration: 700,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        } else {
            scaleAnim.stopAnimation();
            scaleAnim.setValue(1);
        }
    }, [isRecording]);

    // checks if poop button can be pressed (once per day)
    useEffect(() => {
        const handle = async () => {
            try {
                const lastPoopTime = await AsyncStorage.getItem("lastPoopTime");
                if (lastPoopTime && lastPoopTime !== "") {
                    const lastPoop = parseInt(lastPoopTime, 10);
                    const now = Date.now();
                    const diff = now - lastPoop;

                    if (diff > 24 * 60 * 60 * 1000) {
                        setPoopButtonEnabled(true);
                    } else {
                        setPoopButtonEnabled(false);
                    }
                } else {
                    setPoopButtonEnabled(true);
                }
            } catch (e) {
                console.error("Fehler beim Prüfen:", e);
                setPoopButtonEnabled(true);
            }
        };

        if (isRecording) {
            handle();
        }
    }, [isRecording]);

    const styles = StyleSheet.create({
        container: {
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
        },
        recordButtonContainer: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        button: {
            width: 80,
            height: 80,
            borderRadius: 999,
            backgroundColor: constants.BACKGROUND_COLOR,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 4,
            borderColor: constants.TEXT_COLOR,
            position: "relative",
            overflow: "hidden",
        },
        lottie: {
            position: "absolute",
            width: 100,
            height: 100,
            top: -10,
            left: -10,
            zIndex: 1,
        },
        buttonText: {
            marginTop: 2,
            color: constants.TEXT_COLOR,
            fontWeight: "500",
            width: 191.5,
            textAlign: "center",
        },
    });

    return (
        <View style={styles.container}>
            {isRecording && (
                <TouchableOpacity
                    style={[
                        styles.button,
                        {
                            width: 60,
                            height: 60,
                            marginTop: 10,
                            backgroundColor: constants.SECCONDARY_COLOR,
                            borderWidth: 2,
                            opacity: poopButtonEnabled ? 1 : 0.75,
                            transform: [{ translateX: -85 }],
                            position: "absolute",
                        },
                    ]}
                    onPress={
                        poopButtonEnabled
                            ? handlePoopButton
                            : () => setShowErrorDialog(true)
                    }
                    activeOpacity={0.9}
                >
                    {pooped ? (
                        <MaterialCommunityIcons
                            name="emoticon-poop"
                            size={28}
                            color={constants.TEXT_COLOR}
                        />
                    ) : (
                        <FontAwesome6
                            name="poop"
                            size={22}
                            color={constants.TEXT_COLOR}
                        />
                    )}
                </TouchableOpacity>
            )}
            <View style={styles.recordButtonContainer}>
                <View style={constants.SHADOW_STYLE}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleClick}
                        activeOpacity={0.9}
                    >
                        <LottieView
                            ref={particleRef}
                            source={particles}
                            autoPlay={false}
                            loop={false}
                            style={styles.lottie}
                        />

                        {finishedRoute ? (
                            <Feather
                                name="check"
                                size={40}
                                color={constants.TEXT_COLOR}
                            />
                        ) : isRecording ? (
                            <Animated.View
                                style={{ transform: [{ scale: scaleAnim }] }}
                            >
                                <FontAwesome5
                                    name="route"
                                    size={30}
                                    color={constants.TEXT_COLOR}
                                />
                            </Animated.View>
                        ) : (
                            <Foundation
                                name="guide-dog"
                                size={60}
                                color={constants.TEXT_COLOR}
                            />
                        )}
                    </TouchableOpacity>
                </View>
                <Text style={styles.buttonText}>
                    {finishedRoute
                        ? "Route wurde gespeichert"
                        : isRecording
                        ? "Route beenden"
                        : "Route starten"}
                </Text>
            </View>

            <Dialog.Container visible={showErrorDialog}>
                <Dialog.Title>Fähigkeit noch nicht bereit!</Dialog.Title>
                <Dialog.Description>
                    Du kannst nur einmal am Tag poop plazieren.
                </Dialog.Description>
                <Dialog.Button
                    label="Okay"
                    onPress={() => {
                        setShowErrorDialog(false);
                    }}
                />
            </Dialog.Container>
        </View>
    );
}
