import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

export default class Firebase {
    static db;

    static init() {
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        Firebase.db = getFirestore(app);
    }
}
