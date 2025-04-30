import { doc, setDoc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Firebase from "../Firebase/Firebase";
import * as Location from "expo-location";

export default class PoopService {
    static async savePoop() {
        async function getCurrentLocation() {
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
        const savePoopMarkerList = async (list: []) => {
            try {
                const jsonValue = JSON.stringify(list);

                // firestore
                const user = Firebase.auth?.currentUser;
                if (!user) throw new Error("no user logged in");
                const userPoopRef = doc(Firebase.db, "poopMarkers", user.uid);
                await setDoc(userPoopRef, { markers: list });

                // async storage
                await AsyncStorage.setItem("poopMarkerList", jsonValue);
            } catch (e) {
                console.error("Fehler beim Speichern:", e);
            }
        };
        const getPoopMarkerList = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem("poopMarkerList");
                return jsonValue != null ? JSON.parse(jsonValue) : [];
            } catch (e) {
                console.error("Fehler beim Laden:", e);
                return [];
            }
        };

        const currentLocation = await getCurrentLocation();
        const poopMarkerList = await getPoopMarkerList();
        poopMarkerList.push(currentLocation);
        await savePoopMarkerList(poopMarkerList);
        await AsyncStorage.setItem("lastPoopTime", Date.now().toString());
    }
}
