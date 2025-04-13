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

export default function SignIn() {
    const { signIn } = useSession();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const styles = StyleSheet.create({
        wrapper: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: constants.BACKGROUND_COLOR,
            height: "100%",
            width: "100%",
        },
        header: {
            fontSize: 30,
            fontWeight: "600",
            color: constants.TEXT_COLOR,
            marginBottom: 10,
        },
        labelContainer: {
            width: "80%",
        },
        label: {
            color: constants.TEXT_COLOR,
            marginBottom: 5,
            fontSize: 17,
            fontWeight: "500",
        },
        input: {
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            marginBottom: 12,
            backgroundColor: "#fff",
            width: "80%",
            height: 45,
        },
        buttonContainer: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 15,
        },
        button: {
            padding: 15,
            width: 140,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
        },
        buttonText: {
            color: constants.FONT_COLOR,
            fontSize: 16,
            fontWeight: "600",
        },
    });

    return (
        <View style={styles.wrapper}>
            <Text style={styles.header}>Anmelden</Text>
            <View style={styles.labelContainer}>
                <Text style={styles.label}>E-Mail</Text>
            </View>
            <TextInput
                placeholder="Eingeben ..."
                placeholderTextColor={"lightgrey"}
                value={email}
                onChangeText={(text) => setEmail(text)}
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
                style={styles.input}
            />
            <View style={styles.labelContainer}>
                <Text style={styles.label}>Passwort</Text>
            </View>
            <TextInput
                placeholder="Eingeben ..."
                placeholderTextColor={"lightgrey"}
                value={password}
                onChangeText={(text) => setPassword(text)}
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
                style={styles.input}
                textContentType="password"
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[
                        styles.button,
                        { backgroundColor: constants.SECCONDARY_COLOR },
                    ]}
                    onPress={() => {
                        // TODO
                    }}
                >
                    <Text style={styles.buttonText}>Registrieren</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.button,
                        { backgroundColor: constants.COMPLEMENTARY_COLOR },
                    ]}
                    onPress={() => {
                        signIn();
                        router.replace("/");
                    }}
                >
                    <Text style={styles.buttonText}>Anmelden</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
