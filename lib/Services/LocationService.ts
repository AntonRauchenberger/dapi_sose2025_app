import { doc, setDoc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Firebase from "../Firebase/Firebase";
import * as Location from "expo-location";
import secureConstants from "@/app/secureConsts";
import { fetch } from "expo/fetch";
import axios from "axios";

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

    // gets current dog location from the server
    static async getCurrentDogLocation() {
        try {
            // TODO remove
            // const userId = Firebase.auth?.currentUser?.uid;
            // if (!userId) {
            //     throw new Error("Benutzer nicht authentifiziert.");
            // }
            const userId = "jEGrvfPcYMMuuMgMVCZeOhaSTz03";
            const apiUrl =
                secureConstants.SERVER_URL +
                `/api/data?type=location&userId=${userId}`;

            const response = await fetch(apiUrl);

            if (!response.ok) {
                const errorData = await response.json();
                console.error(
                    "Fehler beim Holen der Hunde Location: " + errorData.error
                );
                alert(
                    "Fehler beim Holen der Hunde Location. " + errorData.error
                );
                return;
            }

            const data = await response.json();
            return { longitude: data.longitude, latitude: data.latitude };
        } catch (err) {
            console.error("Fehler beim Holen der Hunde Location: " + err);
            alert("Fehler beim Holen der Hunde Location. " + err);
        }
    }
}
