import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Firebase from "../Firebase/Firebase";
import secureConstants from "@/app/secureConsts";
import { fetch } from "expo/fetch";
import StatisticsService from "./StatisticsService";

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
            const userId = Firebase.auth?.currentUser?.uid;
            if (!userId) {
                throw new Error("Benutzer nicht authentifiziert.");
            }

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
            return routeId;
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
            const userId = Firebase.auth?.currentUser?.uid;
            if (!userId) {
                throw new Error("Benutzer nicht authentifiziert.");
            }

            const userRoutesRef = doc(db, "routes", userId);
            const userRoutesDoc = await getDoc(userRoutesRef);

            if (userRoutesDoc.exists()) {
                await updateDoc(userRoutesRef, {
                    routes: arrayUnion(routeData),
                });
            } else {
                await setDoc(userRoutesRef, {
                    routes: [routeData],
                });
            }

            // AsyncStorage
            const storedRoutes = await AsyncStorage.getItem("savedRoutes");

            let routes: any[] = [];

            if (storedRoutes) {
                try {
                    const parsed = JSON.parse(storedRoutes);
                    if (Array.isArray(parsed)) {
                        routes = parsed;
                    }
                } catch (e) {
                    console.warn(
                        "Konnte gespeicherte Routen nicht parsen. Überschreibe."
                    );
                }
            }

            routes.push(routeData);

            await AsyncStorage.setItem("savedRoutes", JSON.stringify(routes));
        } catch (error) {
            console.error("Error saving route data: ", error);
            throw error;
        }
    }

    static async deleteRoute(routeId: any, distance: any) {
        try {
            // Firebase
            const db = Firebase.db;
            const userId = Firebase.auth?.currentUser?.uid;
            if (!userId) {
                throw new Error("Benutzer nicht authentifiziert.");
            }

            const userRoutesRef = doc(db, "routes", userId);
            const userRoutesDoc = await getDoc(userRoutesRef);

            userRoutesDoc.data()?.routes?.forEach((route: any) => {
                if (route.routeId === routeId) {
                    const updatedRoutes = userRoutesDoc
                        .data()
                        ?.routes.filter((r: any) => r.routeId !== routeId);
                    updateDoc(userRoutesRef, {
                        routes: updatedRoutes,
                    });
                }
            });

            // AsyncStorage
            const storedRoutes = await AsyncStorage.getItem("savedRoutes");

            let routes: any[] = [];

            if (storedRoutes) {
                try {
                    const parsed = JSON.parse(storedRoutes);
                    if (Array.isArray(parsed)) {
                        routes = parsed;
                    }
                } catch (e) {
                    console.warn(
                        "Konnte gespeicherte Routen nicht parsen. Überschreibe."
                    );
                }
            }

            let updatedRoutes = routes.filter(
                (route) => route.routeId !== routeId
            );

            await AsyncStorage.setItem(
                "savedRoutes",
                JSON.stringify(updatedRoutes)
            );

            // remove from statistics
            await StatisticsService.subDistance(parseFloat(distance));

            return true;
        } catch (error) {
            console.error("Error deleting route: ", error);
            return false;
        }
    }

    static async stopRoute(routeId: string) {
        try {
            const userId = Firebase.auth?.currentUser?.uid;
            if (!userId) {
                throw new Error("Benutzer nicht authentifiziert.");
            }

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
                startDate: data.startDate,
                routeId: routeId,
            };

            await RouteService.saveRoute(routeData);
            if (routeData?.distance && routeData.distance !== "") {
                await StatisticsService.addDistance(
                    parseFloat(routeData.distance)
                );
            }

            return routeData;
        } catch (err) {
            console.error("Fehler beim Stoppen der Route: " + err);
            alert("Fehler beim Stoppen der Route. " + err);
            return false;
        }
    }

    static async getRoutes() {
        try {
            let storedRoutes = await AsyncStorage.getItem("savedRoutes");
            let routes: any[] = [];

            if (storedRoutes && storedRoutes !== "") {
                try {
                    const parsed = JSON.parse(storedRoutes);
                    if (Array.isArray(parsed)) {
                        routes = parsed;
                    }
                } catch (e) {
                    console.warn(
                        "Konnte gespeicherte Routen nicht parsen. Überschreibe."
                    );
                }
            }

            // fallback to firestore
            if (routes.length === 0) {
                const user = Firebase.auth?.currentUser;
                if (!user) throw new Error("no user logged in");

                const userDocRef = doc(Firebase.db, "routes", user.uid);
                const docSnap = await getDoc(userDocRef);

                const firestoreRoutes = docSnap.data()?.routes;
                if (Array.isArray(firestoreRoutes)) {
                    routes = firestoreRoutes;
                    await AsyncStorage.setItem(
                        "savedRoutes",
                        JSON.stringify(routes)
                    );
                }
            }

            return routes;
        } catch (error) {
            console.error("Fehler beim Holen der Routen: " + error);
            return [];
        }
    }
}
