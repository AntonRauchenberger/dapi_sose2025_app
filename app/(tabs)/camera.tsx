import { View, StyleSheet, Image, Pressable } from "react-native";
import Header from "@/components/Header";
import constants from "../consts";
import React, { useState } from "react";
import CameraButton from "@/components/Tabs/camera/CameraButton";
import { CameraBottomSheet } from "@/components/Tabs/camera/CameraBottomSheet";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import * as Haptics from "expo-haptics";
import Dialog from "react-native-dialog";

export default function Camera() {
    const [isGaleryMode, setIsGaleryMode] = useState(true);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [signature, setSignature] = useState("");

    const downloadImage = () => {
        // TODO
        setIsGaleryMode(true);
    };

    const saveImage = (signature: string) => {
        // TODO
        console.log("Signatur:", signature);
        setIsGaleryMode(true);
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
            <Header />
            <View style={{ marginTop: isGaleryMode ? 180 : 75 }}>
                {isGaleryMode ? (
                    <CameraButton setIsGaleryMode={setIsGaleryMode} />
                ) : (
                    <View>
                        <Image
                            source={require("../../assets/images/dog_example.jpg")}
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
            <CameraBottomSheet isGaleryMode={isGaleryMode} />
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
