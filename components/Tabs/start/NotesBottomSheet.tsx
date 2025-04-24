import constants from "@/app/consts";
import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";
import { Modalize } from "react-native-modalize";
import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const NotesBottomSheet = ({ isGaleryMode = true, dogName }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [notes, setNotes] = useState<string | null>();
    const modalizeRef = useRef<Modalize>(null);

    const handleNotesInput = async (input: string) => {
        setNotes(input);
        try {
            await AsyncStorage.setItem("@dogNotes", input);
        } catch (e) {
            console.error("Fehler beim Speichern der Notizen:", e);
        }
    };

    useEffect(() => {
        const loadNotes = async () => {
            try {
                const savedNotes = await AsyncStorage.getItem("@dogNotes");
                if (savedNotes !== null) {
                    setNotes(savedNotes);
                }
            } catch (e) {
                console.error("Fehler beim Laden der Notizen:", e);
            }
        };

        loadNotes();
    }, []);

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
        textInput: {
            width: "95%",
            margin: "auto",
            borderColor: constants.BACKGROUND_COLOR,
            borderWidth: 2,
            height: 658,
            padding: 10,
            borderRadius: 15,
            color: constants.TEXT_COLOR,
            overflow: "scroll",
        },
    });

    return (
        <Modalize
            ref={modalizeRef}
            alwaysOpen={190}
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
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.content}>
                    <Text style={styles.headline}>Notizen</Text>
                    <Text style={[styles.descText, { marginBottom: 10 }]}>
                        Deine gespeicherten Notizen zu {dogName} ...
                    </Text>
                    <TextInput
                        multiline
                        placeholder="Füge hier Notizen hinzu ..."
                        placeholderTextColor="#888"
                        onChangeText={handleNotesInput}
                        value={notes || ""}
                        style={styles.textInput}
                        returnKeyType="default"
                        blurOnSubmit={false}
                        editable={modalIsOpen}
                    />
                </View>
            </TouchableWithoutFeedback>
        </Modalize>
    );
};
