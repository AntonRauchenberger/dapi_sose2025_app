import { StyleSheet, Text, View } from "react-native";
import constants from "../consts";
import Header from "@/components/Tabs/start/Header";
import { NotesBottomSheet } from "@/components/Tabs/start/NotesBottomSheet";

export default function Index() {
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
            <Header />
            <View style={styles.infoContainer}>
                <View style={styles.infoHeaderContainer}>
                    <Text style={styles.infoHeaderText}>Steckbrief</Text>
                </View>
                <View style={styles.infoContentContainer}>
                    <Text style={styles.infoText}>
                        Geburtsdatum:{" "}
                        <Text style={styles.infoData}>09.04.2925</Text>
                    </Text>
                    <Text style={styles.infoText}>
                        Rasse: <Text style={styles.infoData}>Laprador</Text>
                    </Text>
                    <Text style={styles.infoText}>
                        Geschlecht:{" "}
                        <Text style={styles.infoData}>männlich</Text>
                    </Text>
                    <Text style={styles.infoText}>
                        Gewicht: <Text style={styles.infoData}>20.2 kg</Text>
                    </Text>
                    <Text style={styles.infoText}>
                        Größe: <Text style={styles.infoData}>67 cm</Text>
                    </Text>
                    <Text style={styles.infoText}>
                        Fun-Fact:{" "}
                        <Text style={styles.infoData}>
                            Liebt Gassis üüüber alles :))
                        </Text>
                    </Text>
                </View>
            </View>
            <NotesBottomSheet />
        </View>
    );
}
