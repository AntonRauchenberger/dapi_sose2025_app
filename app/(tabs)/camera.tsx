import { View, StyleSheet, Image, Pressable, Animated } from "react-native";
import Header from "@/components/Header";
import constants from "../consts";
import React, { useEffect, useState, useRef } from "react";
import CameraButton from "@/components/Tabs/camera/CameraButton";
import { CameraBottomSheet } from "@/components/Tabs/camera/CameraBottomSheet";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import * as Haptics from "expo-haptics";
import Dialog from "react-native-dialog";
import ImageService from "@/lib/Services/ImageService";
import { useImageContext } from "@/lib/Providers/ImageProvider";
import { useRecord } from "@/lib/Providers/RecordProvider";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function Camera() {
    const [dialogVisible, setDialogVisible] = useState(false);
    const [signature, setSignature] = useState("");
    const [reload, setReload] = useState(false);
    const {
        isGaleryMode,
        setIsGaleryMode,
        imageUri,
        setImageUri,
        showCamera,
        setShowCamera,
    } = useImageContext();
    const { isRecording } = useRecord();
    const blinkAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(blinkAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(blinkAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const downloadImage = async () => {
        if (!imageUri) {
            alert("Kein Bild zum Herunterladen vorhanden.");
            return;
        }
        await ImageService.downloadImage(imageUri);
        setIsGaleryMode(true);
    };

    const saveImage = async (signature: string) => {
        if (!imageUri) {
            alert("Kein Bild zum Speichern vorhanden.");
            return;
        }
        await ImageService.saveImage(imageUri, signature);
        setIsGaleryMode(true);
        setSignature("");
        setReload(true);
    };

    const handleClicks = (type: string) => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        switch (type) {
            case "delete":
                setIsGaleryMode(true);
                break;
            case "download":
                downloadImage();
                break;
            case "save":
            default:
                setDialogVisible(true);
                break;
        }
    };

    const styles = StyleSheet.create({
        image: {
            width: "95%",
            height: 430,
            margin: "auto",
            borderRadius: 15,
            marginBottom: 8,
        },
        buttonsContainer: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 13,
        },
        button: {
            width: 50,
            height: 50,
            borderRadius: "50%",
            backgroundColor: constants.COMPLEMENTARY_COLOR,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
    });

    return (
        <View
            style={{
                backgroundColor: constants.FONT_COLOR,
            }}
        >
            {isRecording ? <Header animate={false} /> : <Header />}
            {isRecording && (
                <Animated.View
                    style={{
                        transform: [{ translateY: 66 }, { translateX: 332 }],
                        opacity: blinkAnim,
                        position: "absolute",
                    }}
                >
                    <MaterialCommunityIcons
                        name="record-rec"
                        size={26}
                        color={constants.COMPLEMENTARY_COLOR}
                    />
                </Animated.View>
            )}
            <View style={{ marginTop: isGaleryMode ? 180 : 75 }}>
                {isGaleryMode || !imageUri ? (
                    <CameraButton
                        setIsGaleryMode={setIsGaleryMode}
                        setImageUri={setImageUri}
                        setShowCamera={setShowCamera}
                    />
                ) : (
                    <View>
                        <Image
                            source={{ uri: imageUri }}
                            style={styles.image}
                        />
                        <View style={styles.buttonsContainer}>
                            <Pressable
                                style={styles.button}
                                onPress={() => handleClicks("delete")}
                            >
                                <MaterialIcons
                                    name="delete"
                                    size={30}
                                    color={constants.TEXT_COLOR}
                                />
                            </Pressable>
                            <Pressable
                                style={styles.button}
                                onPress={() => handleClicks("save")}
                            >
                                <AntDesign
                                    name="plus"
                                    size={35}
                                    color={constants.TEXT_COLOR}
                                />
                            </Pressable>
                            <Pressable
                                style={styles.button}
                                onPress={() => handleClicks("download")}
                            >
                                <Feather
                                    name="download"
                                    size={30}
                                    color={constants.TEXT_COLOR}
                                />
                            </Pressable>
                        </View>
                    </View>
                )}
            </View>
            <CameraBottomSheet
                isGaleryMode={isGaleryMode}
                reload={reload}
                setReload={setReload}
            />
            <Dialog.Container visible={dialogVisible}>
                <Dialog.Title>Bild-Unterschrift</Dialog.Title>
                <Dialog.Description>
                    Wie würdest du dieses Bild beschreiben?
                </Dialog.Description>
                <Dialog.Input
                    placeholder="Bild-Unterschrift"
                    value={signature}
                    onChangeText={setSignature}
                />
                <Dialog.Button
                    label="Abbrechen"
                    onPress={() => {
                        setDialogVisible(false);
                    }}
                />
                <Dialog.Button
                    label="Speichern"
                    onPress={() => {
                        Haptics.notificationAsync(
                            Haptics.NotificationFeedbackType.Success
                        );
                        setDialogVisible(false);
                        saveImage(signature);
                    }}
                />
            </Dialog.Container>
        </View>
    );
}
