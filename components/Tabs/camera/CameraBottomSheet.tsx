import constants from "@/app/consts";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Modalize } from "react-native-modalize";
import * as Haptics from "expo-haptics";

export const CameraBottomSheet = ({ isGaleryMode = true }) => {
    const [dogName, setDogName] = useState("Findus");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const modalizeRef = useRef<Modalize>(null);

    useEffect(() => {
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
            <View style={styles.content}>
                <Text style={styles.headline}>Bilder</Text>
                <Text style={[styles.descText, { marginBottom: 10 }]}>
                    Deine gespeicherte Bilder von {dogName}.
                </Text>
                <Image
                    source={require("../../../assets/images/dog_example.jpg")}
                    style={styles.image}
                />
                <Text style={styles.imageDesc}>Happy Fin, 6. April 2025</Text>
            </View>
        </Modalize>
    );
};
