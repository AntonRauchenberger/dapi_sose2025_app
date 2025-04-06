import constants from "@/app/consts";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Animated,
    Easing,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import * as Haptics from "expo-haptics";
import { useState, useRef, useEffect } from "react";
import LottieView from "lottie-react-native";
import particles from "@/assets/animations/particles.json";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function CameraButton() {
    const [isLoading, setIsLoading] = useState(false);
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const particleRef = useRef(null);

    const getImage = () => {
        // TODO
        setTimeout(() => {
            setIsLoading(false);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }, 2000);
    };

    const handleClick = () => {
        if (!isLoading) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            setIsLoading(!isLoading);
            getImage();
        }
    };

    useEffect(() => {
        if (isLoading) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(scaleAnim, {
                        toValue: 1.3,
                        duration: 700,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(scaleAnim, {
                        toValue: 1,
                        duration: 700,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                ])
            ).start();

            Animated.loop(
                Animated.timing(rotateAnim, {
                    toValue: 1,
                    duration: 1200,
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            ).start();
        } else {
            scaleAnim.stopAnimation();
            rotateAnim.stopAnimation();
            scaleAnim.setValue(1);
            rotateAnim.setValue(0);
            particleRef.current?.play();
        }
    }, [isLoading]);

    const rotation = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    const styles = StyleSheet.create({
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        button: {
            width: 100,
            height: 100,
            borderRadius: 999,
            backgroundColor: constants.BACKGROUND_COLOR,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 4,
            borderColor: constants.PRIMARY_COLOR,
            position: "relative",
            overflow: "hidden",
        },
        lottie: {
            position: "absolute",
            width: 100,
            height: 100,
            top: -10,
            left: -10,
            zIndex: 1,
        },
        buttonText: {
            marginTop: 2,
            color: constants.PRIMARY_COLOR,
            fontWeight: "500",
        },
    });

    return (
        <View style={styles.container}>
            <View style={constants.SHADOW_STYLE}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleClick}
                    activeOpacity={0.9}
                >
                    <LottieView
                        ref={particleRef}
                        source={particles}
                        autoPlay={false}
                        loop={false}
                        style={styles.lottie}
                    />

                    {isLoading ? (
                        <Animated.View
                            style={{
                                transform: [
                                    { scale: scaleAnim },
                                    { rotate: rotation },
                                ],
                            }}
                        >
                            <FontAwesome6
                                name="dog"
                                size={30}
                                color={constants.PRIMARY_COLOR}
                            />
                        </Animated.View>
                    ) : (
                        <FontAwesome
                            name="camera-retro"
                            size={45}
                            color={constants.PRIMARY_COLOR}
                        />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}
