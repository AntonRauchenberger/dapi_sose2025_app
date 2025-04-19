import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebaseConfig from "./firebaseConfig";

export default class Firebase {
    static db: any;
    static auth: any;

    static init() {
        const app = initializeApp(firebaseConfig);
        Firebase.db = getFirestore(app);
        Firebase.auth = getAuth(app);
    }
}
