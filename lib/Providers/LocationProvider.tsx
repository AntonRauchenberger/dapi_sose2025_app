import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    PropsWithChildren,
} from "react";
import LocationService from "../Services/LocationService";

type DogLocation = {
    latitude: number;
    longitude: number;
} | null;

type DogLocationContextType = {
    dogLocation: DogLocation;
    isLoading: boolean;
    refreshDogLocation: () => Promise<void>;
};

const DogLocationContext = createContext<DogLocationContextType | undefined>(
    undefined
);

export function useDogLocation() {
    const context = useContext(DogLocationContext);
    if (!context) {
        throw new Error(
            "useDogLocation must be used within a DogLocationProvider"
        );
    }
    return context;
}

export function DogLocationProvider({ children }: PropsWithChildren) {
    const [dogLocation, setDogLocation] = useState<DogLocation>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const refreshDogLocation = async () => {
        setIsLoading(true);
        try {
            const location = await LocationService.getCurrentDogLocation();
            if (location) {
                setDogLocation(location);
            }
        } catch (error) {
            console.error(
                "Fehler beim Aktualisieren des Hundestandorts:",
                error
            );
        } finally {
            setIsLoading(false);
        }
    };

    // Refreshes the dog location every 10 seconds
    useEffect(() => {
        refreshDogLocation();
        const interval = setInterval(() => {
            refreshDogLocation();
        }, 10000);

        return () => clearInterval(interval); // Cleanup
    }, []);

    return (
        <DogLocationContext.Provider
            value={{ dogLocation, isLoading, refreshDogLocation }}
        >
            {children}
        </DogLocationContext.Provider>
    );
}
