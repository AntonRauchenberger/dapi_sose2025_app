import { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator, Text, Image } from "react-native";
import Header from "@/components/Header";
import MapView, { Marker } from "react-native-maps";
import constants from "../consts";
import RoutesSlider from "@/components/Tabs/map/routesSlider";
import RecordButton from "@/components/Tabs/map/RecordButton";
import LocationService from "@/lib/Services/LocationService";
import PoopService from "@/lib/Services/PoopService";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useCurrentData } from "@/lib/Providers/CurrentDataProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function Map() {
    const [userLocation, setUserLocation] = useState<any>(null);
    const [poopMarkers, setPoopMarkers] = useState<any>(null);
    const { dogLocation } = useCurrentData();
    const [dogProfile, setDogProfile] = useState<any>(null);
    const [initialRegion, setInitialRegion] = useState<any>(null);
    const [reloadSlider, setReloadSlider] = useState(false);

    const loadData = async () => {
        const dProfile = await AsyncStorage.getItem("dogProfile");
        setDogProfile(JSON.parse(dProfile || "{}"));

        const uLocation = await LocationService.getCurrentUserLocation();
        setUserLocation(uLocation);

        const pMarkers = await PoopService.getPoopMarkerList();
        setPoopMarkers(pMarkers);
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        async function handle() {
            const uLocation = await LocationService.getCurrentUserLocation();
            setUserLocation(uLocation);
        }

        handle();
    }, [dogLocation]);

    useEffect(() => {
        if (userLocation && !initialRegion) {
            setInitialRegion({
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        }
    }, [userLocation]);

    const styles = StyleSheet.create({
        headline: {
            fontSize: 19,
            fontWeight: "500",
            color: constants.TEXT_COLOR,
            width: "95%",
            margin: "auto",
        },
        descText: {
            fontSize: 12,
            opacity: 0.4,
            width: "95%",
            margin: "auto",
            marginBottom: 4,
        },
        mapContainer: {
            width: "97%",
            height: 230,
            margin: "auto",
            borderRadius: 15,
            overflow: "hidden",
            marginBottom: 9,
            padding: 1,
        },
        map: {
            width: "100%",
            height: "100%",
        },
        mapLoadingScreen: {
            backgroundColor: constants.BACKGROUND_COLOR,
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        dogMarker: {
            width: 40,
            height: 40,
            borderRadius: 20,
            overflow: "hidden",
            backgroundColor: constants.COMPLEMENTARY_COLOR,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
        },
        userMarker: {
            width: 40,
            height: 40,
            borderRadius: 20,
            overflow: "hidden",
            backgroundColor: constants.SECCONDARY_COLOR,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 5,
        },
        poopMarker: {
            width: 25,
            height: 25,
            borderRadius: 13,
            overflow: "hidden",
            backgroundColor: constants.COMPLEMENTARY_COLOR,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
    });

    return (
        <View style={{ backgroundColor: constants.FONT_COLOR }}>
            <Header />
            <Text style={[styles.headline, { marginTop: 8 }]}>
                Hunde-Tracker
            </Text>
            <Text style={styles.descText}>
                Der Standort deines Hundes und dein Eigener.
            </Text>
            <View style={constants.SHADOW_STYLE}>
                <View style={styles.mapContainer}>
                    {userLocation &&
                    poopMarkers &&
                    dogLocation &&
                    initialRegion ? (
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: initialRegion?.latitude || 49.0029,
                                longitude: initialRegion?.longitude || 12.0957,
                                latitudeDelta:
                                    initialRegion?.latitudeDelta || 0.0922,
                                longitudeDelta:
                                    initialRegion?.longitudeDelta || 0.0421,
                            }}
                        >
                            {userLocation && (
                                <Marker
                                    coordinate={{
                                        latitude:
                                            userLocation?.latitude || 49.0029,
                                        longitude:
                                            userLocation?.longitude || 12.0957,
                                    }}
                                    title={"Dein Standort"}
                                >
                                    <View style={styles.userMarker}>
                                        <MaterialCommunityIcons
                                            name="account-circle"
                                            size={28}
                                            color={constants.TEXT_COLOR}
                                        />
                                    </View>
                                </Marker>
                            )}
                            {dogLocation && (
                                <Marker
                                    coordinate={{
                                        latitude:
                                            dogLocation?.latitude ?? 49.0029,
                                        longitude:
                                            dogLocation?.longitude ?? 12.0957,
                                    }}
                                    title={dogProfile?.name || "Hund"}
                                    style={styles.dogMarker}
                                >
                                    <View style={styles.dogMarker}>
                                        <Image
                                            source={{ uri: dogProfile?.image }}
                                            style={{ width: 40, height: 40 }}
                                        />
                                    </View>
                                </Marker>
                            )}
                            {poopMarkers !== null &&
                                poopMarkers !== undefined &&
                                poopMarkers.map(
                                    (location: any, index: number) => {
                                        if (
                                            location?.latitude &&
                                            location?.longitude
                                        ) {
                                            return (
                                                <Marker
                                                    key={index}
                                                    coordinate={{
                                                        latitude:
                                                            location.latitude,
                                                        longitude:
                                                            location.longitude,
                                                    }}
                                                    title={"Poop"}
                                                    style={styles.poopMarker}
                                                >
                                                    <View
                                                        style={
                                                            styles.poopMarker
                                                        }
                                                    >
                                                        <FontAwesome6
                                                            name="poop"
                                                            size={14}
                                                            color={
                                                                constants.TEXT_COLOR
                                                            }
                                                        />
                                                    </View>
                                                </Marker>
                                            );
                                        }
                                    }
                                )}
                        </MapView>
                    ) : (
                        <View style={styles.mapLoadingScreen}>
                            <ActivityIndicator
                                size={"small"}
                                color={constants.TEXT_COLOR}
                            />
                        </View>
                    )}
                </View>
            </View>
            <Text style={styles.headline}>Gassi-Routen</Text>
            <Text style={styles.descText}>
                Ein Überblick über all deine Gassi-Routen.
            </Text>
            <View
                style={{
                    height: 180,
                    zIndex: 10,
                    marginBottom: 5,
                }}
            >
                <RoutesSlider
                    reloadSlider={reloadSlider}
                    setReloadSlider={setReloadSlider}
                />
            </View>
            <View
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 7,
                }}
            >
                <RecordButton
                    setReloadSlider={setReloadSlider}
                    loadData={loadData}
                />
            </View>
        </View>
    );
}
