import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    PropsWithChildren,
} from "react";
import StatisticsService from "../Services/StatisticsService";

type StatisticsContextType = {
    statistics: any;
    isLoading: boolean;
    refreshStatistics: () => Promise<void>;
};

const StatisticsContext = createContext<StatisticsContextType | undefined>(
    undefined
);

export function useStatistics() {
    const context = useContext(StatisticsContext);
    if (!context) {
        throw new Error(
            "useStatistics must be used within a StatisticsProvider"
        );
    }
    return context;
}

export function StatisticsProvider({ children }: PropsWithChildren) {
    const [statistics, setStatistics] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const refreshStatistics = async () => {
        setIsLoading(true);
        try {
            const st = await StatisticsService.getStatistics();
            if (st) {
                setStatistics(st);
            }
        } catch (error) {
            console.error("Fehler beim Aktualisieren der Statistiken:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        refreshStatistics();
    }, []);

    return (
        <StatisticsContext.Provider
            value={{ statistics, isLoading, refreshStatistics }}
        >
            {children}
        </StatisticsContext.Provider>
    );
}
