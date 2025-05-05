import { doc, setDoc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Firebase from "../Firebase/Firebase";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";

export default class ImageService {
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

            const downloadResult = await FileSystem.downloadAsync(
                imageUri,
                localUri
            );

            const asset = await MediaLibrary.createAssetAsync(
                downloadResult.uri
            );
            await MediaLibrary.createAlbumAsync("Download", asset, false);

            alert("Bild wurde erfolgreich gespeichert!");
        } catch (error) {
            console.error("Fehler beim Speichern:", error);
            alert("Download fehlgeschlagen.");
        }
    }

    static async saveImage(imageUri: string, signature: string) {
        // TODO
    }

    static async getImageFromServer() {
        // TODO
    }
}
