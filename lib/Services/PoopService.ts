import { doc, setDoc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Firebase from "../Firebase/Firebase";
import { useCurrentData } from "@/lib/Providers/CurrentDataProvider";

export default class PoopService {
    static async getPoopMarkerList() {
        try {
            const jsonValue = await AsyncStorage.getItem("poopMarkerList");
            return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch (e) {
            console.error("Fehler beim Laden:", e);
            return [];
        }
    }

    static async savePoop() {
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

        const { dogLocation } = useCurrentData();
        const poopMarkerList = await PoopService.getPoopMarkerList();
        poopMarkerList.push(dogLocation);
        await savePoopMarkerList(poopMarkerList);
        await AsyncStorage.setItem("lastPoopTime", Date.now().toString());
    }

    static async synchronizePoopData() {
        try {
            // Aktuellen User holen
            const user = Firebase.auth?.currentUser;
            if (!user) throw new Error("no user logged in");

            // Dokumentreferenz in Firestore
            const userPoopRef = doc(Firebase.db, "poopMarkers", user.uid);
            const docSnap = await getDoc(userPoopRef);

            // Prüfen, ob Daten vorhanden sind
            if (docSnap.exists()) {
                const data = docSnap.data();
                const markers = data.markers || [];

                // In AsyncStorage speichern
                await AsyncStorage.setItem(
                    "poopMarkerList",
                    JSON.stringify(markers)
                );
                console.log("Synchronisierung abgeschlossen.");
            } else {
                console.log("Kein Marker-Dokument gefunden.");
            }
        } catch (e) {
            console.error("Firestore Fehler:", e);
        }
    }
}
