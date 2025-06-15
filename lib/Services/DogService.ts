import { doc, setDoc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Service-Klasse zum Speichern, Laden und Abrufen von Hundedaten für den aktuellen Nutzer.
 */
export default class DogService {
    static async saveDogProfile(Firebase: any, dogData: any) {
        try {
            const user = Firebase.auth?.currentUser;
            if (!user) throw new Error("no user logged in");

            const userDocRef = doc(Firebase.db, "dogs", user.uid);
            await setDoc(userDocRef, dogData);
            AsyncStorage.setItem("dogProfile", JSON.stringify(dogData));
        } catch (error) {
            console.error("Error saving dog data: ", error);
            throw error;
        }
    }

    static async loadDogData(Firebase: any) {
        try {
            const user = Firebase.auth?.currentUser;
            if (!user) throw new Error("no user logged in");

            const userDocRef = doc(Firebase.db, "dogs", user.uid);
            const docSnap = await getDoc(userDocRef);

            if (docSnap.exists()) {
                const dogData = docSnap.data();
                await AsyncStorage.setItem(
                    "dogProfile",
                    JSON.stringify(dogData)
                );
                return dogData;
            } else {
                console.warn("No dog data found for this user.");
                return null;
            }
        } catch (error) {
            console.error("Error fetching dog data: ", error);
            throw error;
        }
    }

    static async getDogName() {
        try {
            const dogProfile = await AsyncStorage.getItem("dogProfile");
            if (dogProfile !== "") {
                const parsedProfile = JSON.parse(dogProfile);
                return parsedProfile.name || "Unknown Dog";
            } else {
                return "Unknown Dog";
            }
        } catch (error) {
            console.error("Error retrieving dog name: ", error);
            return "Unknown Dog";
        }
    }
}
