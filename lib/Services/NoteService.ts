import { doc, setDoc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Service-Klasse zum Speichern und Laden von Notizen für den aktuellen Nutzer.
 */
export default class NoteService {
    static async saveNotes(Firebase: any, notes: any) {
        try {
            const user = Firebase.auth?.currentUser;
            if (!user) throw new Error("no user logged in");

            const userDocRef = doc(Firebase.db, "notes", user.uid);
            await setDoc(userDocRef, { note: notes });
            await AsyncStorage.setItem("@dogNotes", notes);
        } catch (error) {
            console.error("Error saving dog data: ", error);
            throw error;
        }
    }

    static async getNotes(Firebase: any) {
        try {
            const notes = await AsyncStorage.getItem("@dogNotes");

            // get from db if not in async storage
            if (!notes || notes === "") {
                const user = Firebase.auth?.currentUser;
                if (!user) throw new Error("no user logged in");

                const userDocRef = doc(Firebase.db, "notes", user.uid);
                const docSnap = await getDoc(userDocRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    const note = data.note || "";
                    await AsyncStorage.setItem("@dogNotes", note);
                    return note;
                } else {
                    console.warn("No notes found for this user.");
                    return "";
                }
            }
            return notes;
        } catch (error) {
            console.error("Error retrieving dog name: ", error);
            return "";
        }
    }
}
