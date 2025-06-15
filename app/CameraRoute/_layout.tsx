import { Stack } from "expo-router";

/**
 * Stack-Navigationslayout für die Kamera-Route mit ausgeblendeter Kopfzeile.
 */
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
