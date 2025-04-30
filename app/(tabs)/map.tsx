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

export default function Map() {
    const [userLocation, setUserLocation] = useState<any>(null);
    const [poopMarkers, setPoopMarkers] = useState<any>(null);
    const [dogLocation, setDogLocation] = useState<any>(null);
    const [dogName, setDogName] = useState<string>("Findus");

    useEffect(() => {
        async function handle() {
            const uLocation = await LocationService.getCurrentUserLocation();
            setUserLocation(uLocation);

            const pMarkers = await PoopService.getPoopMarkerList();
            setPoopMarkers(pMarkers);

            await PoopService.synchronizePoopData();
        }

        handle();
    }, []);

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
            <Text style={styles.headline}>Hunde-Tracker</Text>
            <Text style={styles.descText}>
                Der Standort deines Hundes und dein Eigener.
            </Text>
            <View style={constants.SHADOW_STYLE}>
                <View style={styles.mapContainer}>
                    {userLocation && poopMarkers ? (
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: userLocation?.latitude || 49.0029,
                                longitude: userLocation?.longitude || 12.0957,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        >
                            <Marker
                                coordinate={{
                                    latitude: userLocation?.latitude,
                                    longitude: userLocation?.longitude,
                                }}
                                title={"Dein Standort"}
                            />
                            <Marker
                                coordinate={{
                                    latitude:
                                        dogLocation?.coords?.latitude ??
                                        49.0029,
                                    longitude:
                                        dogLocation?.coords?.longitude ??
                                        12.0957,
                                }}
                                title={dogName}
                                style={styles.dogMarker}
                            >
                                <View style={styles.dogMarker}>
                                    <Image
                                        source={require("../../assets/images/dog_example.jpg")}
                                        style={{ width: 40, height: 40 }}
                                    />
                                </View>
                            </Marker>
                            {poopMarkers.map((location: any) => {
                                if (location?.latitude && location?.longitude) {
                                    return (
                                        <Marker
                                            coordinate={{
                                                latitude: location.latitude,
                                                longitude: location.longitude,
                                            }}
                                            title={"Poop"}
                                            style={styles.poopMarker}
                                        >
                                            <View style={styles.poopMarker}>
                                                <FontAwesome6
                                                    name="poop"
                                                    size={14}
                                                    color={constants.TEXT_COLOR}
                                                />
                                            </View>
                                        </Marker>
                                    );
                                }
                            })}
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
                Deine Gassi-Routen der letzten 2 Wochen.
            </Text>
            <View
                style={{
                    height: 180,
                    zIndex: 10,
                    marginBottom: 5,
                }}
            >
                <RoutesSlider />
            </View>
            <View
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 21,
                }}
            >
                <RecordButton />
            </View>
        </View>
    );
}
