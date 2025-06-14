import constants from "@/app/consts";
import React, { useRef, useEffect } from "react";
import { View, Text, Animated, PanResponder, StyleSheet } from "react-native";
import * as Haptics from "expo-haptics";

export default function SlideToUnlock({ onUnlock }) {
    const panX = useRef(new Animated.Value(0)).current;

    const SLIDER_WIDTH = 300;
    const THUMB_SIZE = 60;

    // Reset Slider on mount/unmount
    useEffect(() => {
        panX.setValue(0);
        return () => {
            panX.setValue(0);
        };
    }, [panX]);

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gesture) => gesture.dx > 10,
            onPanResponderMove: (_, gesture) => {
                if (
                    gesture.dx >= 0 &&
                    gesture.dx <= SLIDER_WIDTH - THUMB_SIZE
                ) {
                    panX.setValue(gesture.dx);
                }
            },
            onPanResponderRelease: (_, gesture) => {
                if (gesture.dx > SLIDER_WIDTH - THUMB_SIZE - 10) {
                    Animated.timing(panX, {
                        toValue: SLIDER_WIDTH - THUMB_SIZE,
                        duration: 150,
                        useNativeDriver: false,
                    }).start(() => {
                        Haptics.notificationAsync(
                            Haptics.NotificationFeedbackType.Success
                        );
                        onUnlock?.();
                        // Weiche Rück-Animation
                        Animated.spring(panX, {
                            toValue: 0,
                            useNativeDriver: false,
                            friction: 6,
                            tension: 80,
                        }).start();
                    });
                } else {
                    Animated.spring(panX, {
                        toValue: 0,
                        useNativeDriver: false,
                    }).start();
                }
            },
        })
    ).current;

    const styles = StyleSheet.create({
        sliderContainer: {
            alignItems: "center",
        },
        track: {
            width: SLIDER_WIDTH,
            height: THUMB_SIZE,
            borderRadius: THUMB_SIZE / 2,
            justifyContent: "center",
            backgroundColor: "#f5d7e4",
        },
        thumb: {
            width: THUMB_SIZE,
            height: THUMB_SIZE,
            borderRadius: THUMB_SIZE / 2,
            backgroundColor: constants.SECCONDARY_COLOR,
            position: "absolute",
            left: 0,
            zIndex: 10,
        },
        thumbText: {
            marginLeft: 15,
            color: constants.TEXT_COLOR,
            fontSize: 16,
            fontWeight: "500",
            zIndex: 11,
            pointerEvents: "none",
        },
    });

    return (
        <View style={styles.sliderContainer}>
            <View style={styles.track}>
                <Animated.View
                    {...panResponder.panHandlers}
                    style={[
                        styles.thumb,
                        {
                            transform: [{ translateX: panX }],
                        },
                        constants.SHADOW_STYLE,
                    ]}
                />
                <Text style={styles.thumbText}>Get Started</Text>
            </View>
        </View>
    );
}
