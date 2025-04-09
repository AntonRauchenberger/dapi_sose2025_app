import { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Touchable,
} from "react-native";
import Swiper from "react-native-swiper";
import constants from "@/app/consts";
import MapView from "react-native-maps";

export default function RoutesSlider() {
    const [isMapFullScreen, setIsMapFullScreen] = useState(false);

    const styles = StyleSheet.create({
        slide: {
            height: "100%",
            backgroundColor: constants.BACKGROUND_COLOR,
            width: "97%",
            margin: "auto",
            borderRadius: 15,
            borderWidth: 2,
            borderColor: constants.BACKGROUND_COLOR,
            padding: 12,
        },
        headerContainer: {
            marginBottom: 10,
        },
        header: {
            color: constants.TEXT_COLOR,
            fontSize: 20,
            fontWeight: "600",
        },
        content: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
        },
        map: {
            width: 120,
            height: 115,
            overflow: "hidden",
            borderRadius: 10,
        },
    });

    return (
        <View style={{ flex: 1, height: 300 }}>
            <Swiper
                autoplay={true}
                autoplayTimeout={20}
                paginationStyle={{ transform: "translateY(45px)" }}
                activeDot={
                    <View
                        style={{
                            backgroundColor: constants.PRIMARY_COLOR,
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            marginLeft: 3,
                            marginRight: 3,
                            marginTop: 3,
                            marginBottom: 3,
                        }}
                    />
                }
            >
                <View style={constants.SHADOW_STYLE}>
                    <View style={styles.slide}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.header}>
                                Route #1 (2. April 2025)
                            </Text>
                        </View>
                        <View style={styles.content}>
                            <View>
                                <Text style={{ color: constants.TEXT_COLOR }}>
                                    Länge:{" "}
                                    <Text
                                        style={{
                                            color: constants.SECCONDARY_COLOR,
                                        }}
                                    >
                                        4 km
                                    </Text>
                                </Text>
                                <Text style={{ color: constants.TEXT_COLOR }}>
                                    Dauer:{" "}
                                    <Text
                                        style={{
                                            color: constants.SECCONDARY_COLOR,
                                        }}
                                    >
                                        33 min
                                    </Text>
                                </Text>
                                <Text style={{ color: constants.TEXT_COLOR }}>
                                    Ø Geschwindigkeit:{" "}
                                    <Text
                                        style={{
                                            color: constants.SECCONDARY_COLOR,
                                        }}
                                    >
                                        7 km/h
                                    </Text>
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() =>
                                    setIsMapFullScreen(!isMapFullScreen)
                                }
                                disabled={isMapFullScreen}
                            >
                                <MapView
                                    style={styles.map}
                                    initialRegion={{
                                        latitude: 49.0029,
                                        longitude: 12.0957,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421,
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.slide}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>
                            Route #2 (3. April 2025)
                        </Text>
                    </View>
                    <View style={styles.content}>
                        <View>
                            <Text style={{ color: constants.TEXT_COLOR }}>
                                Länge:{" "}
                                <Text
                                    style={{
                                        color: constants.SECCONDARY_COLOR,
                                    }}
                                >
                                    42 km
                                </Text>
                            </Text>
                            <Text style={{ color: constants.TEXT_COLOR }}>
                                Dauer:{" "}
                                <Text
                                    style={{
                                        color: constants.SECCONDARY_COLOR,
                                    }}
                                >
                                    1h 33 min
                                </Text>
                            </Text>
                            <Text style={{ color: constants.TEXT_COLOR }}>
                                Ø Geschwindigkeit:{" "}
                                <Text
                                    style={{
                                        color: constants.SECCONDARY_COLOR,
                                    }}
                                >
                                    5 km/h
                                </Text>
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => setIsMapFullScreen(!isMapFullScreen)}
                            disabled={isMapFullScreen}
                        >
                            <MapView
                                style={styles.map}
                                initialRegion={{
                                    latitude: 59.0029,
                                    longitude: 32.0957,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.slide}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>
                            Route #3 (10. April 2025)
                        </Text>
                    </View>
                    <View style={styles.content}>
                        <View>
                            <Text style={{ color: constants.TEXT_COLOR }}>
                                Länge:{" "}
                                <Text
                                    style={{
                                        color: constants.SECCONDARY_COLOR,
                                    }}
                                >
                                    2 km
                                </Text>
                            </Text>
                            <Text style={{ color: constants.TEXT_COLOR }}>
                                Dauer:{" "}
                                <Text
                                    style={{
                                        color: constants.SECCONDARY_COLOR,
                                    }}
                                >
                                    10 min
                                </Text>
                            </Text>
                            <Text style={{ color: constants.TEXT_COLOR }}>
                                Ø Geschwindigkeit:{" "}
                                <Text
                                    style={{
                                        color: constants.SECCONDARY_COLOR,
                                    }}
                                >
                                    6.5 km/h
                                </Text>
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => setIsMapFullScreen(!isMapFullScreen)}
                            disabled={isMapFullScreen}
                        >
                            <MapView
                                style={styles.map}
                                initialRegion={{
                                    latitude: 29.0029,
                                    longitude: 32.0957,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </Swiper>
        </View>
    );
}
