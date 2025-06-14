import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { View, Text } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import constants from "../consts";

export default function CustomCamera() {
    const { routeData } = useLocalSearchParams();

    const parsedRoute =
        typeof routeData === "string" ? JSON.parse(routeData) : routeData;

    if (!parsedRoute?.gpsList) {
        return (
            <View
                style={{
                    marginTop: 400,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>Fehler</Text>
            </View>
        );
    }

    return (
        <MapView
            style={{ flex: 1 }}
            initialRegion={{
                latitude: parsedRoute.gpsList[0].latitude,
                longitude: parsedRoute.gpsList[0].longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            <Polyline
                coordinates={parsedRoute.gpsList.map((point: any) => ({
                    latitude: point.latitude,
                    longitude: point.longitude,
                }))}
                strokeColor={constants.COMPLEMENTARY_COLOR}
                strokeWidth={3}
            />
            <Marker
                coordinate={{
                    latitude: parsedRoute.gpsList[0].latitude,
                    longitude: parsedRoute.gpsList[0].longitude,
                }}
                title={"Start"}
            />
            <Marker
                coordinate={{
                    latitude:
                        parsedRoute.gpsList[parsedRoute.gpsList.length - 1]
                            .latitude,
                    longitude:
                        parsedRoute.gpsList[parsedRoute.gpsList.length - 1]
                            .longitude,
                }}
                title={"Ende"}
            />
        </MapView>
    );
}
