import constants from "@/app/consts";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Animated,
    Easing,
} from "react-native";
import Foundation from "@expo/vector-icons/Foundation";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
import * as Haptics from "expo-haptics";
import { useState, useRef, useEffect } from "react";
import LottieView from "lottie-react-native";
import particles from "@/assets/animations/particles.json"; // Passe den Pfad ggf. an

export default function RecordButton() {
    const [isReccording, setIsReccording] = useState(false);
    const [finishedRoute, setFinishedRoute] = useState(false);
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const particleRef = useRef(null);

    const handleClick = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setIsReccording(!isReccording);
        if (isReccording) {
            setFinishedRoute(true);
            particleRef.current?.play(); // Partikel starten
            setTimeout(() => {
                setFinishedRoute(false);
            }, 1500);
        }
    };

    useEffect(() => {
        if (isReccording) {
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
    }, [isReccording]);

    const styles = StyleSheet.create({
        container: {
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
            borderColor: constants.PRIMARY_COLOR,
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
            marginTop: 3,
            color: constants.PRIMARY_COLOR,
            fontWeight: "500",
        },
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={handleClick}
                activeOpacity={0.9}
            >
                {/* Partikel-Explosion */}
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
                        color={constants.PRIMARY_COLOR}
                    />
                ) : isReccording ? (
                    <Animated.View
                        style={{ transform: [{ scale: scaleAnim }] }}
                    >
                        <FontAwesome5
                            name="route"
                            size={30}
                            color={constants.PRIMARY_COLOR}
                        />
                    </Animated.View>
                ) : (
                    <Foundation
                        name="guide-dog"
                        size={60}
                        color={constants.PRIMARY_COLOR}
                    />
                )}
            </TouchableOpacity>
            <Text style={styles.buttonText}>
                {finishedRoute
                    ? "Route wurde gespeichert"
                    : isReccording
                    ? "Route beenden"
                    : "Route starten"}
            </Text>
        </View>
    );
}
