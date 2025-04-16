import { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Keyboard,
    Image,
} from "react-native";
import Swiper from "react-native-swiper";
import constants from "@/app/consts";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import * as ImagePicker from "expo-image-picker";

export default function SignUpSlider() {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        repeatedPassword: "",
    });
    const [dogData, setDogData] = useState({
        birthdate: "",
        breed: "",
        gender: "",
        weight: "",
        height: "",
        funfact: "",
        name: "",
        image: null as string | null,
    });

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            setDogData({ ...dogData, image: result.assets[0].uri });
        }
    };

    const styles = StyleSheet.create({
        wrapper: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: constants.BACKGROUND_COLOR,
            height: "100%",
            width: "100%",
        },
        slide: {
            width: "85%",
            margin: "auto",
            borderRadius: 15,
            padding: 20,
            backgroundColor: "#facfe5",
            top: "60%",
        },
        header: {
            fontSize: 30,
            fontWeight: "600",
            color: constants.TEXT_COLOR,
            marginBottom: 25,
        },
        input: {
            borderRadius: 10,
            padding: 10,
            marginBottom: 12,
            backgroundColor: constants.BACKGROUND_COLOR,
            height: 45,
            borderBottomStartRadius: 0,
            borderTopStartRadius: 0,
            width: 248,
            paddingLeft: 0,
        },
        inputContainer: {
            width: "80%",
            display: "flex",
            flexDirection: "row",
        },
        inputIconContainer: {
            backgroundColor: constants.BACKGROUND_COLOR,
            borderRadius: 10,
            borderBottomEndRadius: 0,
            borderTopEndRadius: 0,
            padding: 10,
            marginBottom: 12,
            height: 45,
        },
        image: {
            width: 290,
            height: 200,
            borderRadius: 10,
            marginBottom: 20,
        },
        imagePlaceholder: {
            width: 290,
            height: 200,
            borderRadius: 10,
            backgroundColor: constants.BACKGROUND_COLOR,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
        },
    });

    const userDataSlide = (
        <View>
            <Text style={styles.header}>Wer bist du?</Text>
            <View style={styles.inputContainer}>
                <View style={styles.inputIconContainer}>
                    <MaterialCommunityIcons
                        name="account-outline"
                        size={24}
                        color={constants.TEXT_COLOR}
                    />
                </View>
                <TextInput
                    placeholder="Name"
                    placeholderTextColor={constants.SECCONDARY_COLOR}
                    value={userData.name}
                    onChangeText={(text) =>
                        setUserData({ ...userData, name: text })
                    }
                    returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss}
                    style={styles.input}
                />
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputIconContainer}>
                    <Feather
                        name="mail"
                        size={24}
                        color={constants.TEXT_COLOR}
                    />
                </View>
                <TextInput
                    placeholder="Email"
                    placeholderTextColor={constants.SECCONDARY_COLOR}
                    value={userData.email}
                    onChangeText={(text) =>
                        setUserData({ ...userData, email: text })
                    }
                    returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss}
                    style={styles.input}
                />
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputIconContainer}>
                    <Feather
                        name="unlock"
                        size={24}
                        color={constants.TEXT_COLOR}
                    />
                </View>
                <TextInput
                    placeholder="Passwort"
                    placeholderTextColor={constants.SECCONDARY_COLOR}
                    value={userData.password}
                    onChangeText={(text) =>
                        setUserData({ ...userData, password: text })
                    }
                    returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss}
                    style={styles.input}
                />
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputIconContainer}>
                    <Feather
                        name="lock"
                        size={24}
                        color={constants.TEXT_COLOR}
                    />
                </View>
                <TextInput
                    placeholder="Passwort wiederholen"
                    placeholderTextColor={constants.SECCONDARY_COLOR}
                    value={userData.repeatedPassword}
                    onChangeText={(text) =>
                        setUserData({ ...userData, repeatedPassword: text })
                    }
                    returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss}
                    style={styles.input}
                />
            </View>
        </View>
    );

    const dogDataSlide = (
        <View>
            <Text style={styles.header}>Dein Hund</Text>
            <View style={styles.inputContainer}>
                <View style={styles.inputIconContainer}>
                    <MaterialCommunityIcons
                        name="dog"
                        size={24}
                        color={constants.TEXT_COLOR}
                    />
                </View>
                <TextInput
                    placeholder="Name"
                    placeholderTextColor={constants.SECCONDARY_COLOR}
                    value={dogData.name}
                    onChangeText={(text) =>
                        setDogData({ ...dogData, name: text })
                    }
                    returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss}
                    style={styles.input}
                />
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputIconContainer}>
                    <FontAwesome
                        name="birthday-cake"
                        size={22}
                        color={constants.TEXT_COLOR}
                    />
                </View>
                <TextInput
                    placeholder="Geburtsdatum"
                    placeholderTextColor={constants.SECCONDARY_COLOR}
                    value={dogData.birthdate}
                    onChangeText={(text) =>
                        setDogData({ ...dogData, birthdate: text })
                    }
                    returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss}
                    style={styles.input}
                />
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputIconContainer}>
                    <FontAwesome
                        name="transgender"
                        size={24}
                        color={constants.TEXT_COLOR}
                    />
                </View>
                <TextInput
                    placeholder="Geschlecht (männlich/weiblich)"
                    placeholderTextColor={constants.SECCONDARY_COLOR}
                    value={dogData.gender}
                    onChangeText={(text) =>
                        setDogData({ ...dogData, gender: text })
                    }
                    returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss}
                    style={styles.input}
                />
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputIconContainer}>
                    <MaterialCommunityIcons
                        name="weight-lifter"
                        size={24}
                        color={constants.TEXT_COLOR}
                    />
                </View>
                <TextInput
                    placeholder="Gewicht (in kg)"
                    placeholderTextColor={constants.SECCONDARY_COLOR}
                    value={dogData.weight}
                    onChangeText={(text) =>
                        setDogData({ ...dogData, weight: text })
                    }
                    returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss}
                    style={styles.input}
                />
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputIconContainer}>
                    <MaterialIcons
                        name="height"
                        size={24}
                        color={constants.TEXT_COLOR}
                    />
                </View>
                <TextInput
                    placeholder="Größe (in cm)"
                    placeholderTextColor={constants.SECCONDARY_COLOR}
                    value={dogData.height}
                    onChangeText={(text) =>
                        setDogData({ ...dogData, height: text })
                    }
                    returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss}
                    style={styles.input}
                />
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputIconContainer}>
                    <FontAwesome6
                        name="hotdog"
                        size={24}
                        color={constants.TEXT_COLOR}
                    />
                </View>
                <TextInput
                    placeholder="Rasse"
                    placeholderTextColor={constants.SECCONDARY_COLOR}
                    value={dogData.breed}
                    onChangeText={(text) =>
                        setDogData({ ...dogData, breed: text })
                    }
                    returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss}
                    style={styles.input}
                />
            </View>
        </View>
    );

    const finalSlide = (
        <View>
            <Text style={styles.header}>Fast fertig!</Text>
            <View
                style={[
                    styles.inputContainer,
                    { display: "flex", flexDirection: "column" },
                ]}
            >
                <TouchableOpacity onPress={pickImage} activeOpacity={0.9}>
                    {dogData.image ? (
                        <Image
                            source={{ uri: dogData.image }}
                            style={styles.image}
                        />
                    ) : (
                        <View style={styles.imagePlaceholder}>
                            <Text style={{ color: constants.SECCONDARY_COLOR }}>
                                Bild auswählen
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>
                <View style={{ display: "flex", flexDirection: "row" }}>
                    <View style={styles.inputIconContainer}>
                        <MaterialIcons
                            name="history-edu"
                            size={24}
                            color={constants.TEXT_COLOR}
                        />
                    </View>
                    <TextInput
                        placeholder="Fun-Fact"
                        placeholderTextColor={constants.SECCONDARY_COLOR}
                        value={dogData.funfact}
                        onChangeText={(text) =>
                            setDogData({ ...dogData, funfact: text })
                        }
                        returnKeyType="done"
                        onSubmitEditing={Keyboard.dismiss}
                        style={styles.input}
                    />
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.wrapper}>
            <Swiper
                loop={false}
                activeDot={
                    <View
                        style={{
                            backgroundColor: constants.TEXT_COLOR,
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            marginLeft: 3,
                            marginRight: 3,
                            marginTop: 3,
                            marginBottom: 3,
                        }}
                    />
                }
            >
                <View style={constants.SHADOW_STYLE}>
                    <View style={styles.slide}>{userDataSlide}</View>
                </View>
                <View style={constants.SHADOW_STYLE}>
                    <View style={styles.slide}>{dogDataSlide}</View>
                </View>
                <View style={constants.SHADOW_STYLE}>
                    <View style={styles.slide}>{finalSlide}</View>
                </View>
            </Swiper>
        </View>
    );
}
