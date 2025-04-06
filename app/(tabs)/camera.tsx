import { View, StyleSheet } from "react-native";
import Header from "@/components/Header";
import constants from "../consts";
import CameraBottomSheet from "@/components/Tabs/camera/CameraBottomSheet";
import React from "react";
import CameraButton from "@/components/Tabs/camera/CameraButton";

export default function Camera() {
    const styles = StyleSheet.create({});

    return (
        <View style={{ backgroundColor: constants.FONT_COLOR }}>
            <Header />
            <View>
                <CameraButton />
            </View>
            <CameraBottomSheet />
        </View>
    );
}
