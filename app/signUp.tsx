import { router } from "expo-router";
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Keyboard,
    TouchableOpacity,
} from "react-native";
import { useSession } from "@/lib/Authentification/ctx";
import constants from "./consts";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";

export default function SignUp() {
    const styles = StyleSheet.create({
        wrapper: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: constants.BACKGROUND_COLOR,
            height: "100%",
            width: "100%",
        },
    });

    return (
        <View style={styles.wrapper}>
            <Text>Sign Up</Text>
        </View>
    );
}
