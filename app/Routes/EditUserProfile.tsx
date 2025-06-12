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
    TextInput,
} from "react-native";
import constants from "../consts";
import { useRouter } from "expo-router";
import Dialog from "react-native-dialog";
import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AuthentificationService from "@/lib/Services/AuthentificationService";
import Firebase from "@/lib/Firebase/Firebase";

export default function EditUserProfile() {
    const router = useRouter();
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
            backgroundColor: constants.BACKGROUND_COLOR,
            height: 45,
            borderBottomStartRadius: 0,
            borderTopStartRadius: 0,
            width: 305,
            paddingLeft: 0,
        },
        inputContainer: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            marginBottom: 7,
        },
        inputIconContainer: {
            backgroundColor: constants.BACKGROUND_COLOR,
            borderRadius: 10,
            borderBottomEndRadius: 0,
            borderTopEndRadius: 0,
            padding: 10,
            marginBottom: 12,
            height: 45,
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

                    <View style={styles.inputContainer}>
                        <View style={styles.inputIconContainer}>
                            <MaterialCommunityIcons
                                name="account-outline"
                                size={24}
                                color={constants.TEXT_COLOR}
                            />
                        </View>
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor={constants.SECCONDARY_COLOR}
                            value={profile.name}
                            returnKeyType="done"
                            onSubmitEditing={Keyboard.dismiss}
                            style={styles.input}
                        />
                    </View>
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
                            value={profile.email}
                            returnKeyType="done"
                            onSubmitEditing={Keyboard.dismiss}
                            style={styles.input}
                        />
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
                        AuthentificationService.signout(Firebase);
                        router.navigate("/start");
                    }}
                />
            </Dialog.Container>
        </KeyboardAvoidingView>
    );
}
