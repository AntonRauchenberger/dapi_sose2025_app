import { Stack } from "expo-router";

/**
 * Stack-Navigationslayout für die Profil-Bearbeitungsseiten ohne Kopfzeile.
 */
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
