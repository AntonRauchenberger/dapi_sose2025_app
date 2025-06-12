import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Firebase from "../Firebase/Firebase";
import secureConstants from "@/app/secureConsts";
import { useStatistics } from "../Providers/StatisticsProvider";

export default class StatisticsService {
    static async getStatistics() {
        try {
            let jsonValue = await AsyncStorage.getItem("statistics");
            if (jsonValue === "") {
                StatisticsService.synchronizeStatistics();
                jsonValue = await AsyncStorage.getItem("statistics");
            }
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
            const user = Firebase.auth?.currentUser;
            if (!user) throw new Error("no user logged in");

            const userStatisticsRef = doc(Firebase.db, "statistics", user.uid);
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
            const user = Firebase.auth?.currentUser;
            if (!user) throw new Error("no user logged in");

            const userStatisticsRef = doc(Firebase.db, "statistics", user.uid);
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
            const user = Firebase.auth?.currentUser;
            if (!user) throw new Error("no user logged in");

            const userStatisticsRef = doc(Firebase.db, "statistics", user.uid);
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
            const user = Firebase.auth?.currentUser;
            if (!user) throw new Error("no user logged in");

            const userStatisticsRef = doc(Firebase.db, "statistics", user.uid);
            await setDoc(userStatisticsRef, newStatistics);
        } catch (e) {
            console.error("Fehler beim Speichern:", e);
        }
    }

    static async subDistance(distance: number) {
        try {
            const jsonValue = await AsyncStorage.getItem("statistics");
            const parsedValue = jsonValue != null ? JSON.parse(jsonValue) : {};
            const distanceCount = parsedValue.distanceCount || 0;
            const newDistanceCount = distanceCount - distance;
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
            const user = Firebase.auth?.currentUser;
            if (!user) throw new Error("no user logged in");

            const userStatisticsRef = doc(Firebase.db, "statistics", user.uid);
            await setDoc(userStatisticsRef, newStatistics);
        } catch (e) {
            console.error("Fehler beim Speichern:", e);
        }
    }

    static async synchronizeStatistics() {
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
        const userId = Firebase.auth?.currentUser?.uid;
        if (!userId) {
            throw new Error("Benutzer nicht authentifiziert.");
        }

        const apiUrl =
            secureConstants.SERVER_URL +
            `/api/data?type=distancedevelopment&userId=${userId}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
            const errorData = await response.json();
            console.error(
                "Fehler beim Laden der Diagramm Statistiken: " + errorData.error
            );
            return false;
        }

        const data = await response.json();
        const convertedData: number[] = data
            .filter(
                (item: any) =>
                    item !== null &&
                    item !== undefined &&
                    item !== "" &&
                    item !== "Infinity" &&
                    item !== "-Infinity" &&
                    !isNaN(Number(item))
            )
            .map((item: any) => Number(item))
            .filter((num: number) => Number.isFinite(num));
        while (convertedData.length < 14) {
            convertedData.unshift(0);
        }
        return convertedData;
    }

    static async getActivityStats() {
        const userId = Firebase.auth?.currentUser?.uid;
        if (!userId) {
            throw new Error("Benutzer nicht authentifiziert.");
        }

        const apiUrl =
            secureConstants.SERVER_URL +
            `/api/data?type=currentactivitystate&userId=${userId}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
            const errorData = await response.json();
            console.error(
                "Fehler beim Laden des Aktivitätsstatus: " + errorData.error
            );
            return false;
        }

        const data = await response.json();
        if (data?.restingTime) {
            data.restingTime = +(data.restingTime / 60).toFixed(1); // convert to hours
        }
        if (data?.status) {
            data.status =
                data.status.charAt(0).toUpperCase() + data.status.slice(1);
        }
        return data;
    }
}
