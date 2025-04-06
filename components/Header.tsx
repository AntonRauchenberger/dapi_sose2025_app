import { StyleSheet, Text, View } from "react-native";
import constants from "@/app/consts";

export default function Header() {
    const styles = StyleSheet.create({
        container: {
            height: 100,
            marginBottom: 21,
        },
        background: {
            height: "80%",
            backgroundColor: constants.BACKGROUND_COLOR,
        },
        tracker: {
            backgroundColor: constants.PRIMARY_COLOR,
            width: "89%",
            margin: "auto",
            height: 60,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 15,
            transform: "translateY(-30px)",
        },
        trackerText: {
            color: constants.FONT_COLOR,
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.background}></View>
            <View style={styles.tracker}>
                <Text style={styles.trackerText}>Live Tracker</Text>
            </View>
        </View>
    );
}
