import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import constants from "@/app/consts";
import MapView, { Polyline } from "react-native-maps";
import RouteService from "@/lib/Services/RouteService";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Dialog from "react-native-dialog";
import { useStatistics } from "@/lib/Providers/StatisticsProvider";

export default function RoutesSlider({ reloadSlider, setReloadSlider }) {
    const [isMapFullScreen, setIsMapFullScreen] = useState(false);
    const [routes, setRoutes] = useState<any>();
    const [showDialog, setShowDialog] = useState(false);
    const [deleteRoute, setDeleteRoute] = useState<any>(null);
    const router = useRouter();
    const { refreshStatistics } = useStatistics();

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
            backgroundColor: constants.BACKGROUND_COLOR,
        },
        headerContainer: {
            borderBottomColor: constants.TEXT_COLOR,
            borderBottomWidth: 2,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 5,
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
            height: 108,
            overflow: "hidden",
            borderRadius: 10,
        },
        deleteButton: {
            backgroundColor: constants.COMPLEMENTARY_COLOR,
            padding: 7,
            borderRadius: 9,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: [{ translateY: -3 }],
        },
    });

    return (
        <>
            <View style={{ flex: 1, height: 300 }}>
                {routes && routes.length > 0 ? (
                    <Swiper
                        paginationStyle={{
                            transform: "translateY(45px)",
                            display: routes.length > 8 ? "none" : "block",
                        }}
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
                                    <TouchableOpacity
                                        style={styles.deleteButton}
                                        activeOpacity={0.8}
                                        onPress={() => {
                                            setDeleteRoute(route);
                                            setShowDialog(true);
                                        }}
                                    >
                                        <AntDesign
                                            name="delete"
                                            size={23}
                                            color={constants.TEXT_COLOR}
                                        />
                                    </TouchableOpacity>
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
                                                {route.distance &&
                                                route.disabled !== "" ? (
                                                    route.distance + " km"
                                                ) : (
                                                    <Text
                                                        style={{ opacity: 0.5 }}
                                                    >
                                                        Unbekannt
                                                    </Text>
                                                )}
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
                                                {route.duration &&
                                                route.duration !== "" ? (
                                                    route.duration + " min"
                                                ) : (
                                                    <Text
                                                        style={{ opacity: 0.5 }}
                                                    >
                                                        Unbekannt
                                                    </Text>
                                                )}
                                            </Text>
                                        </Text>
                                        <Text
                                            style={{
                                                color: constants.SECCONDARY_COLOR,
                                            }}
                                        >
                                            Ø Speed:{" "}
                                            <Text
                                                style={{
                                                    color: constants.TEXT_COLOR,
                                                }}
                                            >
                                                {route.avgSpeed &&
                                                route.avgSpeed !== "" ? (
                                                    route.avgSpeed + " km/h"
                                                ) : (
                                                    <Text
                                                        style={{ opacity: 0.5 }}
                                                    >
                                                        Unbekannt
                                                    </Text>
                                                )}
                                            </Text>
                                        </Text>
                                        <Text
                                            style={{
                                                color: constants.SECCONDARY_COLOR,
                                            }}
                                        >
                                            Max. Speed:{" "}
                                            <Text
                                                style={{
                                                    color: constants.TEXT_COLOR,
                                                }}
                                            >
                                                {route.maxSpeed &&
                                                route.maxSpeed !== "" ? (
                                                    route.maxSpeed + " km/h"
                                                ) : (
                                                    <Text
                                                        style={{ opacity: 0.5 }}
                                                    >
                                                        Unbekannt
                                                    </Text>
                                                )}
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
                                                latitude:
                                                    route.gpsList[0].latitude,
                                                longitude:
                                                    route.gpsList[0].longitude,
                                                latitudeDelta: 0.0922,
                                                longitudeDelta: 0.0421,
                                            }}
                                        >
                                            <Polyline
                                                coordinates={route.gpsList.map(
                                                    (point: any) => ({
                                                        latitude:
                                                            point.latitude,
                                                        longitude:
                                                            point.longitude,
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
                        <View
                            style={[
                                styles.content,
                                {
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                },
                            ]}
                        >
                            <Text
                                style={{
                                    color: constants.TEXT_COLOR,
                                    opacity: 0.7,
                                    transform: [{ translateY: -6 }],
                                    textAlign: "center",
                                }}
                            >
                                Keine Routen vorhanden ...
                            </Text>
                        </View>
                    </View>
                )}
            </View>
            <Dialog.Container visible={showDialog}>
                <Dialog.Title>Route wirklich löschen?</Dialog.Title>
                <Dialog.Description>
                    {"Länge: " +
                        (deleteRoute?.distance || "Unbekannt") +
                        " km\n"}
                    {"Dauer: " +
                        (deleteRoute?.duration || "Unbekannt") +
                        " min\n"}
                    {"Ø Speed: " +
                        (deleteRoute?.avgSpeed || "Unbekannt") +
                        " km/h\n"}
                    {"Max. Speed: " +
                        (deleteRoute?.maxSpeed || "Unbekannt") +
                        " km/h"}
                </Dialog.Description>
                <Dialog.Button
                    label="Abbrechen"
                    onPress={() => {
                        setShowDialog(false);
                    }}
                />
                <Dialog.Button
                    label="Löschen"
                    color="red"
                    onPress={async () => {
                        setShowDialog(false);
                        await RouteService.deleteRoute(
                            deleteRoute.routeId,
                            deleteRoute.distance
                        );
                        await refreshStatistics();
                        setReloadSlider(true);
                    }}
                />
            </Dialog.Container>
        </>
    );
}
