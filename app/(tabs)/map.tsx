import { useEffect, useState } from "react";
import { StyleSheet, View, PermissionsAndroid, Platform } from "react-native";
import Header from "@/components/Header";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function Map() {
    const [userLocation, setUserLocation] =
        useState<Location.LocationObject | null>(null);

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

    useEffect(() => {
        console.log(userLocation);
    }, [userLocation]);

    const styles = StyleSheet.create({
        mapContainer: {
            width: "95%",
            height: 230,
            margin: "auto",
            borderRadius: 15,
            overflow: "hidden",
            borderWidth: 2,
            borderColor: "lightgray",
        },
        map: {
            width: "100%",
            height: "100%",
        },
    });

    return (
        <View>
            <Header />
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: userLocation?.latitude || 37.78825,
                        longitude: userLocation?.longitude || -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {userLocation && (
                        <Marker
                            coordinate={{
                                latitude: userLocation?.latitude,
                                longitude: userLocation?.longitude,
                            }}
                        />
                    )}
                </MapView>
            </View>
        </View>
    );
}
