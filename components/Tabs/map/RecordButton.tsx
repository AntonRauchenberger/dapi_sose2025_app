import constants from "@/app/consts";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Foundation from "@expo/vector-icons/Foundation";

export default function RecordButton() {
    const styles = StyleSheet.create({
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        button: {
            width: 80,
            height: 80,
            borderRadius: "50%",
            backgroundColor: constants.BACKGROUND_COLOR,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 4,
            borderColor: constants.PRIMARY_COLOR,
        },
        buttonText: {
            marginTop: 3,
            color: constants.PRIMARY_COLOR,
            fontWeight: "500",
        },
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <Foundation
                    name="guide-dog"
                    size={60}
                    color={constants.PRIMARY_COLOR}
                />
            </TouchableOpacity>
            <Text style={styles.buttonText}>Route starten</Text>
        </View>
    );
}
