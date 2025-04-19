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
import DogService from "@/lib/Services/DogService";
import Firebase from "@/lib/Firebase/Firebase";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function EditDogProfile() {
    const router = useRouter();
    const [inEdit, setInEdit] = useState(false);
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
            await DogService.saveDogProfile(Firebase, profile);
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

                    <View style={[styles.inputContainer, { marginTop: 24 }]}>
                        <View style={styles.inputIconContainer}>
                            <MaterialCommunityIcons
                                name="dog"
                                size={24}
                                color={constants.TEXT_COLOR}
                            />
                        </View>
                        <TextInput
                            placeholder="Name"
                            placeholderTextColor={constants.SECCONDARY_COLOR}
                            onChangeText={(text) =>
                                setProfile({ ...profile, name: text })
                            }
                            returnKeyType="done"
                            onSubmitEditing={Keyboard.dismiss}
                            style={styles.input}
                            onFocus={() => setInEdit(true)}
                            onBlur={() => setInEdit(false)}
                            value={profile.name}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputIconContainer}>
                            <FontAwesome
                                name="birthday-cake"
                                size={22}
                                color={constants.TEXT_COLOR}
                            />
                        </View>
                        <TextInput
                            placeholder="Geburtsdatum"
                            placeholderTextColor={constants.SECCONDARY_COLOR}
                            onChangeText={(text) =>
                                setProfile({ ...profile, birthdate: text })
                            }
                            returnKeyType="done"
                            onSubmitEditing={Keyboard.dismiss}
                            style={styles.input}
                            onFocus={() => setInEdit(true)}
                            onBlur={() => setInEdit(false)}
                            value={profile.birthdate}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputIconContainer}>
                            <FontAwesome
                                name="transgender"
                                size={24}
                                color={constants.TEXT_COLOR}
                            />
                        </View>
                        <TextInput
                            placeholder="Geschlecht (männlich/weiblich)"
                            placeholderTextColor={constants.SECCONDARY_COLOR}
                            onChangeText={(text) =>
                                setProfile({
                                    ...profile,
                                    gender: text.toLowerCase(),
                                })
                            }
                            returnKeyType="done"
                            onSubmitEditing={Keyboard.dismiss}
                            style={styles.input}
                            onFocus={() => setInEdit(true)}
                            onBlur={() => setInEdit(false)}
                            value={profile.gender}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputIconContainer}>
                            <MaterialCommunityIcons
                                name="weight-lifter"
                                size={24}
                                color={constants.TEXT_COLOR}
                            />
                        </View>
                        <TextInput
                            placeholder="Gewicht (in kg)"
                            placeholderTextColor={constants.SECCONDARY_COLOR}
                            onChangeText={(text) =>
                                setProfile({ ...profile, weight: text })
                            }
                            returnKeyType="done"
                            onSubmitEditing={Keyboard.dismiss}
                            style={styles.input}
                            onFocus={() => setInEdit(true)}
                            onBlur={() => setInEdit(false)}
                            value={profile.weight}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputIconContainer}>
                            <MaterialIcons
                                name="height"
                                size={24}
                                color={constants.TEXT_COLOR}
                            />
                        </View>
                        <TextInput
                            placeholder="Größe (in cm)"
                            placeholderTextColor={constants.SECCONDARY_COLOR}
                            onChangeText={(text) =>
                                setProfile({ ...profile, height: text })
                            }
                            returnKeyType="done"
                            onSubmitEditing={Keyboard.dismiss}
                            style={styles.input}
                            onFocus={() => setInEdit(true)}
                            onBlur={() => setInEdit(false)}
                            value={profile.height}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputIconContainer}>
                            <FontAwesome6
                                name="hotdog"
                                size={24}
                                color={constants.TEXT_COLOR}
                            />
                        </View>
                        <TextInput
                            placeholder="Rasse"
                            placeholderTextColor={constants.SECCONDARY_COLOR}
                            onChangeText={(text) =>
                                setProfile({ ...profile, breed: text })
                            }
                            returnKeyType="done"
                            onSubmitEditing={Keyboard.dismiss}
                            style={styles.input}
                            onFocus={() => setInEdit(true)}
                            onBlur={() => setInEdit(false)}
                            value={profile.breed}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputIconContainer}>
                            <MaterialIcons
                                name="history-edu"
                                size={24}
                                color={constants.TEXT_COLOR}
                            />
                        </View>
                        <TextInput
                            placeholder="Fun-Fact"
                            placeholderTextColor={constants.SECCONDARY_COLOR}
                            onChangeText={(text) =>
                                setProfile({ ...profile, funfact: text })
                            }
                            returnKeyType="done"
                            onSubmitEditing={Keyboard.dismiss}
                            style={styles.input}
                            onFocus={() => setInEdit(true)}
                            onBlur={() => setInEdit(false)}
                            value={profile.funfact}
                        />
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
