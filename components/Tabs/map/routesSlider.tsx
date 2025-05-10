import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import constants from "@/app/consts";
import MapView, { Polyline } from "react-native-maps";
import RouteService from "@/lib/Services/RouteService";
import { useRouter } from "expo-router";

export default function RoutesSlider({ reloadSlider, setReloadSlider }) {
    const [isMapFullScreen, setIsMapFullScreen] = useState(false);
    const [routes, setRoutes] = useState<any>();
    const router = useRouter();

    useEffect(() => {
        async function handle() {
            const fetchedRoutes = await RouteService.getRoutes();
            setRoutes(fetchedRoutes);
        }

        handle();
    }, []);

    useEffect(() => {
        async function handle() {
            if (reloadSlider) {
                const fetchedRoutes = await RouteService.getRoutes();
                setRoutes(fetchedRoutes);
                setReloadSlider(false);
            }
        }

        handle();
    }, [reloadSlider]);

    const styles = StyleSheet.create({
        slide: {
            height: "100%",
            width: "97%",
            margin: "auto",
            borderRadius: 15,
            borderWidth: 2,
            borderColor: constants.TEXT_COLOR,
            padding: 10,
        },
        headerContainer: {
            borderBottomColor: constants.TEXT_COLOR,
            borderBottomWidth: 2,
        },
        header: {
            color: constants.TEXT_COLOR,
            fontSize: 20,
            fontWeight: "600",
            marginBottom: 5,
        },
        content: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5,
        },
        map: {
            width: 120,
            height: 117,
            overflow: "hidden",
            borderRadius: 10,
        },
    });

    return (
        <View style={{ flex: 1, height: 300 }}>
            {routes && routes.length > 0 ? (
                <Swiper
                    autoplay={true}
                    autoplayTimeout={20}
                    paginationStyle={{ transform: "translateY(45px)" }}
                    activeDot={
                        <View
                            style={{
                                backgroundColor: constants.TEXT_COLOR,
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
                    {routes.map((route: any, index: any) => (
                        <View key={index} style={styles.slide}>
                            <View style={styles.headerContainer}>
                                <Text style={styles.header}>
                                    Route #{index + 1} (
                                    {new Date(
                                        route.startDate
                                    ).toLocaleDateString("de-DE", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                    )
                                </Text>
                            </View>
                            <View style={styles.content}>
                                <View>
                                    <Text
                                        style={{
                                            color: constants.SECCONDARY_COLOR,
                                        }}
                                    >
                                        Länge:{" "}
                                        <Text
                                            style={{
                                                color: constants.TEXT_COLOR,
                                            }}
                                        >
                                            {route.distance} km
                                        </Text>
                                    </Text>
                                    <Text
                                        style={{
                                            color: constants.SECCONDARY_COLOR,
                                        }}
                                    >
                                        Dauer:{" "}
                                        <Text
                                            style={{
                                                color: constants.TEXT_COLOR,
                                            }}
                                        >
                                            {route.duration} min
                                        </Text>
                                    </Text>
                                    <Text
                                        style={{
                                            color: constants.SECCONDARY_COLOR,
                                        }}
                                    >
                                        Ø Geschwindigkeit:{" "}
                                        <Text
                                            style={{
                                                color: constants.TEXT_COLOR,
                                            }}
                                        >
                                            {route.avgSpeed} km/h
                                        </Text>
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() =>
                                        router.push({
                                            pathname:
                                                "/RouteRoute/RouteDetails",
                                            params: {
                                                routeData:
                                                    JSON.stringify(route),
                                            },
                                        })
                                    }
                                    disabled={isMapFullScreen}
                                >
                                    <MapView
                                        style={styles.map}
                                        initialRegion={{
                                            latitude: route.gpsList[0].latitude,
                                            longitude:
                                                route.gpsList[0].longitude,
                                            latitudeDelta: 0.0922,
                                            longitudeDelta: 0.0421,
                                        }}
                                    >
                                        <Polyline
                                            coordinates={route.gpsList.map(
                                                (point: any) => ({
                                                    latitude: point.latitude,
                                                    longitude: point.longitude,
                                                })
                                            )}
                                            strokeColor={
                                                constants.COMPLEMENTARY_COLOR
                                            }
                                            strokeWidth={3}
                                        />
                                    </MapView>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </Swiper>
            ) : (
                <View style={styles.slide}>
                    <View style={styles.headerContainer}></View>
                    <View style={styles.content}>
                        <View>
                            <Text>
                                Keine Routen gefunden.{" "}
                                <Text
                                    style={{
                                        color: constants.TEXT_COLOR,
                                    }}
                                >
                                    Bitte starte eine Route.
                                </Text>
                            </Text>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
}
