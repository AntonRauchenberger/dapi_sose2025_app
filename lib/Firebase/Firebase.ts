import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebaseConfig from "./firebaseConfig";

export default class Firebase {
    static db: any;
    static auth: any;
    static app: any;

    static init() {
        try {
            if (!Firebase.app) {
                Firebase.app = initializeApp(firebaseConfig);
                console.log("Firebase app initialized.");
            }

            if (!Firebase.db) {
                Firebase.db = getFirestore(Firebase.app);
                console.log("Firestore initialized.");
            }

            if (!Firebase.auth) {
                Firebase.auth = getAuth(Firebase.app);
                console.log("Firebase Auth initialized.");
            }
        } catch (error) {
            console.error("Error initializing Firebase:", error);
        }
    }
}
