import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import constants from "../consts";
import { useRouter } from "expo-router";

export default function EditDogProfile() {
    const router = useRouter();
    const [profile, setProfile] = useState({
        birthdate: "",
        breed: "",
        gender: "",
        weight: "",
        height: "",
        funfact: "",
        name: "",
        image: null as string | null,
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const saved = await AsyncStorage.getItem("dogProfile");
            if (saved) {
                setProfile(JSON.parse(saved));
            }
        } catch (err) {
            console.error("Fehler beim Laden des Profils:", err);
        }
    };

    const saveProfile = async () => {
        try {
            await AsyncStorage.setItem("dogProfile", JSON.stringify(profile));
            router.replace("/(tabs)");
        } catch (err) {
            console.error("Fehler beim Speichern:", err);
        }
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            setProfile({ ...profile, image: result.assets[0].uri });
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
            marginBottom: 20,
            color: constants.TEXT_COLOR,
        },
        input: {
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 8,
            padding: 10,
            marginBottom: 12,
            backgroundColor: "#fff",
        },
        image: {
            width: "100%",
            height: 200,
            borderRadius: 10,
            marginBottom: 20,
        },
        imagePlaceholder: {
            width: "100%",
            height: 200,
            borderRadius: 10,
            backgroundColor: "#eee",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
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
                    <Text style={styles.title}>Steckbrief bearbeiten</Text>

                    <TouchableOpacity onPress={pickImage}>
                        {profile.image ? (
                            <Image
                                source={{ uri: profile.image }}
                                style={styles.image}
                            />
                        ) : (
                            <View style={styles.imagePlaceholder}>
                                <Text style={{ color: "#aaa" }}>
                                    Bild auswählen
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    <Button
                        title="Speichern"
                        onPress={saveProfile}
                        color={constants.COMPLEMENTARY_COLOR}
                    />

                    <Text
                        style={{ color: constants.TEXT_COLOR, marginBottom: 5 }}
                    >
                        Name
                    </Text>
                    <TextInput
                        placeholder="Eingeben ..."
                        placeholderTextColor={"lightgrey"}
                        value={profile.name}
                        onChangeText={(text) =>
                            setProfile({ ...profile, name: text })
                        }
                        returnKeyType="done"
                        onSubmitEditing={Keyboard.dismiss}
                        style={styles.input}
                    />
                    <Text
                        style={{ color: constants.TEXT_COLOR, marginBottom: 5 }}
                    >
                        Geburtsdatum
                    </Text>
                    <TextInput
                        placeholder="Eingeben ..."
                        placeholderTextColor={"lightgrey"}
                        value={profile.birthdate}
                        onChangeText={(text) =>
                            setProfile({ ...profile, birthdate: text })
                        }
                        returnKeyType="done"
                        onSubmitEditing={Keyboard.dismiss}
                        style={styles.input}
                    />
                    <Text
                        style={{ color: constants.TEXT_COLOR, marginBottom: 5 }}
                    >
                        Rasse
                    </Text>
                    <TextInput
                        placeholder="Eingeben ..."
                        placeholderTextColor={"lightgrey"}
                        value={profile.breed}
                        onChangeText={(text) =>
                            setProfile({ ...profile, breed: text })
                        }
                        returnKeyType="done"
                        onSubmitEditing={Keyboard.dismiss}
                        style={styles.input}
                    />
                    <Text
                        style={{ color: constants.TEXT_COLOR, marginBottom: 5 }}
                    >
                        Geschlecht
                    </Text>
                    <View
                        style={{
                            borderColor: "#ccc",
                            borderWidth: 1,
                            borderRadius: 8,
                            marginBottom: 12,
                            backgroundColor: "#fff",
                        }}
                    >
                        <TouchableOpacity
                            onPress={() =>
                                setProfile({
                                    ...profile,
                                    gender:
                                        profile.gender === "männlich"
                                            ? "weiblich"
                                            : "männlich",
                                })
                            }
                            style={{ padding: 12 }}
                        >
                            <Text style={{ color: "#333" }}>
                                {profile.gender
                                    ? profile.gender
                                    : "Geschlecht wählen"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Text
                        style={{ color: constants.TEXT_COLOR, marginBottom: 5 }}
                    >
                        Gewicht (in kg)
                    </Text>
                    <TextInput
                        placeholder="Eingeben ..."
                        placeholderTextColor={"lightgrey"}
                        value={profile.weight}
                        keyboardType="number-pad"
                        onChangeText={(text) =>
                            setProfile({ ...profile, weight: text })
                        }
                        returnKeyType="done"
                        onSubmitEditing={Keyboard.dismiss}
                        style={styles.input}
                    />
                    <Text
                        style={{ color: constants.TEXT_COLOR, marginBottom: 5 }}
                    >
                        Größe (in cm)
                    </Text>
                    <TextInput
                        placeholder="Eingeben ..."
                        placeholderTextColor={"lightgrey"}
                        value={profile.height}
                        keyboardType="number-pad"
                        onChangeText={(text) =>
                            setProfile({ ...profile, height: text })
                        }
                        returnKeyType="done"
                        onSubmitEditing={Keyboard.dismiss}
                        style={styles.input}
                    />
                    <Text
                        style={{ color: constants.TEXT_COLOR, marginBottom: 5 }}
                    >
                        Fun-Fact
                    </Text>
                    <TextInput
                        placeholder="Fun-Fact"
                        placeholderTextColor={"lightgrey"}
                        value={profile.funfact}
                        onChangeText={(text) =>
                            setProfile({ ...profile, funfact: text })
                        }
                        returnKeyType="done"
                        onSubmitEditing={Keyboard.dismiss}
                        style={styles.input}
                    />
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
