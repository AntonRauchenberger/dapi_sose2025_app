import { View, StyleSheet } from "react-native";
import Header from "@/components/Header";
import constants from "../consts";
import React from "react";
import CameraButton from "@/components/Tabs/camera/CameraButton";
import { CameraBottomSheet } from "@/components/Tabs/camera/CameraBottomSheet";

export default function Camera() {
    const styles = StyleSheet.create({});

    return (
        <View
            style={{
                backgroundColor: constants.FONT_COLOR,
            }}
        >
            <Header />
            <View style={{ marginTop: 180 }}>
                <CameraButton />
            </View>
            <CameraBottomSheet />
        </View>
    );
}
