import React from "react";
import { LineChart } from "react-native-chart-kit";
import { StyleSheet, Dimensions, View, ActivityIndicator } from "react-native";
import constants from "@/app/consts";

type DiagramProps = {
    diagramData: number[];
    isLoading: boolean;
};

/**
 * Diagramm-Komponente mit Liniendiagramm zur Anzeige von Streckendaten.
 */
export default function Diagram({ diagramData, isLoading }: DiagramProps) {
    const screenWidth = Dimensions.get("window").width;

    const getLast14Weekdays = () => {
        const today = new Date();
        const result = [];

        for (let i = 13; i >= 0; i--) {
            const d = new Date();
            d.setDate(today.getDate() - i);

            if (i % 2 === 0) {
                const day = d.getDate().toString().padStart(2, "0");
                const month = (d.getMonth() + 1).toString().padStart(2, "0");
                result.push(`${day}.${month}`);
            } else {
                result.push("");
            }
        }

        return result;
    };

    const data = {
        labels: getLast14Weekdays(),
        datasets: [
            {
                data: diagramData,
                strokeWidth: 2,
                color: (opacity = 1) =>
                    `${
                        constants.TEXT_COLOR +
                        Math.floor(opacity * 255).toString(16)
                    }`,
            },
        ],
        legend: ["Strecke in m"],
    };

    const chartConfig = {
        backgroundGradientFrom: constants.FONT_COLOR,
        backgroundGradientTo: constants.FONT_COLOR,
        decimalPlaces: 0,
        color: (opacity = 1) => constants.PRIMARY_COLOR,
        labelColor: (opacity = 1) => constants.TEXT_COLOR,
        style: {
            borderRadius: 16,
        },
        propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: constants.SECCONDARY_COLOR,
            fill: constants.TEXT_COLOR,
        },
    };

    const styles = StyleSheet.create({
        container: {
            borderRadius: 12,
        },
        refreshButton: {
            position: "absolute",
            right: 15,
            top: -40,
            backgroundColor: constants.BACKGROUND_COLOR,
            borderRadius: 50,
            padding: 2,
        },
        loadingContainer: {
            backgroundColor: constants.BACKGROUND_COLOR,
            height: 260,
            width: "97%",
            margin: "auto",
            borderRadius: 16,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 8,
        },
    });

    return (
        <View style={[styles.container, constants.SHADOW_STYLE]}>
            {diagramData && !isLoading ? (
                <LineChart
                    data={data}
                    width={screenWidth - 32}
                    height={220}
                    chartConfig={chartConfig}
                    bezier
                    style={{
                        borderRadius: 12,
                        width: "97%",
                        margin: "auto",
                        marginBottom: 8,
                        borderColor: constants.BACKGROUND_COLOR,
                        borderWidth: 3,
                    }}
                />
            ) : (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator />
                </View>
            )}
        </View>
    );
}
