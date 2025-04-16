import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import firebaseConfig from "./firebaseConfig";

export default class Firebase {
    static db: any;
    static auth: any;

    static init() {
        const app = initializeApp(firebaseConfig);
        Firebase.db = getFirestore(app);
        Firebase.auth = getAuth(app);
    }

    static async register(email: any, password: any) {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                Firebase.auth,
                email,
                password
            );
            return userCredential.user;
        } catch (error) {
            throw error;
        }
    }

    static async login(email: any, password: any) {
        try {
            const userCredential = await signInWithEmailAndPassword(
                Firebase.auth,
                email,
                password
            );
            return userCredential.user;
        } catch (error) {
            throw error;
        }
    }

    static getCurrentUser() {
        return Firebase.auth?.currentUser || null;
    }
}
