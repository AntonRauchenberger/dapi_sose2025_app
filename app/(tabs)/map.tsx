import { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import Header from "@/components/Header";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import constants from "../consts";

export default function Map() {
    const [userLocation, setUserLocation] = useState<any>(null);

    useEffect(() => {
        async function getCurrentLocation() {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setUserLocation(location);
        }

        getCurrentLocation();
    }, []);

    const styles = StyleSheet.create({
        mapContainer: {
            width: "97%",
            height: 230,
            margin: "auto",
            borderRadius: 15,
            overflow: "hidden",
            borderWidth: 2,
            borderColor: constants.FONT_COLOR,
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
    });

    return (
        <View style={{ backgroundColor: constants.FONT_COLOR }}>
            <Header />
            <View style={styles.mapContainer}>
                {userLocation ? (
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: userLocation?.coords?.latitude || 49.0029,
                            longitude:
                                userLocation?.coords?.longitude || 12.0957,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: userLocation?.coords?.latitude,
                                longitude: userLocation?.coords?.longitude,
                            }}
                            title={"Dein Standort"}
                        />
                    </MapView>
                ) : (
                    <View style={styles.mapLoadingScreen}>
                        <ActivityIndicator
                            size={"small"}
                            color={constants.PRIMARY_COLOR}
                        />
                    </View>
                )}
            </View>
        </View>
    );
}
