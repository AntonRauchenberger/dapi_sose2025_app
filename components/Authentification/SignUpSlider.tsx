import { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Touchable,
} from "react-native";
import Swiper from "react-native-swiper";
import constants from "@/app/consts";
import MapView from "react-native-maps";

export default function SignUpSlider() {
    const [isMapFullScreen, setIsMapFullScreen] = useState(false);

    const styles = StyleSheet.create({
        slide: {
            width: "80%",
            margin: "auto",
            borderRadius: 15,
            padding: 10,
            marginTop: 100,
            backgroundColor: "#facfe5",
        },
        headerContainer: {
            borderBottomColor: constants.BACKGROUND_COLOR,
            borderBottomWidth: 2,
        },
        header: {
            color: constants.TEXT_COLOR,
            fontSize: 20,
            fontWeight: "600",
            marginBottom: 5,
        },
        content: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5,
        },
        map: {
            width: 120,
            height: 117,
            overflow: "hidden",
            borderRadius: 10,
        },
    });

    const userDataSlide = (
        <View>
            <Text>userDataSlide</Text>
        </View>
    );

    const dogDataSlide = (
        <View>
            <Text>dogDataSlide</Text>
        </View>
    );

    const finalSlide = (
        <View>
            <View>
                <Text>finalSlide</Text>
            </View>
        </View>
    );

    return (
        <View style={{ flex: 1, height: 300 }}>
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
