import { Stack } from "expo-router";
import constants from "@/app/consts";

export default function RoutesLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="RouteDetails"
                options={{
                    headerBackTitle: "Zurück",
                    title: "Details",
                    headerStyle: {
                        backgroundColor: constants.BACKGROUND_COLOR,
                    },
                    headerTitleStyle: {
                        color: constants.TEXT_COLOR,
                        fontSize: 20,
                    },
                }}
            />
        </Stack>
    );
}
