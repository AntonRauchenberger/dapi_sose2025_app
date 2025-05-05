import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, initializeAuth } from "firebase/auth";
import firebaseConfig from "./firebaseConfig";
export default class Firebase {
    static db: any;
    static auth: any;
    static app: any;

    static init() {
        if (!Firebase.app) {
            Firebase.app = initializeApp(firebaseConfig);
            console.log("Firebase app initialized.");
        }

        if (!Firebase.db) {
            Firebase.db = getFirestore(Firebase.app);
            console.log("Firestore initialized.");
        }

        if (!Firebase.auth) {
            Firebase.auth = initializeAuth(Firebase.app);
            Firebase.auth = getAuth(Firebase.app);
            console.log("Firebase Auth initialized.");
        }
    }
}
