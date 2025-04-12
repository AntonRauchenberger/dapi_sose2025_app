import { Stack } from "expo-router";

export default function RoutesLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="EditDogProfile"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="EditUserProfile"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
}
