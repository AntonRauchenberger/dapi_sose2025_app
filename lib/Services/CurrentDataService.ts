import secureConstants from "@/app/secureConsts";
import { fetch } from "expo/fetch";
import Firebase from "../Firebase/Firebase";

export default class CurrentDataService {
    // gets current dog location from the server
    static async getCurrentDogData() {
        try {
            const userId = Firebase.auth?.currentUser?.uid;
            if (!userId) {
                throw new Error("Benutzer nicht authentifiziert.");
            }
            const apiUrl =
                secureConstants.SERVER_URL +
                `/api/data?type=currentdata&userId=${userId}`;

            const response = await fetch(apiUrl);

            if (!response.ok) {
                const errorData = await response.json();
                console.error(
                    "Fehler beim Holen der Hunde Daten: " + errorData.error
                );
                return;
            }

            const data = await response.json();
            return {
                longitude: data.longitude,
                latitude: data.latitude,
                status: data.status,
                battery: data.battery,
            };
        } catch (err) {
            console.error("Fehler beim Holen der Hunde Daten: " + err);
        }
    }
}
