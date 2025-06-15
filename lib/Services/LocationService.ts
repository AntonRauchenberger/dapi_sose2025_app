import * as Location from "expo-location";

/**
 * Service-Klasse für Standortermittlung und Distanzberechnung zwischen zwei Koordinaten.
 */
export default class LocationService {
    static async getCurrentUserLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            return;
        }
        const location = await Location.getCurrentPositionAsync({});
        return {
            latitude: location?.coords?.latitude,
            longitude: location?.coords?.longitude,
        };
    }

    // Berechnet die Distanz in Kilometern zwischen zwei Koordinaten.
    static getDistanceBetweenLocations(
        location1: { latitude: number; longitude: number },
        location2: { latitude: number; longitude: number }
    ) {
        const lat1 = location1.latitude;
        const lon1 = location1.longitude;
        const lat2 = location2.latitude;
        const lon2 = location2.longitude;

        const R = 6371e3;
        const x1 = (lat1 * Math.PI) / 180;
        const x2 = (lat2 * Math.PI) / 180;
        const x3 = ((lat2 - lat1) * Math.PI) / 180;
        const x4 = ((lon2 - lon1) * Math.PI) / 180;

        const a =
            Math.sin(x3 / 2) * Math.sin(x3 / 2) +
            Math.cos(x1) * Math.cos(x2) * Math.sin(x4 / 2) * Math.sin(x4 / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distanceInMeters = R * c;

        const distanceInKilometers = distanceInMeters / 1000;
        return Math.round(distanceInKilometers * 1000) / 1000;
    }
}
