import { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import constants from "../consts";
import Header from "@/components/Tabs/start/Header";
import { NotesBottomSheet } from "@/components/Tabs/start/NotesBottomSheet";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Startseite mit Steckbrief des Hundes und Notizfunktion.
 */
export default function Index() {
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

    useEffect(() => {
        loadProfile();
    }, []);

    const styles = StyleSheet.create({
        infoContainer: {
            width: "97%",
            margin: "auto",
            borderRadius: 15,
            borderWidth: 2,
            borderColor: constants.BACKGROUND_COLOR,
            padding: 10,
            transform: "translateY(-33px)",
        },
        infoHeaderContainer: {
            borderBottomColor: constants.BACKGROUND_COLOR,
            borderBottomWidth: 2,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        },
        infoHeaderText: {
            fontSize: 20,
            fontWeight: "500",
            color: constants.TEXT_COLOR,
            marginBottom: 5,
        },
        infoContentContainer: {
            marginTop: 5,
        },
        infoText: {
            color: constants.SECCONDARY_COLOR,
            fontSize: 15,
            marginTop: 2,
        },
        infoData: {
            color: constants.TEXT_COLOR,
        },
    });

    return (
        <View style={{ backgroundColor: constants.FONT_COLOR }}>
            <Header dogName={profile.name} image={profile.image} />
            <View style={styles.infoContainer}>
                <View style={styles.infoHeaderContainer}>
                    <Text style={styles.infoHeaderText}>Steckbrief</Text>
                    <TouchableOpacity
                        onPress={() => router.push("/Routes/EditDogProfile")}
                    >
                        <MaterialIcons
                            name="edit"
                            size={28}
                            color={constants.TEXT_COLOR}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.infoContentContainer}>
                    <Text style={styles.infoText}>
                        Geburtsdatum:{" "}
                        <Text style={styles.infoData}>{profile.birthdate}</Text>
                    </Text>
                    <Text style={styles.infoText}>
                        Rasse:{" "}
                        <Text style={styles.infoData}>{profile.breed}</Text>
                    </Text>
                    <Text style={styles.infoText}>
                        Geschlecht:{" "}
                        <Text style={styles.infoData}>{profile.gender}</Text>
                    </Text>
                    <Text style={styles.infoText}>
                        Gewicht:{" "}
                        <Text style={styles.infoData}>{profile.weight} kg</Text>
                    </Text>
                    <Text style={styles.infoText}>
                        Größe:{" "}
                        <Text style={styles.infoData}>{profile.height} cm</Text>
                    </Text>
                    <Text style={styles.infoText}>
                        Fun-Fact:{" "}
                        <Text style={styles.infoData}>{profile.funfact}</Text>
                    </Text>
                </View>
            </View>
            <NotesBottomSheet dogName={profile.name} />
        </View>
    );
}
