import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import constants from "@/app/consts";
import RouteService from "@/lib/Services/RouteService";
import { useRouter } from "expo-router";
import Dialog from "react-native-dialog";
import { useStatistics } from "@/lib/Providers/StatisticsProvider";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useCurrentData } from "@/lib/Providers/CurrentDataProvider";

export default function RoutesSlider({ reloadSlider, setReloadSlider }) {
    const [routes, setRoutes] = useState<any>();
    const [showDialog, setShowDialog] = useState(false);
    const [deleteRoute, setDeleteRoute] = useState<any>(null);
    const { isLoading } = useCurrentData();
    const router = useRouter();
    const { refreshStatistics } = useStatistics();
    const swiperKey =
        routes && routes.length > 0
            ? routes.map((r: any) => r.routeId).join(",")
            : "0";

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
            borderWidth: 1,
            borderColor: "rgba(225, 220, 220, 0.4)",
            padding: 10,
            backgroundColor: "rgba(210, 204, 204, 0.4)",
            backdropFilter: "blur(10px)",
        },
        content: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5,
        },
        routeHeader: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 5,
        },
        routeTitleWrapper: {
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
        },
        routeIcon: {
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: constants.TEXT_COLOR,
            justifyContent: "center",
            alignItems: "center",
        },
        routeIconText: {
            color: "white",
            fontSize: 12,
            fontWeight: "bold",
        },
        routeTitleText: {
            fontSize: 18,
            fontWeight: "600",
            color: constants.TEXT_COLOR,
        },
        statsGrid: {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            rowGap: 5,
            columnGap: 5,
            marginBottom: 5,
        },
        statItem: {
            width: "49%",
            backgroundColor: "#b9dfeb",
            borderRadius: 12,
            padding: 10,
            alignItems: "center",
        },
        statValue: {
            fontSize: 13,
            fontWeight: "700",
            color: "#4a3a4a",
            marginBottom: 4,
        },
        statLabel: {
            fontSize: 11,
            color: "#8a7a8a",
            textTransform: "uppercase",
            letterSpacing: 0.5,
            fontWeight: "500",
        },
        routeActions: {
            flexDirection: "row",
            gap: 8,
            marginTop: 5,
            justifyContent: "space-between",
        },
        actionBtn: {
            backgroundColor: "#0c6914",
            padding: 7,
            borderRadius: 9,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: [{ translateY: -3 }, { translateX: 3 }],
            width: 38,
        },
        deleteButton: {
            backgroundColor: "red",
            padding: 7,
            borderRadius: 9,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: [{ translateY: -3 }],
            width: 38,
        },
        actionBtnPrimary: {
            backgroundColor: "#6a5a6a",
            borderWidth: 0,
        },
        actionBtnText: {
            fontSize: 13,
            fontWeight: "500",
            color: "#5a4a5a",
        },
        actionBtnPrimaryText: {
            color: "white",
        },
    });

    return (
        <>
            <View style={{ flex: 1, height: 600 }}>
                {routes && routes.length > 0 && swiperKey != "0" ? (
                    <Swiper
                        key={swiperKey}
                        paginationStyle={{
                            transform: "translateY(45px)",
                            display: "none",
                        }}
                        showsButtons={true}
                        scrollEnabled={!isLoading}
                        nextButton={
                            <View
                                style={{
                                    borderRadius: 20,
                                    padding: 8,
                                    marginRight: 10,
                                    transform: [{ translateY: 110 }],
                                }}
                            >
                                <MaterialIcons
                                    name="arrow-forward-ios"
                                    size={22}
                                    color={constants.TEXT_COLOR}
                                />
                            </View>
                        }
                        prevButton={
                            <View
                                style={{
                                    borderRadius: 20,
                                    padding: 8,
                                    marginLeft: 10,
                                    transform: [{ translateY: 110 }],
                                }}
                            >
                                <MaterialIcons
                                    name="arrow-back-ios"
                                    size={22}
                                    color={constants.TEXT_COLOR}
                                />
                            </View>
                        }
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
                                <View style={styles.routeHeader}>
                                    <View style={styles.routeTitleWrapper}>
                                        <View style={styles.routeIcon}>
                                            <Text style={styles.routeIconText}>
                                                {index + 1}
                                            </Text>
                                        </View>
                                        <Text style={styles.routeTitleText}>
                                            Route am{" "}
                                            {new Date(
                                                route.startDate
                                            ).toLocaleDateString("de-DE", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.actionBtn}
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
                                    >
                                        <FontAwesome5
                                            name="map-marker-alt"
                                            size={21}
                                            color={constants.FONT_COLOR}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.deleteButton}
                                        activeOpacity={0.8}
                                        onPress={() => {
                                            setDeleteRoute(route);
                                            setShowDialog(true);
                                        }}
                                    >
                                        <MaterialIcons
                                            name="delete"
                                            size={23}
                                            color={constants.FONT_COLOR}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.statsGrid}>
                                    <View style={styles.statItem}>
                                        <Text style={styles.statValue}>
                                            {route.distance &&
                                            route.distance !== "" ? (
                                                route.distance + " km"
                                            ) : (
                                                <Text style={{ opacity: 0.5 }}>
                                                    Unbekannt
                                                </Text>
                                            )}
                                        </Text>
                                        <Text style={styles.statLabel}>
                                            LÄNGE
                                        </Text>
                                    </View>
                                    <View style={styles.statItem}>
                                        <Text style={styles.statValue}>
                                            {route.avgSpeed &&
                                            route.avgSpeed !== "" ? (
                                                route.avgSpeed + " km/h"
                                            ) : (
                                                <Text style={{ opacity: 0.5 }}>
                                                    Unbekannt
                                                </Text>
                                            )}
                                        </Text>
                                        <Text style={styles.statLabel}>
                                            Ø GESCHW.
                                        </Text>
                                    </View>
                                    <View style={styles.statItem}>
                                        <Text style={styles.statValue}>
                                            {route.maxSpeed &&
                                            route.maxSpeed !== "" ? (
                                                route.maxSpeed + " km/h"
                                            ) : (
                                                <Text style={{ opacity: 0.5 }}>
                                                    Unbekannt
                                                </Text>
                                            )}
                                        </Text>
                                        <Text style={styles.statLabel}>
                                            MAX. GESCHW.
                                        </Text>
                                    </View>
                                    <View style={styles.statItem}>
                                        <Text style={styles.statValue}>
                                            {route.duration &&
                                            route.duration !== "" ? (
                                                route.duration + " min"
                                            ) : (
                                                <Text style={{ opacity: 0.5 }}>
                                                    Unbekannt
                                                </Text>
                                            )}
                                        </Text>
                                        <Text style={styles.statLabel}>
                                            DAUER
                                        </Text>
                                    </View>
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
