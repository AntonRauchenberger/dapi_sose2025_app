import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import constants from "@/app/consts";
import { router } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Foundation from "@expo/vector-icons/Foundation";

export default function StatCards() {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: constants.TEXT_COLOR,
            padding: 15,
            borderRadius: 15,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 4,
            zIndex: 10,
            width: "97%",
            margin: "auto",
        },
        row: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        },
        card: {
            backgroundColor: constants.BACKGROUND_COLOR,
            width: 166,
            borderRadius: 8,
            height: 120,
            padding: 7,
        },
        header: {
            color: constants.TEXT_COLOR,
            minHeight: 50,
        },
        value: {
            color: constants.TEXT_COLOR,
            fontSize: 20,
            fontWeight: "500",
            marginLeft: 20,
        },
        description: {
            fontSize: 10,
            opacity: 0.8,
        },
    });

    return (
        <View style={[styles.container, constants.SHADOW_STYLE]}>
            <View style={[styles.row, { marginBottom: 15 }]}>
                <TouchableOpacity
                    style={styles.card}
                    activeOpacity={0.9}
                    onPress={() => router.navigate("/(tabs)/map")}
                >
                    <Text style={styles.header}>
                        Meldungen{" "}
                        <Text style={styles.description}>
                            (in den letzten 2 Wochen)
                        </Text>
                    </Text>
                    <Text style={styles.value}>
                        {7}{" "}
                        <View
                            style={{ transform: "translate3d(-2px, 3px, 0px)" }}
                        >
                            <Ionicons
                                name="warning"
                                size={20}
                                color={constants.TEXT_COLOR}
                            />
                        </View>
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.card}
                    activeOpacity={0.9}
                    onPress={() => router.navigate("/(tabs)/camera")}
                >
                    <Text style={styles.header}>Gemachte Fotos</Text>
                    <Text style={styles.value}>
                        {21}{" "}
                        <View
                            style={{ transform: "translate3d(-2px, 3px, 0px)" }}
                        >
                            <MaterialIcons
                                name="camera"
                                size={20}
                                color={constants.TEXT_COLOR}
                            />
                        </View>
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.card}
                    activeOpacity={0.9}
                    onPress={() => router.navigate("/(tabs)/map")}
                >
                    <Text style={styles.header}>Häufchen-Counter</Text>
                    <Text style={styles.value}>
                        {20}{" "}
                        <View>
                            <FontAwesome5
                                name="poop"
                                size={17}
                                color={constants.TEXT_COLOR}
                            />
                        </View>
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.card}
                    activeOpacity={0.9}
                    onPress={() => router.navigate("/(tabs)/map")}
                >
                    <Text style={styles.header}>
                        Gelaufene Meter{" "}
                        <Text style={styles.description}>
                            (in den letzten 2 Wochen)
                        </Text>
                    </Text>
                    <Text style={styles.value}>
                        {2187}{" "}
                        <View
                            style={{ transform: "translate3d(-2px, 5px, 0px)" }}
                        >
                            <Foundation
                                name="guide-dog"
                                size={24}
                                color={constants.TEXT_COLOR}
                            />
                        </View>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
