import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Firebase from "../Firebase/Firebase";
import secureConstants from "@/app/secureConsts";
import { useStatistics } from "../Providers/StatisticsProvider";

export default class StatisticsService {
    static async getStatistics() {
        try {
            const jsonValue = await AsyncStorage.getItem("statistics");
            return jsonValue != null ? JSON.parse(jsonValue) : {};
        } catch (e) {
            console.error("Fehler beim Laden:", e);
            return [];
        }
    }

    static async addAlert() {
        try {
            const jsonValue = await AsyncStorage.getItem("statistics");
            const parsedValue = jsonValue != null ? JSON.parse(jsonValue) : {};
            const alertCount = parsedValue.alertCount || 0;
            const newAlertCount = alertCount + 1;
            const newStatistics = { ...parsedValue, alertCount: newAlertCount };

            // AsyncStorage
            await AsyncStorage.setItem(
                "statistics",
                JSON.stringify(newStatistics)
            );

            // Firestore
            // TODO remove comment
            // const user = Firebase.auth?.currentUser;
            // if (!user) throw new Error("no user logged in");
            // const userPoopRef = doc(Firebase.db, "poopMarkers", user.uid);

            const userStatisticsRef = doc(
                Firebase.db,
                "statistics",
                secureConstants.ADMIN_USER_ID
            );
            await setDoc(userStatisticsRef, newStatistics);
        } catch (e) {
            console.error("Fehler beim Speichern:", e);
        }
    }

    static async addPoop() {
        try {
            const jsonValue = await AsyncStorage.getItem("statistics");
            const parsedValue = jsonValue != null ? JSON.parse(jsonValue) : {};
            const poopCount = parsedValue.poopCount || 0;
            const newPoopCount = poopCount + 1;
            const newStatistics = { ...parsedValue, poopCount: newPoopCount };

            // AsyncStorage
            await AsyncStorage.setItem(
                "statistics",
                JSON.stringify(newStatistics)
            );

            // Firestore
            // TODO remove comment
            // const user = Firebase.auth?.currentUser;
            // if (!user) throw new Error("no user logged in");
            // const userPoopRef = doc(Firebase.db, "poopMarkers", user.uid);

            const userStatisticsRef = doc(
                Firebase.db,
                "statistics",
                secureConstants.ADMIN_USER_ID
            );
            await setDoc(userStatisticsRef, newStatistics);
        } catch (e) {
            console.error("Fehler beim Speichern:", e);
        }
    }

    static async addImage() {
        try {
            const jsonValue = await AsyncStorage.getItem("statistics");
            const parsedValue = jsonValue != null ? JSON.parse(jsonValue) : {};
            const imageCount = parsedValue.imageCount || 0;
            const newImageCount = imageCount + 1;
            const newStatistics = { ...parsedValue, imageCount: newImageCount };

            // AsyncStorage
            await AsyncStorage.setItem(
                "statistics",
                JSON.stringify(newStatistics)
            );

            // Firestore
            // TODO remove comment
            // const user = Firebase.auth?.currentUser;
            // if (!user) throw new Error("no user logged in");
            // const userPoopRef = doc(Firebase.db, "poopMarkers", user.uid);

            const userStatisticsRef = doc(
                Firebase.db,
                "statistics",
                secureConstants.ADMIN_USER_ID
            );
            await setDoc(userStatisticsRef, newStatistics);
        } catch (e) {
            console.error("Fehler beim Speichern:", e);
        }
    }

    static async addDistance(distance: number) {
        try {
            const jsonValue = await AsyncStorage.getItem("statistics");
            const parsedValue = jsonValue != null ? JSON.parse(jsonValue) : {};
            const distanceCount = parsedValue.distanceCount || 0;
            const newDistanceCount = distanceCount + distance;
            const newStatistics = {
                ...parsedValue,
                distanceCount: newDistanceCount,
            };

            // AsyncStorage
            await AsyncStorage.setItem(
                "statistics",
                JSON.stringify(newStatistics)
            );

            // Firestore
            // TODO remove comment
            // const user = Firebase.auth?.currentUser;
            // if (!user) throw new Error("no user logged in");
            // const userPoopRef = doc(Firebase.db, "poopMarkers", user.uid);

            const userStatisticsRef = doc(
                Firebase.db,
                "statistics",
                secureConstants.ADMIN_USER_ID
            );
            await setDoc(userStatisticsRef, newStatistics);
        } catch (e) {
            console.error("Fehler beim Speichern:", e);
        }
    }

    // TODO einsetzen beim login
    static async synchronizeStatistics() {
        const { statistics } = useStatistics();
        const user = Firebase.auth?.currentUser;
        if (!user) throw new Error("no user logged in");
        const userStatisticsRef = doc(Firebase.db, "statistics", user.uid);

        const docSnap = await getDoc(userStatisticsRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            const statisticsData = data.statistics || {};

            // In AsyncStorage speichern
            await AsyncStorage.setItem(
                "statistics",
                JSON.stringify(statisticsData)
            );
        } else {
            await AsyncStorage.setItem("statistics", JSON.stringify({}));
        }
    }

    static async getDiagramData() {
        // TODO
    }
}
