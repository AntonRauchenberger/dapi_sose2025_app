import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    PropsWithChildren,
} from "react";
import CurrentDataService from "../Services/CurrentDataService";

type CurrentData = {
    latitude: number;
    longitude: number;
    battery: number;
    status: string;
} | null;

type DogLocation = {
    latitude: number;
    longitude: number;
} | null;

type CurrentDataContextType = {
    dogLocation: DogLocation;
    currentData: CurrentData;
    isLoading: boolean;
    refreshCurrentData: () => Promise<void>;
};

/**
 * Context-Provider für aktuelle Hundedaten (Position, Akku, Status) mit Auto-Refresh.
 */
const CurrentDataContext = createContext<CurrentDataContextType | undefined>(
    undefined
);

export function useCurrentData() {
    const context = useContext(CurrentDataContext);
    if (!context) {
        throw new Error(
            "useCurrentData must be used within a CurrentDataProvider"
        );
    }
    return context;
}

export function CurrentDataProvider({ children }: PropsWithChildren) {
    const [dogLocation, setDogLocation] = useState<DogLocation>(null);
    const [currentData, setCurrentData] = useState<CurrentData>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const refreshCurrentData = async () => {
        setIsLoading(true);
        try {
            const data = await CurrentDataService.getCurrentDogData();
            if (data) {
                setDogLocation({
                    longitude: data.longitude,
                    latitude: data.latitude,
                });
                setCurrentData(data);
            }
        } catch (error) {
            console.error(
                "Fehler beim Aktualisieren der aktuellen Daten:",
                error
            );
        } finally {
            setIsLoading(false);
        }
    };

    // Refreshes the dog location every 10 seconds
    useEffect(() => {
        refreshCurrentData();
        const interval = setInterval(() => {
            refreshCurrentData();
        }, 10000);

        return () => clearInterval(interval); // Cleanup
    }, []);

    return (
        <CurrentDataContext.Provider
            value={{ dogLocation, isLoading, refreshCurrentData, currentData }}
        >
            {children}
        </CurrentDataContext.Provider>
    );
}
