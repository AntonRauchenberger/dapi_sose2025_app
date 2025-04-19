import React, { useEffect, useState } from "react";
import {
    Text,
    Button,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    View,
} from "react-native";
import constants from "../consts";
import { useRouter } from "expo-router";
import Dialog from "react-native-dialog";
import * as Haptics from "expo-haptics";
import { useSession } from "@/lib/Authentification/ctx";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditUserProfile() {
    const router = useRouter();
    const { signOut } = useSession();
    const [profile, setProfile] = useState({
        name: "",
        email: "",
    });
    const [dialogVisible, setDialogVisible] = useState(false);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        const userDataString = await AsyncStorage.getItem("userProfile");
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            console.log(userData);
            setProfile({ name: userData.name, email: userData.email });
        }
    };

    const styles = StyleSheet.create({
        container: {
            padding: 20,
            backgroundColor: constants.FONT_COLOR,
        },
        title: {
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 15,
            color: constants.TEXT_COLOR,
        },
        textContainer: {
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 10,
            backgroundColor: "#fff",
            marginBottom: 12,
        },
        text: {
            opacity: 0.45,
        },
    });

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps="handled"
                >
                    <Text style={styles.title}>Dein Profil</Text>

                    <Text
                        style={{ color: constants.TEXT_COLOR, marginBottom: 5 }}
                    >
                        Name
                    </Text>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{profile.name}</Text>
                    </View>
                    <Text
                        style={{ color: constants.TEXT_COLOR, marginBottom: 5 }}
                    >
                        E-Mail
                    </Text>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{profile.email}</Text>
                    </View>

                    <Button
                        title="Abmelden"
                        onPress={() => setDialogVisible(true)}
                        color={"red"}
                    />
                </ScrollView>
            </TouchableWithoutFeedback>
            <Dialog.Container visible={dialogVisible}>
                <Dialog.Title>Wirklich ausloggen?</Dialog.Title>
                <Dialog.Description>
                    Möchtest du dich wirklich ausloggen? Du kannst dich
                    jederzeit wieder anmelden.
                </Dialog.Description>
                <Dialog.Button
                    label="Abbrechen"
                    onPress={() => {
                        setDialogVisible(false);
                    }}
                />
                <Dialog.Button
                    label="Ja"
                    onPress={() => {
                        Haptics.notificationAsync(
                            Haptics.NotificationFeedbackType.Success
                        );
                        setDialogVisible(false);
                        signOut();
                        router.navigate("/start");
                    }}
                />
            </Dialog.Container>
        </KeyboardAvoidingView>
    );
}
