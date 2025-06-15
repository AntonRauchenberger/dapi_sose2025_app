import { doc, setDoc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Firebase from "../Firebase/Firebase";
import { useCurrentData } from "@/lib/Providers/CurrentDataProvider";

/**
 * Service-Klasse zum Speichern, Laden und Synchronisieren von Poop-Markern für den aktuellen Nutzer.
 */
export default class PoopService {
    static async getPoopMarkerList() {
        try {
            const user = Firebase.auth?.currentUser;
            if (user) {
                await PoopService.synchronizePoopData();
            }
            const jsonValue = await AsyncStorage.getItem("poopMarkerList");
            return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch (e) {
            console.error("Fehler beim Laden:", e);
            return [];
        }
    }

    static async savePoop(dogLocation: any) {
        try {
            const savePoopMarkerList = async (list: []) => {
                try {
                    const jsonValue = JSON.stringify(list);

                    // firestore
                    const user = Firebase.auth?.currentUser;
                    if (!user) throw new Error("no user logged in");
                    const userPoopRef = doc(
                        Firebase.db,
                        "poopMarkers",
                        user.uid
                    );
                    await setDoc(userPoopRef, { markers: list });

                    // async storage
                    await AsyncStorage.setItem("poopMarkerList", jsonValue);
                } catch (e) {
                    console.error("Fehler beim Speichern:", e);
                }
            };

            let poopMarkerList = await PoopService.getPoopMarkerList();
            poopMarkerList.push(dogLocation);
            await savePoopMarkerList(poopMarkerList);
            await AsyncStorage.setItem("lastPoopTime", Date.now().toString());
        } catch (error) {
            console.error("Fehler beim speichern des Poops:", error);
        }
    }

    // Synchronisiert die Poop-Marker-Liste aus Firestore in den lokalen AsyncStorage.
    static async synchronizePoopData() {
        try {
            const user = Firebase.auth?.currentUser;
            if (!user) throw new Error("no user logged in");

            const userPoopRef = doc(Firebase.db, "poopMarkers", user.uid);
            const docSnap = await getDoc(userPoopRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                await AsyncStorage.setItem(
                    "poopMarkerList",
                    JSON.stringify(data?.markers || [])
                );
            } else {
                console.log("Kein Marker-Dokument gefunden.");
                await AsyncStorage.setItem(
                    "poopMarkerList",
                    JSON.stringify([])
                );
            }
        } catch (e) {
            console.error("Firestore Fehler:", e);
        }
    }
}
