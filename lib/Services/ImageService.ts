import { doc, setDoc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Firebase from "../Firebase/Firebase";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";

/**
 * Service-Klasse zum Speichern, Laden und Herunterladen von Bildern für den aktuellen Nutzer.
 */
export default class ImageService {
    // Lädt ein Bild herunter und speichert es in der Galerie des Geräts.
    static async downloadImage(imageUri: string) {
        try {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== "granted") {
                alert("Berechtigung zur Speicherung wurde nicht erteilt.");
                return;
            }

            const fileName =
                imageUri.split("/").pop()?.split("?")[0] || "bild.jpg";
            const localUri = FileSystem.documentDirectory + fileName;

            let asset;
            if (imageUri.startsWith("http")) {
                const downloadResult = await FileSystem.downloadAsync(
                    imageUri,
                    localUri
                );

                if (!downloadResult || !downloadResult.uri) {
                    console.error("Download fehlgeschlagen:", downloadResult);
                    alert("Bild konnte nicht heruntergeladen werden.");
                    return;
                }

                asset = await MediaLibrary.createAssetAsync(downloadResult.uri);
            } else {
                await FileSystem.copyAsync({
                    from: imageUri,
                    to: localUri,
                });

                asset = await MediaLibrary.createAssetAsync(localUri);
            }

            await MediaLibrary.createAlbumAsync("Download", asset, false);
        } catch (error) {
            console.error("Fehler beim Speichern:", error);
            alert("Download fehlgeschlagen.");
        }
    }

    // Speichert ein Bild mit Signatur lokal und in Firestore.
    static async saveImage(imageUri: string, signature: string) {
        try {
            // AsyncStorage
            const storedImages = await AsyncStorage.getItem("savedImages");
            const images = Array.isArray(JSON.parse(storedImages))
                ? JSON.parse(storedImages)
                : [];

            const newImage = { uri: imageUri, signature };
            images.push(newImage);

            await AsyncStorage.setItem("savedImages", JSON.stringify(images));

            // Firebase
            const db = Firebase.db;
            const userId = Firebase.auth?.currentUser?.uid;
            if (!userId) {
                throw new Error("Benutzer nicht authentifiziert.");
            }

            const userImagesRef = doc(db, "images", userId);
            const userImagesDoc = await getDoc(userImagesRef);

            let firebaseImages = [];
            if (userImagesDoc.exists()) {
                const data = userImagesDoc.data();
                firebaseImages = Array.isArray(data.images) ? data.images : [];
            }

            firebaseImages.push(newImage);
            await setDoc(userImagesRef, { images: firebaseImages });
        } catch (error) {
            console.error("Fehler beim Speichern des Bildes:", error);
            alert("Fehler beim Speichern des Bildes.");
        }
    }

    static async getSavedImages() {
        try {
            // First tryo to load images from AsyncStorage
            const storedImages = await AsyncStorage.getItem("savedImages");
            if (storedImages && storedImages !== "") {
                return JSON.parse(storedImages);
            }

            // If no images in AsyncStorage, load from Firebase
            const db = Firebase.db;
            const userId = Firebase.auth?.currentUser?.uid;
            if (!userId) {
                throw new Error("Benutzer nicht authentifiziert.");
            }

            const userImagesRef = doc(db, "images", userId);
            const userImagesDoc = await getDoc(userImagesRef);

            if (userImagesDoc.exists()) {
                const firebaseImages = userImagesDoc.data().images || [];
                await AsyncStorage.setItem(
                    "savedImages",
                    JSON.stringify(firebaseImages)
                );
                return firebaseImages;
            }

            return [];
        } catch (error) {
            console.error("Fehler beim Laden der gespeicherten Bilder:", error);
            return [];
        }
    }
}
