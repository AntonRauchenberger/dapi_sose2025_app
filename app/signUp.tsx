import { Text, View, StyleSheet } from "react-native";
import constants from "./consts";
import SignUpSlider from "@/components/Authentification/SignUpSlider";

/**
 * Registrierungsseite mit Slider-Komponente für die Nutzeranmeldung.
 */
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
