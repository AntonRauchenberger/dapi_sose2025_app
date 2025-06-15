import constants from "@/app/consts";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Modalize } from "react-native-modalize";
import * as Haptics from "expo-haptics";
import ImageService from "@/lib/Services/ImageService";
import DogService from "@/lib/Services/DogService";
import { useImageContext } from "@/lib/Providers/ImageProvider";

/**
 * BottomSheet-Komponente zur Anzeige und Verwaltung gespeicherter Bilder in der Kamera-Ansicht.
 */
export const CameraBottomSheet = ({ reload = false, setReload }) => {
    const [dogName, setDogName] = useState("Findus");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const modalizeRef = useRef<Modalize>(null);
    const [savedImages, setSavedImages] = useState([]);
    const { isGaleryMode, setIsGaleryMode } = useImageContext();

    useEffect(() => {
        ImageService.getSavedImages().then((images) => {
            setSavedImages(images);
        });

        DogService.getDogName().then((name) => {
            setDogName(name);
        });
    }, []);

    useEffect(() => {
        if (reload) {
            ImageService.getSavedImages().then((images) => {
                setSavedImages(images);
            });
            setReload(false);
        }
    }, [reload]);

    useEffect(() => {
        if (isGaleryMode === undefined || isGaleryMode === null) {
            modalizeRef.current?.open();
            return;
        }

        if (!isGaleryMode) {
            modalizeRef.current?.close();
        } else {
            modalizeRef.current?.open();
        }
    }, [isGaleryMode]);

    const styles = StyleSheet.create({
        content: {
            paddingTop: modalIsOpen ? 40 : 10,
        },
        headline: {
            fontSize: 19,
            fontWeight: "500",
            color: constants.TEXT_COLOR,
            width: "95%",
            margin: "auto",
        },
        descText: {
            fontSize: 12,
            opacity: 0.4,
            width: "95%",
            margin: "auto",
            marginBottom: 4,
        },
        image: {
            width: "95%",
            height: 400,
            margin: "auto",
            borderRadius: 15,
            marginBottom: 8,
        },
        imageDesc: {
            fontSize: 13,
            opacity: 0.7,
            width: "95%",
            margin: "auto",
            marginBottom: 4,
            textAlign: "right",
            fontStyle: "italic",
        },
    });

    return (
        <Modalize
            ref={modalizeRef}
            alwaysOpen={200}
            modalHeight={800}
            handleStyle={{
                backgroundColor: constants.TEXT_COLOR,
            }}
            onPositionChange={(position) => {
                Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Success
                );

                position === "top"
                    ? setModalIsOpen(true)
                    : setModalIsOpen(false);
            }}
            withOverlay={false}
            modalStyle={{ backgroundColor: "#f7f7f7" }}
        >
            <ScrollView style={styles.content}>
                <Text style={styles.headline}>Bilder</Text>
                <Text style={[styles.descText, { marginBottom: 10 }]}>
                    Deine gespeicherten Bilder von {dogName}.
                </Text>
                <View style={{ marginBottom: 50 }}>
                    {savedImages &&
                        savedImages.length > 0 &&
                        savedImages.map((image, index) => (
                            <React.Fragment key={index}>
                                <Image
                                    source={{ uri: image.uri }}
                                    style={styles.image}
                                />
                                <Text style={styles.imageDesc}>
                                    {image.signature
                                        ? image.signature
                                        : "Unbekannt"}
                                </Text>
                            </React.Fragment>
                        ))}
                </View>
            </ScrollView>
        </Modalize>
    );
};
