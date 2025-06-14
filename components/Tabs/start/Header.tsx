import React, { useRef, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Animated,
} from "react-native";
import constants from "@/app/consts";
import { useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRecord } from "@/lib/Providers/RecordProvider";
import { useCurrentData } from "@/lib/Providers/CurrentDataProvider";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Header({ dogName, image }) {
    const { isRecording } = useRecord();
    const { currentData } = useCurrentData();
    const router = useRouter();
    const blinkAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(blinkAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(blinkAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

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
        batteryContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        },
        batteryValue: {
            color: constants.TEXT_COLOR,
            fontSize: 11,
            opacity: 0.8,
            transform: [{ translateX: -2 }],
        },
    });

    return (
        <View>
            <View style={styles.textContainer}>
                <View style={styles.iconContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => router.push("/Routes/EditUserProfile")}
                    >
                        <MaterialCommunityIcons
                            name="account-circle"
                            size={50}
                            color={constants.TEXT_COLOR}
                        />
                    </TouchableOpacity>
                    <View style={styles.batteryContainer}>
                        <MaterialIcons
                            name="battery-full"
                            size={18}
                            color={constants.TEXT_COLOR}
                        />
                        <Text style={styles.batteryValue}>
                            {currentData?.battery}%
                        </Text>
                    </View>
                    {isRecording && (
                        <Animated.View
                            style={{
                                transform: [{ translateY: 10 }],
                                opacity: blinkAnim,
                            }}
                        >
                            <MaterialCommunityIcons
                                name="record-rec"
                                size={26}
                                color={constants.COMPLEMENTARY_COLOR}
                            />
                        </Animated.View>
                    )}
                </View>
                <Text style={styles.text}>{dogName}</Text>
            </View>

            <Image source={{ uri: image }} style={styles.image} />
        </View>
    );
}
