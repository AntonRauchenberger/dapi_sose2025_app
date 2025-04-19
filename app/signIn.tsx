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
import Dialog from "react-native-dialog";
import Firebase from "@/lib/Firebase/Firebase";
import AuthentificationService from "@/lib/Services/AuthentificationService";
import DogService from "@/lib/Services/DogService";

export default function SignIn() {
    const { signIn } = useSession();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showDialog, setShowDialog] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState(false);

    const login = async () => {
        if (email === "" || password === "") {
            setShowDialog(true);
            return;
        }
        if (
            (await AuthentificationService.login(Firebase, email, password)) ===
            true
        ) {
            await DogService.loadDogData(Firebase);
            signIn();
            router.navigate("/(tabs)");
        } else {
            setShowErrorDialog(true);
        }
    };

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
            marginBottom: 25,
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
            borderRadius: 10,
            padding: 10,
            marginBottom: 12,
            backgroundColor: "#facfe5",
            height: 45,
            borderBottomStartRadius: 0,
            borderTopStartRadius: 0,
            width: 265,
            paddingLeft: 0,
        },
        button: {
            padding: 15,
            width: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
            marginTop: 20,
        },
        buttonText: {
            color: constants.FONT_COLOR,
            fontSize: 16,
            fontWeight: "600",
        },
        imageContainer: {
            marginBottom: 30,
        },
        inputContainer: {
            width: "80%",
            display: "flex",
            flexDirection: "row",
        },
        inputIconContainer: {
            backgroundColor: "#facfe5",
            borderRadius: 10,
            borderBottomEndRadius: 0,
            borderTopEndRadius: 0,
            padding: 10,
            marginBottom: 12,
            height: 45,
        },
        registerTextContainer: {
            marginTop: 10,
            overflow: "visible",
            display: "flex",
            flexDirection: "row",
            gap: 5,
        },
        registerText: {
            color: constants.TEXT_COLOR,
            overflow: "visible",
        },
        registerButton: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "visible",
        },
        registerButtonText: {
            color: constants.PRIMARY_COLOR,
        },
    });

    return (
        <View style={styles.wrapper}>
            <View style={styles.imageContainer}>
                <Ionicons
                    name="paw-outline"
                    size={120}
                    color={constants.TEXT_COLOR}
                />
            </View>
            <Text style={styles.header}>Login</Text>
            <View style={styles.inputContainer}>
                <View style={styles.inputIconContainer}>
                    <Feather
                        name="mail"
                        size={24}
                        color={constants.TEXT_COLOR}
                    />
                </View>
                <TextInput
                    placeholder="Email"
                    placeholderTextColor={constants.SECCONDARY_COLOR}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss}
                    style={styles.input}
                />
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputIconContainer}>
                    <Feather
                        name="lock"
                        size={24}
                        color={constants.TEXT_COLOR}
                    />
                </View>
                <TextInput
                    placeholder="Passwort"
                    placeholderTextColor={constants.SECCONDARY_COLOR}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss}
                    style={styles.input}
                    textContentType="password"
                    secureTextEntry={true}
                />
            </View>
            <TouchableOpacity
                style={[
                    styles.button,
                    { backgroundColor: constants.COMPLEMENTARY_COLOR },
                ]}
                onPress={() => {
                    login();
                }}
            >
                <Text style={styles.buttonText}>Anmelden</Text>
            </TouchableOpacity>
            <View style={styles.registerTextContainer}>
                <Text style={styles.registerText}>Noch keinen Account?</Text>
                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={() => router.navigate("/signUp")}
                >
                    <Text style={styles.registerButtonText}>Registrieren</Text>
                </TouchableOpacity>
            </View>
            <Dialog.Container visible={showDialog}>
                <Dialog.Title>Fehlende Eingaben</Dialog.Title>
                <Dialog.Description>
                    Du hast noch nicht alle Felder ausgefüllt.
                </Dialog.Description>
                <Dialog.Button
                    label="Okay"
                    onPress={() => {
                        setShowDialog(false);
                    }}
                />
            </Dialog.Container>
            <Dialog.Container visible={showErrorDialog}>
                <Dialog.Title>Falsche Eingaben</Dialog.Title>
                <Dialog.Description>
                    Du hast nicht alle Felder richtig ausgefüllt.
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
