import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DogService from "../Services/DogService";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default class AuthentificationService {
    static async saveName(Firebase: any, name: string) {
        try {
            const user = Firebase.auth?.currentUser;
            if (!user) throw new Error("no user logged in");

            const userDocRef = doc(Firebase.db, "names", user.uid);
            await setDoc(userDocRef, { name: name });
        } catch (error) {
            console.error("Error saving user name data: ", error);
            throw error;
        }
    }

    static async getName(Firebase: any) {
        try {
            const user = Firebase.auth?.currentUser;
            if (!user) throw new Error("no user logged in");

            const userDocRef = doc(Firebase.db, "names", user.uid);
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                return data.name || null;
            } else {
                console.warn("No name data found for user");
                return null;
            }
        } catch (error) {
            console.error("Error getting user name data: ", error);
            throw error;
        }
    }

    static async register(Firebase: any, userData: any, dogData: any) {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                Firebase.auth,
                userData.email,
                userData.password
            );
            const user = userCredential.user;

            if (user?.email) {
                await AsyncStorage.setItem(
                    "userProfile",
                    JSON.stringify(userData)
                );
                await AuthentificationService.saveName(Firebase, userData.name);
                await DogService.saveDogProfile(Firebase, dogData);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log("Error register: ", error);
            return false;
        }
    }

    static async login(Firebase: any, email: any, password: any) {
        try {
            const userCredential = await signInWithEmailAndPassword(
                Firebase.auth,
                email,
                password
            );
            const user = userCredential.user;

            if (user?.email) {
                const userName = await AuthentificationService.getName(
                    Firebase
                );
                await AsyncStorage.setItem(
                    "userProfile",
                    JSON.stringify({ email: user.email, name: userName })
                );
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log("Error logging in: ", error);
            return false;
        }
    }

    private static async dumpAsyncStorage() {
        await AsyncStorage.setItem("userProfile", "");
        await AsyncStorage.setItem("dogProfile", "");
        await AsyncStorage.setItem("savedImages", "");
        await AsyncStorage.setItem("poopMarkerList", "");
        await AsyncStorage.setItem("savedRoutes", "");
        await AsyncStorage.setItem("statistics", "");
        await AsyncStorage.setItem("@dogNotes", "");
    }

    static async signout(Firebase: any): Promise<boolean> {
        try {
            await signOut(Firebase.auth);
            await AuthentificationService.dumpAsyncStorage();
            return true;
        } catch (error) {
            console.log("Error logging out: ", error);
            return false;
        }
    }

    static getCurrentUser(Firebase: any) {
        return Firebase.auth?.currentUser || null;
    }
}
