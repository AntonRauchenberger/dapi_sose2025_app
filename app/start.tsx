import { router } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import constants from "./consts";
import SlideToUnlock from "@/components/Authentification/SlideToUnlock";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

/**
 * Startseite mit Slide-to-Unlock für den Einstieg in die App.
 */
export default function Start() {
    const [unlocked, setUnlocked] = useState(false);
    const router = useRouter();

    const handleUnlock = () => {
        router.navigate("/signIn");
    };

    useEffect(() => {
        if (unlocked) {
            router.navigate("/signIn");
        }
    }, [unlocked]);

    const styles = StyleSheet.create({
        wrapper: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: constants.BACKGROUND_COLOR,
            height: "100%",
            width: "100%",
            padding: 35,
        },
        imageContainer: {
            marginBottom: 25,
        },
        header: {
            fontSize: 30,
            marginBottom: 25,
            fontWeight: "600",
            color: constants.TEXT_COLOR,
            width: "100%",
        },
        description: {
            fontSize: 15,
            fontWeight: "300",
            color: constants.PRIMARY_COLOR,
            marginBottom: 45,
            width: "100%",
        },
    });

    return (
        <View style={styles.wrapper}>
            <View style={styles.imageContainer}>
                <Ionicons
                    name="paw-outline"
                    size={300}
                    color={constants.TEXT_COLOR}
                />
            </View>
            <Text style={styles.header}>
                Gemeinsam unterwegs - immer verbunden
            </Text>
            <Text style={styles.description}>
                Behalte deinen Hund im Blick, teile schöne Momente und bleibe
                immer verbunden.
            </Text>
            <SlideToUnlock onUnlock={handleUnlock} />
        </View>
    );
}
