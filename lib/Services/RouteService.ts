import { doc, setDoc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Firebase from "../Firebase/Firebase";
import secureConstants from "@/app/secureConsts";
import { fetch } from "expo/fetch";

export default class RouteService {
    static simpleHash(input: string): string {
        let hash = 0;
        for (let i = 0; i < input.length; i++) {
            const char = input.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash |= 0;
        }
        return Math.abs(hash).toString();
    }

    // starts a new route tracking
    static async startRoute() {
        try {
            // TODO remove
            // const userId = Firebase.auth?.currentUser?.uid;
            // if (!userId) {
            //     throw new Error("Benutzer nicht authentifiziert.");
            // }
            const userId = "jEGrvfPcYMMuuMgMVCZeOhaSTz03";

            const routeId = RouteService.simpleHash(
                new Date().toISOString() + userId
            );

            const apiUrl =
                secureConstants.SERVER_URL +
                `/api/data?type=route&userId=${userId}&routeId=${routeId}&status=start`;

            const response = await fetch(apiUrl);

            if (!response.ok) {
                const errorData = await response.json();
                console.error(
                    "Fehler beim Starten der Route: " + errorData.error
                );
                alert("Fehler beim Starten der Route. " + errorData.error);
                return false;
            }
            return true;
        } catch (err) {
            console.error("Fehler beim Starten der Route: " + err);
            alert("Fehler beim Starten der Route.. " + err);
            return false;
        }
    }

    static async saveRoute(routeData: any) {
        try {
            // Firebase
            const db = Firebase.db;
            // TODO remove comments
            // const userId = Firebase.auth?.currentUser?.uid;
            // if (!userId) {
            //     throw new Error("Benutzer nicht authentifiziert.");
            // }
            const userId = "jEGrvfPcYMMuuMgMVCZeOhaSTz03";

            const userRoutesRef = doc(db, "routes", userId);
            const userRoutesDoc = await getDoc(userRoutesRef);

            let firebaseRoutes = [];
            if (userRoutesDoc.exists()) {
                const data = userRoutesDoc.data();
                firebaseRoutes = Array.isArray(data.images) ? data.images : [];
            }

            firebaseRoutes.push(routeData);
            await setDoc(userRoutesRef, { routes: firebaseRoutes });

            // AsyncStorage
            const storedRoutes = await AsyncStorage.getItem("savedRoutes");
            const routes = Array.isArray(JSON.parse(storedRoutes))
                ? JSON.parse(storedRoutes)
                : [];

            routes.push(routeData);

            await AsyncStorage.setItem("savedRoutes", JSON.stringify(routes));
        } catch (error) {
            console.error("Error saving route data: ", error);
            throw error;
        }
    }

    static async stopRoute() {
        try {
            // TODO remove
            // const userId = Firebase.auth?.currentUser?.uid;
            // if (!userId) {
            //     throw new Error("Benutzer nicht authentifiziert.");
            // }
            const userId = "jEGrvfPcYMMuuMgMVCZeOhaSTz03";

            const routeId = RouteService.simpleHash(
                new Date().toISOString() + userId
            );

            const apiUrl =
                secureConstants.SERVER_URL +
                `/api/data?type=route&userId=${userId}&routeId=${routeId}&status=stop`;

            const response = await fetch(apiUrl);

            if (!response.ok) {
                const errorData = await response.json();
                console.error(
                    "Fehler beim Stoppen der Route: " + errorData.error
                );
                alert("Fehler beim Stoppen der Route. " + errorData.error);
                return false;
            }

            const data = await response.json();
            const routeData = {
                gpsList: data.routeData,
                maxSpeed: data.maxSpeed,
                distance: data.distance,
                avgSpeed: data.avgSpeed,
                duration: data.duration,
            };

            await RouteService.saveRoute(routeData);
            return routeData;
        } catch (err) {
            console.error("Fehler beim Stoppen der Route: " + err);
            alert("Fehler beim Stoppen der Route. " + err);
            return false;
        }
    }
}
