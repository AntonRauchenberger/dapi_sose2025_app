import { useState } from "react";
import { router } from "expo-router";
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Keyboard,
    TouchableOpacity,
} from "react-native";
import constants from "./consts";
import SignUpSlider from "@/components/Authentification/SignUpSlider";

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
            <SignUpSlider />
        </View>
    );
}
