import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import constants from "@/app/consts";
import { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function Header() {
    const [dogName, setDogName] = useState("Findus");

    const styles = StyleSheet.create({
        iconContainer: {
            transform: "translateY(10px)",
            display: "flex",
            flexDirection: "row-reverse",
        },
        textContainer: {
            paddingTop: 30,
            paddingLeft: 13,
            paddingRight: 13,
            paddingBottom: 42,
            backgroundColor: constants.BACKGROUND_COLOR,
        },
        text: {
            color: constants.TEXT_COLOR,
            fontWeight: "500",
            fontSize: 45,
        },
        image: {
            width: "97%",
            height: 230,
            margin: "auto",
            borderRadius: 15,
            marginBottom: 8,
            transform: "translateY(-40px)",
        },
    });

    return (
        <View>
            <View style={styles.textContainer}>
                <View style={styles.iconContainer}>
                    <TouchableOpacity activeOpacity={0.8}>
                        <MaterialCommunityIcons
                            name="account-circle"
                            size={50}
                            color={constants.TEXT_COLOR}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.text}>Findus</Text>
            </View>

            <Image
                source={require("../../../assets/images/dog_example.jpg")}
                style={styles.image}
            />
        </View>
    );
}
