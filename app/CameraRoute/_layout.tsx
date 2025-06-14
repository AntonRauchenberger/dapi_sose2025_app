import { Stack } from "expo-router";

export default function RoutesLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="CustomCamera"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
}
