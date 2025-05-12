import { useState, useEffect, useRef } from "react";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { useDogLocation } from "@/lib/Providers/LocationProvider";
import LocationService from "@/lib/Services/LocationService";
import StatisticsService from "@/lib/Services/StatisticsService";
import { useStatistics } from "@/lib/Providers/StatisticsProvider";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: false,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

// handles push notifications (https://docs.expo.dev/versions/latest/sdk/notifications/)
export default function AlarmNotification() {
    const notificationListener = useRef<Notifications.EventSubscription>();
    const responseListener = useRef<Notifications.EventSubscription>();
    const [lastSendTime, setLastSendTime] = useState<number>(0);
    const { dogLocation } = useDogLocation();
    const { refreshStatistics } = useStatistics();

    useEffect(() => {
        async function handle() {
            if (dogLocation) {
                const userLocation =
                    await LocationService.getCurrentUserLocation();
                if (!userLocation) {
                    return;
                }
                const dDistance = LocationService.getDistanceBetweenLocations(
                    userLocation,
                    dogLocation
                );

                if (
                    dDistance > 10 &&
                    lastSendTime < Date.now() - 1000 * 60 * 60
                ) {
                    await schedulePushNotification(dDistance);
                    setLastSendTime(Date.now());
                    await StatisticsService.addAlert();
                    await refreshStatistics();
                }
            }
        }

        handle();
    }, [dogLocation]);

    useEffect(() => {
        registerForPushNotificationsAsync().then();

        if (Platform.OS === "android") {
            Notifications.getNotificationChannelsAsync().then((value) => {});
        }
        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {});

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener(
                (response) => {
                    console.log(response);
                }
            );

        return () => {
            notificationListener.current &&
                Notifications.removeNotificationSubscription(
                    notificationListener.current
                );
            responseListener.current &&
                Notifications.removeNotificationSubscription(
                    responseListener.current
                );
        };
    }, []);

    return <></>;
}

async function schedulePushNotification(distance: number) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Hund entfernt sich!",
            body: `Dein Hund ist jetzt ${distance} km von dir entfernt.`,
            sound: true,
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds: 2,
        },
    });
}

async function registerForPushNotificationsAsync() {
    let token;

    const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
    }

    try {
        const projectId =
            Constants?.expoConfig?.extra?.eas?.projectId ??
            Constants?.easConfig?.projectId;
        if (!projectId) {
            throw new Error("Project ID not found");
        }
        token = (
            await Notifications.getExpoPushTokenAsync({
                projectId,
            })
        ).data;
        console.log(token);
    } catch (e) {
        token = `${e}`;
    }

    return token;
}
