import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    ActivityIndicator,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useImageContext } from "@/lib/Providers/ImageProvider";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import constants from "../consts";
import StatisticsService from "@/lib/Services/StatisticsService";
import { useStatistics } from "@/lib/Providers/StatisticsProvider";

/**
 * Individuelle Kamera-Komponente mit Bildaufnahme, Kamerawechsel und Statistik-Update.
 */
export default function CustomCamera() {
    const [facing, setFacing] = useState<CameraType>("back");
    const cameraRef = useRef(null);
    const [permission, requestPermission] = useCameraPermissions();
    const router = useRouter();
    const { setImageUri, setIsGaleryMode, setShowCamera } = useImageContext();
    const { refreshStatistics } = useStatistics();

    useEffect(() => {
        if (!permission) {
            requestPermission();
        }
    }, [permission]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: constants.BACKGROUND_COLOR,
            justifyContent: "center",
            alignItems: "center",
        },
        overlay: {
            ...StyleSheet.absoluteFillObject,
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 30,
        },
        text: {
            fontSize: 18,
            color: "white",
            padding: 10,
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: 10,
            margin: 5,
        },
        message: {
            textAlign: "center",
            marginTop: 20,
        },
        pictureButton: {
            backgroundColor: constants.BACKGROUND_COLOR,
            padding: 10,
            borderRadius: "50%",
        },
        flipButton: {
            backgroundColor: constants.BACKGROUND_COLOR,
            borderRadius: "50%",
            padding: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 60,
        },
    });

    if (!permission?.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Kamera-Zugriff benötigt</Text>
                <TouchableOpacity onPress={requestPermission}>
                    <Text style={styles.text}>Zugriff erlauben</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            setImageUri(photo.uri);
            setIsGaleryMode(false);
            setShowCamera(false);
            await StatisticsService.addImage();
            await refreshStatistics();
            router.back();
        }
    };

    const toggleCameraFacing = () => {
        setFacing((current) => (current === "back" ? "front" : "back"));
    };

    return (
        <View style={styles.container}>
            <CameraView
                ref={cameraRef}
                style={StyleSheet.absoluteFill}
                facing={facing}
            />
            <View style={styles.overlay}>
                <View
                    style={{
                        flexDirection: "row",
                        gap: 10,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <TouchableOpacity
                        onPress={takePicture}
                        style={styles.pictureButton}
                    >
                        <MaterialIcons
                            name="camera"
                            size={50}
                            color={constants.TEXT_COLOR}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={toggleCameraFacing}
                        style={styles.flipButton}
                    >
                        <MaterialIcons
                            name="flip-camera-ios"
                            size={30}
                            color={constants.TEXT_COLOR}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
