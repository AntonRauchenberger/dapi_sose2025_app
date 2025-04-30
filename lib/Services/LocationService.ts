import { doc, setDoc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Firebase from "../Firebase/Firebase";
import * as Location from "expo-location";

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
}
